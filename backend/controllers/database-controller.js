const mockSourceDBData = [
  {
    tableName: "users",
    rowCount: 122,
    data: [
      {
        id: "1",
        username: "user",
        email: "user@gmail.com",
      },
      {
        id: "2",
        username: "user2",
        email: "user2@gmail.com",
      },
    ],
  },
  {
    tableName: "orders",
    rowCount: 58,
    data: [
      {
        id: "1",
        orderedBy: "user",
        price: 20.99,
        productsCount: 2,
      },
      {
        id: "2",
        orderedBy: "user2",
        price: 10.99,
        productsCount: 1,
      },
    ],
  },
  {
    tableName: "products",
    rowCount: 34,
    data: [
      {
        id: "1",
        name: "toy",
        price: 10.99,
        rating: 2,
      },
      {
        id: "2",
        name: "Vacuum cleaner",
        price: 10,
        rating: 3,
      },
    ],
  },
];

const mockTargetDBData = [
  {
    tableName: "users",
    rowCount: 0,
    data: [],
  },
  {
    tableName: "orders",
    rowCount: 0,
    data: [],
  },
  {
    tableName: "products",
    rowCount: 0,
    data: [],
  },
];

async function getSourceDBMetadata(req, res, next) {
  const { sourceDbCredentials } = req.body;
  //TODO: Connect to source db and get real metadata
  //TODO: Error handling

  const isInvalid = Object.values(sourceDbCredentials).some(
    (value) => value.trim() === ""
  );

  if (isInvalid) {
    return res.status(400).json({
      error: { message: "Invalid database credentials." },
      tables: null,
    });
  }

  res.json({
    error: null,
    tables: mockSourceDBData.map((data) => {
      return {
        rowCount: data.rowCount,
        tableName: data.tableName,
      };
    }),
  });
}

async function connectTargetDb(req, res, next) {
  const { targetDbCredentials } = req.body;
  //TODO: Establish connection to target DB
  //TODO: Error handling

  const isInvalid = Object.values(targetDbCredentials).some(
    (value) => value.trim() === ""
  );

  if (isInvalid) {
    res.status(400).json({
      success: false,
      error: { message: "Invalid database credentials." },
    });
  }

  res.json({ success: true, error: null });
}

async function getSourceDBColumnNames(req, res, next) {
  const { tableName } = req.params;
  //TODO: Get real column data from source db
  //TODO: Error handling

  if (!tableName) {
    res.status(400).json({
      error: { message: "Invalid table name." },
      tables: null,
    });
  }

  const table = mockSourceDBData.find((table) => table.tableName === tableName);
  const tableColumns = Object.keys(table.data[0]);
  console.log(tableColumns);

  res.json({
    error: null,
    columns: tableColumns,
  });
}

async function migrateTables(req, res, next) {
  const { selectedTables } = req.body;
  //TODO: Connect to target db and migrate real data from source db
  //TODO: Error handling

  if (!selectedTables || selectedTables.length === 0) {
    res.status(400).json({
      error: { message: "No selected tables found." },
      success: false,
    });
  }

  mockTargetDBData.map((table) => {
    if (selectedTables.includes(table.tableName)) {
      const sourceTable = mockSourceDBData.find(
        (src) => src.tableName === table.tableName
      );
      if (sourceTable) {
        table.data = sourceTable.data;
      }
    }
  });

  res.json({ success: true, error: null });
}

exports.getSourceDBMetadata = getSourceDBMetadata;
exports.connectTargetDb = connectTargetDb;
exports.getSourceDBColumnNames = getSourceDBColumnNames;
exports.migrateTables = migrateTables;
