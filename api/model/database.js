require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "covid_talent",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists Candidate; CREATE TABLE Candidate(id int NOT NULL AUTO_INCREMENT, firstname varchar(30) NOT NULL,lastname varchar(30) NOT NULL, email_address varchar(30) NOT NULL, mother tongue varchar(100) NOT NULL DEFAULT '1', department varchar(100) NOT NULL DEFAULT '1', experience varchar(255) NOT NULL, relocation BOOLEAN NOT NULL DEFAULT '1', remote BOOLEAN NOT NULL DEFAULT '1', PRIMARY KEY (`id`));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `Candidate` was successful!");

    console.log("Closing...");
  });

  con.end();
});