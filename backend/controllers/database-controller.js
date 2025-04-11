const {
  setSourceConnection,
  getSourceConnection,
} = require("../connections/source");
const {
  setTargetConnection,
  getTargetConnection,
} = require("../connections/target");

async function getSourceDBMetadata(req, res, next) {
  const { sourceDbCredentials } = req.body;

  const isInvalid = Object.values(sourceDbCredentials).some(
    (value) => value.trim() === ""
  );

  if (isInvalid) {
    return res.status(400).json({
      error: { message: "Invalid database credentials." },
      tables: null,
    });
  }

  const { connection: source, error } = await setSourceConnection(
    sourceDbCredentials
  );

  if (error) {
    console.log("aaa");
  }

  try {
    let [tables] = await source.query(
      `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ? AND table_type = 'BASE TABLE';`,
      [sourceDbCredentials.dbName]
    );

    const tableMetadata = [];

    for (row of tables) {
      const [countResult] = await source.query(
        `SELECT COUNT(*) FROM ${row.TABLE_NAME}`
      );

      tableMetadata.push({
        tableName: row.TABLE_NAME,
        rowCount: countResult[0]["COUNT(*)"],
      });
    }

    res.json({
      error: null,
      tables: tableMetadata,
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        message: error.sqlMessage || "Failed to connect to source database.",
      },
      tables: null,
    });
  }
}

async function connectTargetDb(req, res, next) {
  const { targetDbCredentials } = req.body;

  const isInvalid = Object.values(targetDbCredentials).some(
    (value) => value.trim() === ""
  );

  if (isInvalid) {
    res.status(400).json({
      success: false,
      error: { message: "Invalid database credentials." },
    });
  }

  const { connection: target, error } = await setTargetConnection(
    targetDbCredentials
  );

  if (error) {
    res.status(400).json({
      success: false,
      error: { message: "Failed to connect to database." },
    });
  }

  res.json({ success: true, error: null });
}

async function getSourceDBColumnNames(req, res, next) {
  const { tableName } = req.params;

  if (!tableName) {
    res.status(400).json({
      error: { message: "Invalid table name." },
      tables: null,
    });
  }

  const source = getSourceConnection();
  const [columns] = await source.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_NAME = ? AND TABLE_SCHEMA = DATABASE()`,
    [tableName]
  );

  const tableColumns = columns.map((col) => col.COLUMN_NAME);

  res.json({
    error: null,
    columns: tableColumns,
  });
}

async function migrateTables(req, res, next) {
  const { selectedTables } = req.body;

  if (!selectedTables || selectedTables.length === 0) {
    res.status(400).json({
      error: { message: "No selected tables found." },
      success: false,
    });
  }

  const source = await getSourceConnection();
  const target = await getTargetConnection();

  if (!source || !target) {
    return res.status(500).json({
      error: { message: "Failed to connect to the databases." },
      success: false,
    });
  }

  try {
    for (let tableName of selectedTables) {
      const [sourceData] = await source.query(`SELECT * FROM ${tableName}`);

      console.log(sourceData);
      const insertValues = sourceData.map((row) => {
        return Object.values(row);
      });

      const columnNames = Object.keys(sourceData[0]).join(", ");

      const colCount = Object.keys(sourceData[0]).length;
      const placeholders = sourceData
        .map(() => `(${new Array(colCount).fill("?").join(", ")})`)
        .join(", ");

      const sql = `INSERT INTO ${tableName} (${columnNames}) VALUES ${placeholders}`;

      await target.query(sql, [...insertValues.flat()]);

      console.log(`Migrated data for table ${tableName}`);
    }

    return res.json({ success: true, error: null });
  } catch (error) {
    console.log(error.sqlMessage);
    return res.status(500).json({
      error: {
        message:
          error.sqlMessage || "Failed migrating data to target database.",
      },
      success: false,
    });
  }
}

exports.getSourceDBMetadata = getSourceDBMetadata;
exports.connectTargetDb = connectTargetDb;
exports.getSourceDBColumnNames = getSourceDBColumnNames;
exports.migrateTables = migrateTables;
