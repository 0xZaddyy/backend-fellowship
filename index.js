const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type": "test/plain"})
    res.end("Hello, World")
})
server.listen(3000,()=>{
    console.log("Strating server")
})