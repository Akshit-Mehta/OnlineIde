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

const pythonExecute = (params, folderName) => {
    const { code, inputs } = params;
    const cwd = folderName;
    return new Promise((resolve, reject) => {
        const exec_options = {
            cwd: cwd,
            killSignal: "SIGTERM",
            stdio: 'pipe',
            shell: true
        }
        shellExecute("python3 test.py", true, inputs, exec_options)
        .then(data => {
            console.log(data)
            if(data.err){
                resolve({ err: data.err, output: data.errMsg});
            }
            else{
                resolve({
                    err: data.err,
                    output: data.output
                })
            }
        })
    })
}
module.exports = {
    pythonExecute: pythonExecute
}