const mysql = require("mysql2/promise");
let targetConnectionMySQL = null;

async function setTargetConnection(config) {
  try {
    console.log(config);
    targetConnectionMySQL = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.dbUsername,
      password: config.dbPassword,
      database: config.dbName,
    });

    return { connection: targetConnectionMySQL, error: null };
  } catch (error) {
    return { connection: null, error: error };
  }
}

function getTargetConnection() {
  return targetConnectionMySQL;
}

exports.getTargetConnection = getTargetConnection;
exports.setTargetConnection = setTargetConnection;
