
var File = require ("./file-utils").File;
var ff = require('ffmetadata');

var express = require('express');

var app=express();

var f = new File('data');

app.listen(8000);

app.use(express.static(__dirname+'/public'));
app.use('/data',express.static(__dirname+'/data'));

app.get('/sessions',function(req,res) {
    res.type('application/json');
    f.list(function(err,files) {
        res.send(files);
    });
});
app.get('/sessions/:path',function(req,res) {
    var path = decodeURIComponent(req.params.path);
    var f = new File('data/'+path);
    res.type('application/json');
    f.list(function(err,files) {
        res.send(files);
    });
});

app.get('/files/:path',function(req,res) {

    var path = decodeURIComponent(req.params.path);

    var data = {thebantry:"Bantry’s Quay"};
    ff.write(path,data,function() {});

    ff.read(path,function(err,data) {
        res.type('application/json');
        res.send(data);
    });
});

