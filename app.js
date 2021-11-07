const http = require("http");

const processId = process.pid;

const server = http.createServer (( req , res ) => { 
    res.end(`Processo tratado por pid : ${processId}`); 
});

server.listen (8080, () => { 
    console.log (`Servidor iniciado no processo ${processId}`); 
});
