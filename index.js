let http = require('http');
let fs = require('fs');
let path = require ('path');
const ip = "127.0.0.1";
const port = 4000;

http.createServer(function(request,response){
    //console.log('request',request);
    console.log(request.url);
    let file = '.'+request.url;
    if (request.url=="/archivos/index.html" || request.url=='/'){
        file = './archivos/index.html'
    } else {
        file = './archivos/404.html'
    }
    let extension = String(path.extname(file)).toLowerCase();
    let mime = { '.html': 'text/html' }
    let type = mime[extension] || 'application/octet-stream';
    fs.readFile(file,function(error, content){
        if (error){
            if (error.code == 'ENOENT'){
                fs.readFile('./archivos/404.html', function(error, content){
                    response.writeHead(200,{ 'Content-Type':type });
                    response.end(content,'utf-8');
                });
            } else {
                response.writeHead(500);
                response.end('Error: '+error.code+'\n');
                response.end();
            }
        } else {
            response.writeHead(200,{'Content-Type': type});
            response.end(content,'utf-8');
        }
    });
}).listen(port,ip);

console.log('Corriendo en '+ip+':'+port+'\n');