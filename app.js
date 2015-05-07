'use strict';
var express = require('express');
var path = require('path');
var browserify = require('browserify-middleware');
var fs = require('fs');

// var app = express();
var app = module.exports.app = exports.app = express();

var appbase = path.join(__dirname);


app.set('views' , appbase+'/build' );
app.set('view cache', false);

app.use( '/', express.static( path.join(appbase )));
app.use('/static', express.static(__dirname + '/build'));

app.get( '/', function(req,res){
    var appname = 'index';
    res.render( path.join(appname), {
        appname:appname
    });
});
app.get( '/index', function(req,res){
    var appname = 'index';
    res.render( path.join(appname), {
        appname:appname
    });
});


var port = 3210;
app.listen(port);
console.log('Server start at port ' + port);
