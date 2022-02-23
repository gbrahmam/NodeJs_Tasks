const fs = require('fs');
const http = require("http");

const content = '<h1>Hello World</h1>';

fs.writeFile("index.html", content, (err) => {
    console.log()
})

const server = http.createServer((req,res) => {
    fs.readFile("index.html", (err,data) => {
        res.end(data);
    })
})

server.listen(3000, () => {
    console.log("server is listening");
})