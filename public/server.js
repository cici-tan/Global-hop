// var http = require('http');
// var fs = require('fs');
// var url = require('url');
//
//
// // Create a server
// http.createServer( function (request, response) {
//     // Parse the request containing file name
//     var pathname = url.parse(request.url).pathname;
//
//     // Print the name of the file for which request is made.
//     console.log("Request for " + pathname + " received.");
//
//     // Read the requested file content from file system
//     fs.readFile(pathname.substr(1), function (err, data) {
//         if (err) {
//             console.log(err);
//             // HTTP Status: 404 : NOT FOUND
//             response.writeHead(404, {'Content-Type': 'text/html'});
//         }else{
//             //Page found
//             // HTTP Status: 200 : OK
//             // Content Type: text/plain
//             response.writeHead(200, {'Content-Type': 'text/html'});
//
//             // Write the content of the file to response body
//             response.write(data.toString());
//         }
//         // Send the response body
//         response.end();
//     });
// }).listen(8081);
//
// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

var urlencodedParser = bodyParser.urlencoded({ extended: false});

//show images from public
app.use(express.static('public'));

var todoItems = [
    {id: 1, order: 'foo'},
    {id: 2, order: 'jenny'}
];
//homepage
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello',
        items: todoItems
    });
});

// add new member
app.post('/add', function (req, res) {
    var newItem = req.body.newItem;

    todoItems.push({
        id:todoItems.length+1,
        order: newItem
    });
    res.redirects('/');
})

//get index page
app.get('/index.htm', function (req, res) {
    //noinspection JSUnresolvedFunction
    res.sendFile( __dirname + "/" + "index.htm");
});

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        console.log( data );
        res.end( data );
    });
});

app.post('/process_get', urlencodedParser, function (req, res) {
    // Prepare output in JSON format
    respon = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };
    console.log(respon);
    res.end(JSON.stringify(respon));
});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});

