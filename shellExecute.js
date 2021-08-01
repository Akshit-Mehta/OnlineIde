const spawn = require("child_process").spawn;

const shellExecute = (command,inputsPresent,inputs,exec_options) => {
    return new Promise((resolve, reject) => {
        console.log(inputs);
        let sp = spawn(command, exec_options);
        // setTimeout(function(){if(sp) {tle = true; sp.kill();}resolve({err:true,output:'TLE'});},5000);
        let tle = false;
        setTimeout(function(){
            try {
            process.kill(sp.pid, 'SIGKILL');
            tle = true;
          } catch (e) {
            console.log('Cannot kill process');
          }
        },5000);
        let errorOccurred = false;
        let errors = "";
        let results = "";

        if(inputsPresent==true && inputs.length > 0){
            sp.stdin.write(inputs);
            sp.stdin.end();
        }
        
        sp.stderr.on("data", (err) => {
            errorOccurred = true;
            errors += err.toString();
        });

        sp.stdout.on("data", (message) => {
            var limit = 5000;
            results += message.toString();
            if(results.length>limit){
                results = results.substring(0,limit);
                results += "\nOUTPUT LIMIT EXCEEDED...";
            }
            
            console.log("Shell Execute output : ", message.toString());
        });

        sp.on("message", (message) => {
            console.log(message + "IN MESSAGE");
        });
        sp.on("disconnect", (x) => {
            console.log("Disconnect");
        });
        sp.on("string", (out) => {
            console.log("String");
        });
        sp.on("error", (err) => {
            console.log(err);
        });
        sp.on("exit", (code, signal) => {
            console.log("Exit");
            if(signal !== null && tle){
                resolve({
                    err: true,
                    errMsg: "TLE"
                })
            }
            else if(signal !== null){
                errorOccurred = true,
                resolve({
                    err: true,
                    errMsg: signal
                });
            }
            else if(errorOccurred === true && errors.length > 0){
                resolve({
                    err: true,
                    errMsg: errors
                })
            }
            else if(errorOccurred){
                console.log("Internal Error Occured")
                resolve({
                    err: true,
                    errMsg: "ServerErrorOccured"
                })
            }
            else{
                console.log(results,"IN EXIT");
                resolve({
                    err: false,
                    output: results
                })
            }

        });
        sp.on("close", () => {
            resolve({
                err: false,
                output: "Closing"
            })
            console.log("Close");
        });
    });
};
  
  module.exports = { shellExecute }
  