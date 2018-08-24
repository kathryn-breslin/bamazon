var mysql = require("mysql");

var config = {
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "",
    database: "bamazonDB"
}

var connection = mysql.createConnection(config);

connection.connect(function(err) {
    if (err) {
        console.log("Error: ", err)
        connection.end();
    }
    else {
        //console.log("Connected");
    }
  });

  module.exports = connection;