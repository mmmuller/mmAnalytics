var mysql = require("mysql");
var mmProps = require("mmProps");
var Q = require("q");

module.exports = {
	init : function() {
		mmProps.set("Database host", "localhost", "db:host");
		mmProps.set("Database user", "epk_stats", "db:user");
		mmProps.set("Database password", "xxxx", "db:password");
		mmProps.set("Database database", "epk_stats", "db:database");
	},
	connect : function() {
		var connection = mysql.createConnection(mmProps.get("db"));

		connection.connect(function(error){
			if(error)			{
				console.log("Problem with MySQL"+error);
			}
			else			{
				console.log("Connected with Database");
			}
		});
		return connection;
	}
}
