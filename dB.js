var express = require('express');
var mysql = require('mysql');
//var db =require('./database');
var sql = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "final"
});

sql.connect(function(err) {
  if (err){
    console.error('error connecting: ' + err.stack); 
    return;
  }
  console.log('Connected as id' +sql.threadId); 
  
  var MakeTable = "CREATE TABLE firstst(firstName varchar(250), lastName varchar(250), mobilePhone varchar(250), email varchar(250), message varchar(300))";
  sql.query(MakeTable, function(err, result){
    if (err){
      console.error('Can not create the table');
      return;
    }
    console.log("Table created successfully...");
  })
  /*   Delete the Table 
  
  var DelTable = "DROP TABLE neww"; 
  sql.query(DelTable, function(err, result){
  if (err){
    console.error('Can not Delete the table'); 
    return;
  }
  console.log("Table Deleted successfully...");
})
*/
});


