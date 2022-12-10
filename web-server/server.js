const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000;

//creatServer returns "server object", which is an EventEmitter object
//callback being passed is called "request handler", called with every request
const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') {
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        const filePath = path.resolve('./public' + fileUrl); //resolve returns absolute path
        const fileExt = path.extname(filePath);

        if (fileExt === '.html') {
            fs.access(filePath, err => { //access checks if file exists
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                //pipes file read stream data to response object
                //createReadStream returns stream object
                //res is a stream object
                //pipe method transfers data between stream objects via "lazy loading" (one chunck at a time)
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else if (req.method === 'POST') {
        let body = [];
        //request object implements ReadableStreamInterface
        //the stream can be listened to and piped anywhere
        //grabs data from stream by listening to stream's "data" and "end" event
        //the chunk emitted in each "data" event is a Buffer
        //at "end" event, buffer array is concatenated and stringified
        req
        .on('error', (err) => {
            console.error(err);
          })
        .on('data', (chunk) => {
            body.push(chunk);
        })
        .on('end', () => {
            body = Buffer.concat(body).toString();
            // at this point, `body` has the entire request body stored in it as a string
            console.log(body)
            res.setHeader('Content-Type', 'text/html');
            //echo back what was posted
            res.end(body);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});