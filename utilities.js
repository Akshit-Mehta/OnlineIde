const { fstat } = require('fs');
const { builtinModules } = require('module');
const { shellExecute } = require('./shellExecute');
const fs = require('fs');

const RmdirWithData = (folderPath, data, res) => {
    return fs.promises.rmdir(folderPath, {recursive: true})
            .then(data1 => res.json(data))
            .catch(err => res.json({ err: true, output: "Error deleting folder"+err}));
}

const RmdirWithError = (folderPath, error, res) => {
    return fs.promises.rmdir(folderPath, {recursive: true})
            .then(data => res.json({err: true, output: error}))
            .catch(err => res.json({err: true, output: "Error deleting folder"+err}))
}

module.exports = {
    RmdirWithData: RmdirWithData,
    RmdirWithError: RmdirWithError
}