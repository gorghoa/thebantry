var File = require ("./file-utils").File;
var ff = require('ffmetadata');
var ffprobe = require('node-ffprobe');
var express = require('express');
var zip = require('express-zip');
var fs = require('fs');
var _ = require('underscore');
var async = require('async');
var md5 = require('MD5');
var bodyParser = require('body-parser')

var app=express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var sessions_store = {};

var DATA_DIR = '/media/docs/data';
var DATA_PATH = __dirname+'/'+DATA_DIR;

app.listen(8000);



var sessions = [];
(function() {

    async.series([

        function(cb)  {

            var files = fs.readdir(DATA_PATH,function(err,data) {

                if(err) {
                    throw err;
                }
                var dirs = data.filter(function (file) {
                        return fs.statSync(DATA_PATH+'/'+file).isDirectory();
                });

                sessions = dirs.map(function(dir) {
                    return {dir:dir, uuid:md5(dir)};
                });

                cb();
            });

        },
        function(cb) {


            var results=[];
            async.each(sessions,function(session,cb) {

                session.metadata={};

                fs.readFile(DATA_PATH+'/'+session.dir+'/metadata.json',{encoding:'utf-8'},function(err,data) {

                    var end=function() {
                        results.push(session);

                        sessions_store[session.uuid]=session.dir;

                        cb();
                    };

                    if(err) {
                        end();
                        return;
                    }

                    _.extend(session.metadata,JSON.parse(data));

                    end();
                });

            },function(err) {
                sessions=results;
                cb();

            });
        }],function(err) {
            console.log(sessions,'all done');
        });
})();

app.use(express.static(__dirname+'/../client'));
app.use('/data',express.static(__dirname+'/data'));

app.get('/sessions',function(req,res) {
    res.type('application/json');
    res.send(sessions);
});

app.get('/sessions/:path',function(req,res) {
    var session_dir = sessions_store[req.params.path];
    var session_url = "/data/"+session_dir;
    var session_path = DATA_PATH + '/' + session_dir;
    res.type('application/json');

    var session_metadata={};

    var files =[];
    var results=[];

    async.series([

        function(cb) {
            fs.readdir(session_path,function(err,data) {
                files = _.filter(data,function(file) {
                    return file.match(/.mp3$/i);
                });
                cb();
            });

        },

        function(cb) {

            async.each(files,function(file,cb) {
            
               // ff.read(session_path+'/'+file,function(err,data) {
                ffprobe(session_path+'/'+file,function(err,data) {
                    
                        console.log(data);
                    var infos ={url:session_url+'/'+data.filename};

                    results.push(_.extend(infos,data));//{metadata:data,file:file,url:session_url+'/'+file})
                    cb();
                });

            },function(err) {

                cb();

            });

        }, function(cb) {
            fs.readFile(session_path+'/metadata.json',{encoding:'utf-8'},function(err,data) {
                if(err) {
                    session_metadata={};
                } else {
                    session_metadata= JSON.parse( data);
                }
                cb();
            });
        }


    ],function(err) {
        res.send({files:results,metadata:session_metadata});
    });
});

app.get('/sessions/:path/zip',function(req,res) {

    var session_dir = sessions_store[req.params.path];
    var session_url = "/data/"+session_dir;
    var session_path = DATA_PATH + '/' + session_dir;

    var files;
    async.series([

    function(cb) {
        fs.readdir(session_path,function(err,data) {
            files = _.filter(data,function(file) {
                return file.match(/.mp3$/i);
            });
            cb();
        });

    },
    ],function(err) {

           var content = _.map(files,function(file) {
                return {path:session_path+'/'+file,name:file};
           });
           res.zip(content);
    });


});

app.put('/file',function(req,res) {
    console.log(req.body);
    ff.write(req.body.file,req.body.metadata,function() {
        res.send('ok');
    });

});
