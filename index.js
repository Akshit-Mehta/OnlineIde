const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cp = require('child_process');
const {v4: uuidv4} = require('uuid');
const { stringify } = require('querystring');
const { stdin } = require('process');
const { S_IFDIR } = require('constants');
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const { cCompile, cExecute, cCompileAndExecute } = require('./cCompileAndExecute');
const { cppCompile, cppExecute, cppCompileAndExecute } = require('./cppCompileAndExecute');
const { pythonExecute } = require('./pythonExecute');
const { javaCompile, javaExecute, javaCompileAndExecute } = require('./javaCompileAndExecute');
const { RmdirWithData, RmdirWithError,extractClassName } = require('./utilities');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({credentials: true, origin: true}));
app.use(cors());
app.options('*', cors());

app.post('/compiler/c', (req, res) => {
    const code = req.body.code;
    const language = req.body.language;
    // Todo: Inputs and commandLine args
    const inputs = req.body.inputs;
    const cmdLineInputs = req.body.cmdLineInputs;
    let ip = uuidv4();
    let folderPath = __dirname + '/';
    folderPath += ip;
    return fs.promises.mkdir(folderPath, { recursive: true })
        .then(data => {
            console.log("folder created successfully.")
            const filePath = `${folderPath}/test.c`;
            return fs.promises.writeFile(filePath, code, { flag: 'w' })
                .then(data => {
                    cCompileAndExecute(req.body, folderPath)
                        .then(data1 => {
                            RmdirWithData(folderPath, data1, res);
                        })
                        .catch(err => {
                            RmdirWithError(folderPath, err, res)
                        })
                })
                .catch(err => {
                    RmdirWithError(folderPath, err, res)
                })

        })
        .catch(err => {
            res.json(err)
        })
});

app.post('/compiler/cpp', (req, res) => {
    const code = req.body.code;
    const language = req.body.language;
    // Todo: Inputs and commandLine args
    const inputs = req.body.inputs;
    const cmdLineInputs = req.body.cmdLineInputs;
    let ip = uuidv4();
    let folderPath = __dirname + '/';
    folderPath += ip;
    return fs.promises.mkdir(folderPath, { recursive: true })
        .then(data => {
            console.log("folder created successfully.")
            const filePath = `${folderPath}/test.cpp`;
            return fs.promises.writeFile(filePath, code, { flag: 'w' })
                .then(data => {
                    cppCompileAndExecute(req.body, folderPath)
                        .then(data1 => {
                            RmdirWithData(folderPath, data1, res);
                        })
                        .catch(err => {
                            RmdirWithError(folderPath, err, res)
                        })
                })
                .catch(err => {
                    RmdirWithError(folderPath, err, res)
                })

        })
        .catch(err => {
            res.json(err)
        })
})

app.post('/compiler/python', (req, res) => {
    const code = req.body.code;
    const language = req.body.language;
    // Todo: Inputs and commandLine args
    const inputs = req.body.inputs;
    const cmdLineInputs = req.body.cmdLineInputs;
    let ip = uuidv4();
    let folderPath = __dirname + '/';
    folderPath += ip;
    return fs.promises.mkdir(folderPath, { recursive: true })
        .then(data => {
            console.log("Folder created succesfully");
            const filePath = `${folderPath}/test.py`;
            return fs.promises.writeFile(filePath, code, { flag: 'w' })
                .then(data => {
                    pythonExecute(req.body, folderPath)
                        .then(data1 => {
                            // res.json(data1)
                            RmdirWithData(folderPath, data1, res);
                        })
                        .catch(err1 => {
                            RmdirWithError(folderPath, err1, res);
                        })
                })
                .catch(err => {
                    RmdirWithError(folderPath, err, res);
                });
        })
        .catch(err => {
            res.json(err)
        });
})

app.post('/compiler/java', (req, res) => {
    const code = req.body.code;
    const language = req.body.language;
    // Todo: Inputs and commandLine args
    const inputs = req.body.inputs;
    const cmdLineInputs = req.body.cmdLineInputs;
    let ip = uuidv4();
    console.log(ip)
    let folderPath = __dirname + "/";
    folderPath += ip;
    return fs.promises.mkdir(folderPath, { recursive:true })
        .then(data => {
            console.log("Folder created succesfully");
            let className = extractClassName(code);
            if(className == -1){
                res.json({ err: true, output: "No 'public' class found to execute"});
                return;
            }

            const filePath = `${folderPath}/${className}.java`;
            return fs.promises.writeFile(filePath, code, { flag: 'w' })
                .then(data => {
                    javaCompileAndExecute(req.body, folderPath, className)
                        .then(data1 => {
                            //res.json(data1)
                            RmdirWithData(folderPath, data1, res);
                        })
                        .catch(err1 => {
                            RmdirWithError(folderPath, err1, res);
                        })
                })
                .catch(err => {
                    RmdirWithError(folderPath, err, res);
                });
        })
        .catch(err => {
            res.json(err)
        });
})

let port = 3002;
app.listen(port, () => {
    console.log(`App Started on PORT ${port}`);
});