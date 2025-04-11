const mysql = require("mysql2/promise");
let sourceConnectionMySQL = null;

async function setSourceConnection(config) {
  try {
    console.log(config);
    sourceConnectionMySQL = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.dbUsername,
      password: config.dbPassword,
      database: config.dbName,
    });

    return { connection: sourceConnectionMySQL, error: null };
  } catch (error) {
    return { connection: null, error: error.message };
  }
}

function getSourceConnection() {
  return sourceConnectionMySQL;
}

exports.getSourceConnection = getSourceConnection;
exports.setSourceConnection = setSourceConnection;
