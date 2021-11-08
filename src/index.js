var http = require("http");

const mysql = require("mysql");

// Create connection to the database
// Port 3306
const connection = mysql.createConnection({
  // Very secure having the login here!
  host: "sql4.freesqldatabase.com",
  user: "sql4448572",
  password: "dfJrCIKHrZ",
  database: "sql4448572"
});
let out = "";

//create a server object:

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to Database!");
  createTable(); //create a server object:
});

function createTable() {
  connection.query("drop table if exists calc;", function (err, result) {
    console.log("Drop table:");
    console.log(result);
    out += "drop table:" + err + "\n";
    // fail if table is already created hence drop it before
    connection.query("create table calc(x int, y int);", function (
      err,
      result
    ) {
      console.log("Create table:");
      console.log(result);
      out += "create table:" + err + "\n";
      populateTable();
    });
  });
}

function populateTable() {
  connection.query("insert into calc values(10, 25),(7, 12),(9,4);", function (
    err,
    result
  ) {
    console.log("Insert into table:");
    console.log(result);
    out += "insert into calc:" + result + "\n";
  });
  queryDatabase();
}

function queryDatabase() {
  connection.query("select x,y, (x+y) from calc;", function (
    err,
    result,
    fields
  ) {
    console.log("select result:");
    console.log(result);
    console.log(fields);
    for (let row of result) {
      out += "select x,y: " + row.x + ", " + row.y + "\n";
    }
    http
      .createServer(function (req, res) {
        res.write("Hello World!\n");
        res.write(out); //write a response to the client
        res.end(); //end the response
      })
      .listen(8080); //the server object listens on port 8080
  });
}
