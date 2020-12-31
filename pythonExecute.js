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

const pythonExecute = (inputs,language)=>{
    return new Promise((resolve,reject)=>{
        const exec_options = {
            cwd : "/home/don/Online Compiler NodeJs" ,
            timeout : 10000 ,
            killSignal : "Time Limit Exceeded",
            stdio:   'pipe',
            shell: true
        };
        // fs.writeFileSync('./input.txt',inputs,{flag:'w'},(err)=>{
        //     if(err) console.log(err);
        // });
        let sp = spawn('python3 test.py',exec_options);
        // sp.stdin.write(inputs,'Utf8');
        // sp.stdin.end();

        setTimeout(function(sp){ resolve({err: false,output: "Time limit exceeded"}); if(sp) sp.kill()}, 5000);

        sp.stderr.on('data',(err)=>{
            console.log("ERROR "+err)
            resolve({
            err: true,
            output: err,
            error: err
            })
        });
        let results = []
        sp.stdout.on('data',(message)=>{
            console.log("OUTPUT ", `${message}`);
            let s = message.toString();
            results.push(s);
            resolve({
              err: false,
              output: message.toString()
            }) 
        });
        sp.on('message',message=>{
            console.log(message+"IN MESSAGE");
        })
        sp.on('disconnect',(x)=>{
            console.log("Disconnect");
        })
        sp.on('string',(out)=>{
            console.log("String");
        })
        sp.on('error',(err)=>{
            console.log(err);
        })
        sp.on('exit',()=>{
            console.log("Exit");
        })
        sp.on('close',()=>{
            console.log("Close")
            resolve({
                err: false,
                output: results
            })
        })
    });
}

module.exports = {
    pythonExecute: pythonExecute
}