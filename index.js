var http = require('http');
var express = require('express');
var request = require('request');

var apiUrl = 'http://www.cnbeta.com/';
var app = express();

// static items
app.use('', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));

//redirect rest request
app.use('/api', function(req, res) {
    var url = apiUrl + req.url;
    console.log('Request: ' + url);
    req.pipe(request({qs: req.query, uri: url})).pipe(res);
});

http.createServer(app).listen('8080', function() {
    console.log('Server started !');
});