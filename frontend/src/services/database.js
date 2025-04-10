export async function getSourceDBMetadata(dbCredentials) {
  const res = await fetch("http://localhost:3000/connect/source", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sourceDbCredentials: dbCredentials }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { data: null, error: data.error.message };
  }

  return { data: data.tables, error: null };
}

export async function connectTargetDb(dbCredentials) {
  const res = await fetch("http://localhost:3000/connect/target", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ targetDbCredentials: dbCredentials }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data.error.message };
  }

  return { success: true, error: null };
}

export async function getTableColumnNames(tableName) {
  const res = await fetch("http://localhost:3000/columns/" + tableName);

  const data = await res.json();

  if (!res.ok) {
    return { data: null, error: data.error.message };
  }

  return { data: data.columns, error: null };
}

export async function migrateTables(selectedTables) {
  const res = await fetch("http://localhost:3000/migrate", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ selectedTables }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { success: false, error: data.error.message };
  }

  return { success: true, error: null };
}
