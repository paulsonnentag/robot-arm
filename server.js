var express = require('express');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/client'));

app.listen(8080);

console.log('started server http://localhost:8080');