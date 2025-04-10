const mysql = require("mysql2");
let sourceConnectionMySQL = null;

async function setConnection(config) {
  //TODO: set connection
}

exports.sourceConnectionMySQL = sourceConnectionMySQL;
exports.setConnection = setConnection;
