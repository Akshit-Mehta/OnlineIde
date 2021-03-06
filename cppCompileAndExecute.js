const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cp = require('child_process');
const { stringify } = require('querystring');
const { stdin } = require('process');
const { S_IFDIR } = require('constants');
const { shellExecute } = require('./shellExecute');
const { resolve } = require('path');
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;

const cppExecute = (params, folderPath) => {
    const { inputs, cmdLineInputs } = params;
    return new Promise((resolve, reject) => {
        const exec_options = {
            cwd: folderPath,
            timeout: 10000,
            killSignal: "Time Limit Exceeded",
            stdio: "pipe",
            shell: true     //shell true because the directory is changed, /bin/sh internally will use find, then executes file, find command can only be executed in shell
        };
        let command = "./test" + cmdLineInputs;
        let sp;
        sp = spawn(command, exec_options);
        sp.stdin.write(inputs, "Utf8");
        sp.stdin.end();

        setTimeout(function (sp) {
            if (sp) sp.kill();
            resolve({ err: false, output: "Time limit exceeded" });
        }, 5000);

        let errors = "", errorOccurred = false;
        sp.stderr.on("data", (err) => {
            console.log("ERROR " + err);
            errorOccurred = true;
            errors += err;
        });

        let results = "";
        sp.stdout.on("data", (message) => {
            console.log("OUTPUT ", `${message}`);
            results += message.toString();
        });

        sp.on("exit", (code,signal) => {
            console.log("EXIT");
            if(signal !== null){
                errorOccurred = true,
                resolve({
                    err: true,
                    output: "Some error occurred. Please try Again!"
                });
            }
            else if(errorOccurred === true && errors.length > 0){
                resolve({
                    err: true,
                    output: errors
                })
            }
            else if(errorOccurred){
                console.log("Internal Error Occured")
                resolve({
                    err: true,
                    output: "ServerErrorOccured"
                })
            }
            else{
                resolve({
                    err: false,
                    output: results
                })
            }
        });

    });
};

const cppCompile = (params,folderPath) => {
    const { code, language, inputs, cmdLineInputs } = params;
    console.log(params);
    const exec_options = {
        cwd : folderPath,
        timeout: 1000,
        killSignal: "SIGTERM",
        stdio: "pipe",
        shell: true
    };
    return new Promise((resolve, reject) => {
        let sp;
        sp = spawn("g++ test.cpp -o test ", exec_options);
        let errorOccurred = false;
        let errors = "";
        let cnt = 0;
        //Called if compile errors
        sp.stderr.on("data", (error) => {
            errorOccurred = true;
            console.log(error.toString(), cnt++);
            errors += error.toString();
        });

        //Output any data.
        //No output for succesful compilation.
        sp.stdout.on("data", (data) => {
            console.log(data);
        });

        //Called when child process cannot be spawned or not exited normally
        sp.on("error", (error) => {
            console.log(error + " is the error");
            console.log("ERROR", error.toString());
            errorOccurred = true;
            resolve({
                err: true,
                output: "Some error occurred. Please try Again!",
            });
        });

        //Called when child process is exited.
        // signal = null means normal execution of child.
        sp.on("exit", (code, signal) => {
            //Child process did'nt exited normally
            if (signal !== null) {
                errorOccurred = true
                resolve({
                    err: true,
                    output: "Some error occurred. Please try Again!",
                });
            } else if (errorOccurred && errors.length) {
                resolve({
                    err: true,
                    output: errors,
                });
            } else {
                cppExecute(params)
                .then(data => {
                    console.log(data);
                    resolve({
                        err: data.err,
                        output: data.output
                    });
                })
                .catch(err => {
                    resolve({err: true, output: err});
                })
            }
        });

        //Called after exit
        //When all the streams are closed
        // Streams = stderr,stdio,stdin
        sp.on("close", () => {
            console.log("Close event Cpp Compile");
        });
    });
};

const cppCompileAndExecute = (params, folderPath) => {
    const {code,language,inputs,cmdLineInputs} = params;
    console.log(params);
    let cwd = folderPath
    return new Promise((resolve,reject) => {
        let exec_options = {
            cwd : cwd,
            // timeout : 1000,
            killSignal : "SIGTERM",
            stdio:   'pipe',
            shell: true
        };
        shellExecute("g++ test.cpp -o test", false, inputs, exec_options)
        .then(data => {
            if(data.err){
                resolve({
                    err: true,
                    output: data.errMsg
                })
            }
            else{
                exec_options = {
                    cwd : cwd,
                    // timeout : 1000 ,
                    killSignal : "SIGTERM",
                    stdio:   'pipe',
                    shell: true
                };
                let command = "./test "+cmdLineInputs;
                shellExecute(command,true,inputs,exec_options)
                .then(data => {
                    console.log(data);
                    if(data.err){
                        resolve({
                            err: true,
                            output: data.errMsg
                        })
                    }
                    else resolve({
                        err: false,
                        output: data['output']
                    })
                })
                .catch( err => {
                    console.log(err);
                    resolve({
                        err: true,
                        output: err
                    })
                })
            }
        })
        .catch(err => {
            console.log(err);
            resolve({
                err: true,
                output: err
            })
        })
    })
    
}

module.exports = {
    cppExecute: cppExecute,
    cppCompile: cppCompile,
    cppCompileAndExecute: cppCompileAndExecute
}