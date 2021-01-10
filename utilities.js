const { fstat } = require('fs');
const { builtinModules } = require('module');
const { shellExecute } = require('./shellExecute');
const fs = require('fs');

function extractClassName(code) {
    // let listTokens = code.split(" ");
    code = code.replace(/\s+/g, " ").trim();
    var index = code.search("public class");
    if (index === -1) {
      return -1;
    }
    index = index + 13;
    // console.log(code[index]);
    let className = "";
    for (var i = index; i < code.length; i++) {
      let charCode = code.charCodeAt(i);
      if (
        !(charCode > 47 && charCode < 58) && // numeric (0-9)
        !(charCode > 64 && charCode < 91) && // upper alpha (A-Z)
        !(charCode > 96 && charCode < 123) &&
        code[i] != "_"
      ) {
        // lower alpha (a-z)
        break;
      }
      className += code[i];
    }
    console.log(className);
    return className;
  }

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
    RmdirWithError: RmdirWithError,
    extractClassName: extractClassName,
}