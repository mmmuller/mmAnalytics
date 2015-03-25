var express = require("express");
var mysql = require("mysql");
var app = express();
var mmProps = require("mmProps");
var db = require("./db");

var returnDBQuery = function(res, err,rows, fields) {
  if(err) {
    console.log("Problem with MySQL"+err);
  }
  else {
    res.end(JSON.stringify({header : getHeader(fields), rows : rows}));
  }
}

module.exports = {

  init : function() {
    mmProps.set("Httpd server port", "3000", "httpd:port");
    db.init();
  },

  run : function() {
    var connection = db.connect();

    app.use(express.static(__dirname + '/../web'));

    app.get('/',function(req,res){
      res.sendfile('index.html');
    });

    app.get('/logs',function(req,res){
      this.getHeader = function(fields) {
        var header = [];
        for (var i = 0, len = fields.length; i < len; i++) {
          header.push(fields[i].name);
        }
        return header;
      }

      connection.query("SELECT * FROM logs",function(err,rows, fields){
        if(err) {
          console.log("Problem with MySQL"+err);
        }
        else {
          res.end(JSON.stringify({header : getHeader(fields), rows : rows}));
        }
      });
    });

    app.get('/logs.user.graph',function(req,res){
      connection.query("SELECT USER_ID, count(*) as COUNT FROM logs group by USER_ID",function(err,rows, fields){
        returnDBQuery(res, err,rows, fields);
      });
    });

    app.get('/logs.eventType.graph',function(req,res){
      connection.query("SELECT EVENT_TYPE, count(*) as COUNT FROM logs group by EVENT_TYPE",function(err,rows, fields){
        if(err) {
          console.log("Problem with MySQL"+err);
        }
        else {
          res.end(JSON.stringify({header : getHeader(fields), rows : rows}));
        }
      });
    });

/*
  * Start the Express Web Server.
  */
  app.listen(mmProps.get("httpd:port"),function(){
    console.log("It's Started on PORT " + mmProps.get("httpd:port"));
  });
}

};
