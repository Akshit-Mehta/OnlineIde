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
    fs.writeFileSync('./test.py',code,{flag: 'w'});
    return pythonExecute(req.body)
    .then(data => {
        // console.log(data)
        res.json(data);
    })
    .catch(err => {
        // console.log(err);
        res.json(err);
    })
    res.send('<h1>'+code+' '+language+' '+req.body+'</h1>');
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