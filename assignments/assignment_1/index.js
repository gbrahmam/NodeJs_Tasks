function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    console.log(process.argv[2]);
}

function getNameFromEnv() {
    // Write your code here
    const name = process.env.name
    console.log(name);
}

function getNameFromReadLine() {
    // Write your code here
    const readline = require("readline");
    const x = readline.createInterface({
        input:process.stdin,
        output:process.stdout
    });

    x.question("enter name",(res) => {
        console.log(res);
        x.close();
    })
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}