const express = require('express');
const morgan = require('morgan');

//routes
const campsiteRouter = require('./routes/campsiteRouter')

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan("dev")) //configure morgan to use development version, which prints additional info
//morgan will log request info

//handles parsing json data from the request's body, into an object
app.use(express.json())

//serve files from public folder, using express.static middleware function
//__dirname, special variable in node, absolute path of current file
app.use(express.static(__dirname + "/public"))
//express will server index file automatically, standard behavior of web server (nginx, apache)

app.use('/campsites', campsiteRouter)

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});