var express = require('express');
var winston = require('winston');
var db = require('rethinkdb');
var async = require('async');
var router = express.Router();
var app = express();

var dbConnection = null;

var connection = db.connect({
    host : 'localhost',
    port : 28015
});


connection.then(function(conn){
  dbConnection = conn;
  async.waterfall([
    function(callback) {
      r.dbCreate('rethinkdbDemo').run(dbConnection,function(err,res) {
        if(err) {
          winston.error(err);
          return callback(true,err);
        } else {
          winston.info('Database is created');
          callback(null,'rethinkdbDemo');
        }
      });
    },
    function(dbName,callback) {
      r.db('test').tableCreate('authors').run(connection, function(err, result) {
        if (err) {
          winston.error(err);
          return callback(true,err);
        }
        callback(null);
      });
    }
  ],function(err,data) {
    if(err) {
      winston.log(err);
    }
  });
}).error(function(err) {
  winston.error(err);
});

router.route('/user')
.get(function(req,res) {

})
.post(function(req,res) {

});

app.use('/',router);
app.listen(3000);
