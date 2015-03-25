var express         =         require("express");
var mysql           =         require("mysql");
var app             =         express();
var mmProps         =         require("mmProps");


mmProps.set("Database host", "localhost", "db:host");
mmProps.set("Database user", "epk_stats", "db:user");
mmProps.set("Database password", "xxxx", "db:password");
mmProps.set("Database database", "epk_stats", "db:database");

var connection = mysql.createConnection(mmProps.get("db"));

connection.connect(function(error){
  if(error)
  {
    console.log("Problem with MySQL"+error);
  }
  else
  {
    console.log("Connected with Database");
  }
});

/*
  * Configure Express Server.
  */
  app.use(express.static(__dirname + '/web'));
/*
  * Define routing of the application.
  */
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
      if(err) {
        console.log("Problem with MySQL"+err);
      }
      else {
        res.end(JSON.stringify({header : getHeader(fields), rows : rows}));
      }
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
  app.listen(3000,function(){
    console.log("It's Started on PORT 3000");
  });
