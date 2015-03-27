var express = require("express");
var mysql = require("mysql");
var app = express();
var mmProps = require("mmProps");
var db = require("./db");

var returnDBQuery = function(res, err,rows, fields) {
  err ? console.log("Problem with MySQL"+err): res.end(JSON.stringify({header : getHeader(fields), rows : rows}));  
}

var getHeader = function(fields) {
  var header = [];
  for (var i = 0, len = fields.length; i < len; i++) 
    header.push(fields[i].name);
  return header;
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
      connection.query("SELECT * FROM LOGS",function(err,rows, fields){
       returnDBQuery(res, err,rows, fields);
     });
    });

    app.get('/logs.user.graph',function(req,res){
      connection.query("SELECT USER_ID, count(*) as COUNT FROM LOGS group by USER_ID",function(err,rows, fields){
        returnDBQuery(res, err,rows, fields);
      });
    });

    app.get('/logs.eventType.graph',function(req,res){
      connection.query("SELECT EVENT_TYPE, count(*) as COUNT FROM LOGS group by EVENT_TYPE",function(err,rows, fields){
       returnDBQuery(res, err,rows, fields);
     });
    });

    app.get('/applyForm',function(req,res){
      connection.query("SELECT s.*, TIMESTAMPDIFF(SECOND,s.LAST_PAGE_ENTER_TIME,s.LEAVE_TIME) AS LAST_PAGE_SPENT_TIME " +
        " FROM (SELECT @from:='2013-01-01') o, (SELECT @to:='2016-12-12') d, STATS_APPLY_FORM_VIEW s;",function(err,rows, fields){
         returnDBQuery(res, err,rows, fields);
       });
    });

    app.get('/deliveryFiction',function(req,res){
      connection.query("SELECT s.* FROM (SELECT @from:='2013-01-01') o, (SELECT @to:='2016-12-12') d, STATS_DELIVERY_FICTION_VIEW s;",function(err,rows, fields){
         returnDBQuery(res, err,rows, fields);
       });
    });

    app.get('/document',function(req,res){
      connection.query("SELECT s.* FROM (SELECT @from:='2013-01-01') o, (SELECT @to:='2016-12-12') d, STATS_DOCUMENT_RECEIVE_VIEW s;",function(err,rows, fields){
         returnDBQuery(res, err,rows, fields);
       });
    });

    app.get('/procedure',function(req,res){
      connection.query("SELECT s.* FROM (SELECT @from:='2013-01-01') o, (SELECT @to:='2016-12-12') d, STATS_PROCEDURE_SELECTION_VIEW s;",function(err,rows, fields){
         returnDBQuery(res, err,rows, fields);
       });
    });

    app.get('/procedure.usages',function(req,res){
      connection.query("SELECT UEPA_ID, count(*) FROM (SELECT @from:='2013-01-01') o, (SELECT @to:='2016-12-12') d, STATS_PROCEDURE_SELECTION_VIEW s group by UEPA_ID;",function(err,rows, fields){
         returnDBQuery(res, err,rows, fields);
       });
    });

    app.listen(mmProps.get("httpd:port"),function(){
      console.log("It's Started on PORT " + mmProps.get("httpd:port"));
    });

  }

};
