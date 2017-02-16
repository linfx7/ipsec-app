var http = require('http');
var express = require('express');
var request = require('request');

var apiUrl = 'http://10.251.0.21:8080/restconf/operations';
var app = express();

// static items
app.use('', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/templates', express.static(__dirname + '/templates'));

//redirect rest request
app.use('/api', function (req, res) {
    var url = apiUrl + req.url;
    // console.log('Request: ' + url);
    req.pipe(request({
        qs: req.query,
        uri: url
    })).pipe(res);
});

http.createServer(app).listen('8080', function () {
    console.log('Server started !');
});