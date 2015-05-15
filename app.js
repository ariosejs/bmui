'use strict';
var express = require('express');
var path = require('path');
// var browserify = require('browserify-middleware');
var fs = require('fs');
var JsonObj=JSON.parse(fs.readFileSync('./package.json'));
var version = JsonObj.version;

var app = module.exports.app = exports.app = express();
var appbase = path.join(__dirname);

app.use( '/', express.static( path.join(appbase + '/build/'+version+'/')));
app.use('/static', express.static(appbase + '/build/'+version+'/'));

app.get( /^\/(.+?)\/(.*?).html$/ , function(req,res){
    var appname = req.params[0];
    res.render( path.join(appname) , {
        appname:appname
    } );
} );

var port = 9988;
app.listen(port);
console.log('Server start at port ' + port);
