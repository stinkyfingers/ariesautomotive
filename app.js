'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));

app.get('/', function(res) {
    res.sendFile('/dist/index.html');
});

var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
