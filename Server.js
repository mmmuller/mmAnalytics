var express         =         require("express");
var mysql           =         require("mysql");
var app             =         express();

/*
  * Configure MySQL parameters.
  */
  var connection      =         mysql.createConnection({
    host        :         "localhost",
    user        :         "epk_stats",
    password    :         "",
    database     :         "epk_stats"
  });

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
    if(err)
    {
      console.log("Problem with MySQL"+err);
    }
    else
    {
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
