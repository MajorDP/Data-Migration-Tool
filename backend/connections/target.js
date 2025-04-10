const mysql = require("mysql2");
let targetConnectionMySQL = null;

async function setConnection(config) {
  //TODO: set connection
}

exports.targetConnectionMySQL = targetConnectionMySQL;
exports.setConnection = setConnection;
