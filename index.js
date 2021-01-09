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
const {cCompile, cExecute, cCompileAndExecute } = require('./cCompileAndExecute');
const { cppCompile,cppExecute,cppCompileAndExecute } = require('./cppCompileAndExecute');
const {pythonExecute} = require('./pythonExecute');
const {javaCompile,javaExecute,javaCompileAndExecute} = require('./javaCompileAndExecute');
const { RmdirWithData, RmdirWithError } = require('./utilities');
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));


app.post('/compiler/c',(req,res)=>{
    const code = req.body.code;
    const language = req.body.language;
    // Todo: Inputs and commandLine args
    const inputs = req.body.inputs;
    const cmdLineInputs = req.body.cmdLineInputs;
    fs.writeFileSync('./test.c',code,{flag: 'w'});
    return cCompileAndExecute(req.body)
    .then(data => {
        // console.log(data," IN Main");
        res.json(data);
    })
    .catch(err => {
        // console.log(err);
        res.json(err);
    })
});

app.post('/compiler/cpp',(req,res)=>{
    const code = req.body.code;
    const language = req.body.language;
    // Todo: Inputs and commandLine args
    const inputs = req.body.inputs;
    const cmdLineInputs = req.body.cmdLineInputs;
    fs.writeFileSync('./test.cpp',code,{flag: 'w'});
    return cppCompileAndExecute(req.body)
    .then(data => {
        // console.log(data," IN Main");
        res.json(data);
    })
    .catch(err => {
        // console.log(err);
        res.json(err);
    })
    res.send('<h1>'+code+' '+language+' '+req.body+'</h1>');
})

app.post('/compiler/python',(req,res)=>{
    const code = req.body.code;
    const language = req.body.language;
    // Todo: Inputs and commandLine args
    const inputs = req.body.inputs;
    const cmdLineInputs = req.body.cmdLineInputs;
    let ip = req.ip;
    let folderPath = __dirname+'/';
    folderPath += ip;
    return fs.promises.mkdir(folderPath, {recursive: true})
    .then(data => { 
        console.log("Folder created succesfully");
        const filePath = `${folderPath}/test.py`; 
        return fs.promises.writeFile(filePath, code, {flag: 'w'})
        .then(data => {
            pythonExecute(req.body, folderPath)
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

app.post('/compiler/java', (req,res)=>{
    const code = req.body.code;
    const language = req.body.language;
    // Todo: Inputs and commandLine args
    const inputs = req.body.inputs;
    const cmdLineInputs = req.body.cmdLineInputs;
    fs.writeFileSync('./test.java',code,{flag: 'w'});
    return javaCompileAndExecute(req.body)
    .then(data => {
        // console.log(data," IN Main");
        res.json(data);
    })
    .catch(err => {
        // console.log(err);
        res.json(err);
    })
    res.send('<h1>'+code+' '+language+' '+req.body+'</h1>');    
})
// const cppCompile()
let port = 3002;
app.listen(port,() => {
    console.log(`App Started on PORT ${port}`);
});