const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cp = require('child_process');
const { stringify } = require('querystring');
const { stdin } = require('process');
const { S_IFDIR } = require('constants');
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const { shellExecute } = require('./shellExecute');

const javaExecute = (inputs, language) => {
    return new Promise((resolve, reject) => {
        const exec_options = {
            cwd: "/home/don/Online Compiler NodeJs",
            timeout: 10000,
            killSignal: "Time Limit Exceeded",
            stdio: 'pipe'
        };
        // fs.writeFileSync('./input.txt',inputs,{flag:'w'},(err)=>{
        //     if(err) console.log(err);
        // });
        let sp;
        sp = spawn('./test', exec_options);
        sp.stdin.write(inputs, 'Utf8');
        sp.stdin.end();

        setTimeout(function (sp) { resolve({ err: false, output: "Time limit exceeded" }); if (sp) sp.kill() }, 5000);

        sp.stderr.on('data', (err) => {
            console.log("ERROR " + err)
            resolve({
                err: true,
                output: err,
                error: err
            })
        });
        let results = []
        sp.stdout.on('data', (message) => {
            console.log("OUTPUT ", `${message}`);
            let s = message.toString();
            results.push(s);
            resolve({
                err: false,
                output: message.toString()
            })
        });
        sp.on('message', message => {
            console.log(message + "IN MESSAGE");
        })
        sp.on('disconnect', (x) => {
            console.log("Disconnect");
        })
        sp.on('string', (out) => {
            console.log("String");
        })
        sp.on('error', (err) => {
            console.log(err);
        })
        sp.on('exit', () => {
            console.log("Exit");
        })
        sp.on('close', () => {
            console.log("Close")
            resolve({
                err: false,
                output: results
            })
        })
    });
}

const javaCompile = (params) => {
    const { code, language, inputs, cmdLineInputs } = params;
    console.log(params);
    const exec_options = {
        cwd: "/home/don/Online Compiler NodeJs",
        timeout: 1000,
        killSignal: "SIGTERM",
        stdio: 'pipe',
        shell: true
    };
    return new Promise((resolve, reject) => {
        let sp = spawn('javac test.java', exec_options);
        let errorOccurred = false;
        let errors = "";
        let cnt = 0;
        // Called if compile errors
        sp.stderr.on('data', (error) => {
            errorOccurred = true
            console.log(error.toString(), cnt++);
            errors += error.toString();
        });

        // Output any data.
        // No output for succesfull compilation.
        sp.stdout.on('data', (data) => {
            console.log(data);
            if (language === "python") {
                resolve({
                    err: false,
                    output: data.toString()
                })
            }
        })

        // Called when child process cannot be spawned or not exited normally
        sp.on('error', (error) => {
            console.log(error + " is the error");
            console.log("ERROR", error.toString());
            errorOccurred = true,
                resolve({
                    err: true,
                    errMsg: "Some error occurred. Please try Again!"
                });
        })

        //Called when child process is exited.
        // signal = null means normal execution of child.
        sp.on('exit', (code, signal) => {
            //Child process did'nt exited normally
            if (signal !== null) {
                errorOccurred = true,
                    resolve({
                        err: true,
                        errMsg: "Some error occurred. Please try Again!"
                    });
            }
            else if (errorOccurred && errors.length) {
                reject({
                    err: true,
                    errMsg: errors,
                })
            }
            else {
                resolve({
                    err: false,
                    compileErr: false,
                    output: javaExecute(inputs, language)
                })
            }
        })

        //Called after exit
        //When all the streams are closed 
        // Streams = stderr,stdio,stdin
        sp.on('close', () => {
            if (errorOccurred === false) {
                console.log("NO ERR occ");
                resolve({
                    'data': javaExecute()
                });
            }
        })
    })
}

const javaCompileAndExecute = (params) => {
    const { code, language, inputs, cmdLineInputs } = params;
    return new Promise((resolve, reject) => {
        const exec_options = {
            // cwd : "/home/don/Online Compiler NodeJs" ,
            timeout: 1000,
            killSignal: "SIGTERM",
            stdio: 'pipe',
            shell: true
        };
        shellExecute("javac test.java", false, "", exec_options)
            .then((data) => {
                if (data.err == true) {
                    resolve({
                        err: true,
                        errMsg: data.errMsg,
                    })
                }
                else {
                    const exec_options = {
                        // cwd : "/home/don/Online Compiler NodeJs" ,
                        // timeout : 1000 ,
                        killSignal: "SIGTERM",
                        stdio: 'pipe',
                        shell: true
                    };
                    shellExecute("java test", true, inputs, exec_options)
                        .then((data) => {
                            if (data.err == true) {
                                resolve({
                                    err: true,
                                    errMsg: data.errMsg,
                                })
                            }
                            else {
                                resolve({
                                    err: false,
                                    output: data['output']
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            resolve({
                                err: true,
                                errMsg: err
                            })
                        })
                }
            })
            .catch(err => {
                console.log(err);
                resolve({
                    err: true,
                    errMsg: err
                })
            })
    })
}

module.exports = {
    javaExecute: javaExecute,
    javaCompile: javaCompile,
    javaCompileAndExecute: javaCompileAndExecute,
}