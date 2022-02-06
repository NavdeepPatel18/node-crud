"use strict";

const mysql = require("mysql");

const dbConn = mysql.createConnection({
  host: "localhost",
  user: "nawab",
  password: "nawab@1234",
  database: "vmukti",
});

dbConn.connect(function (err) {
  if (err) throw new Error("Database connection lost or not connected:" + err);
  console.log("Database Connected");
});

module.exports = dbConn;
