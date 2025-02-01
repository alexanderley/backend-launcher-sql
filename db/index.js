// SQL Setup
const mysql = require('mysql2');

SQL_PASSWORD = process.env.SQL_PASSWORD;

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: "root",
  password: SQL_PASSWORD, 
  database:  "test"
}).promise()

module.exports = pool

