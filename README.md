# 🛠️ Data Migration App (Mock Backend)

This is a skeleton implementation of a **React + Node.js** data migration tool, designed to connect to a source database, inspect its schema, and migrate selected table data to a target database. This version uses **mock data** to simulate the process and establish the full flow.

---

## 🚀 Features

### ✅ Connect to Source Database

- Accepts source DB credentials via a form.
- Simulates establishing a connection.
- Retrieves **table metadata** including:
  - Table names
  - Row counts
  - Column names

### ✅ Connect to Target Database

- Accepts target DB credentials.
- Simulates setting up a writable target database.

### 🔁 Exchange / Migrate Data

- Users can select tables to "migrate".
- Simulated transfer of table data from the source to the target.

---

## 💡 Next Features

This skeleton is set up for expansion into a real backend:

- Replace mock data with actual MySQL or MongoDB connections.
- Add connection with `mysql2` drivers.
- Implement actual row-by-row migration or bulk insert logic.

---

## 🧱 Tech Stack

| Layer    | Stack              |
| -------- | ------------------ |
| Frontend | React, TailwindCSS |
| Backend  | Node.js, Express   |

---

## 🛠️ Project Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MajorDP/Data-Migration-Tool
   ```

2. **Install dependencies**:
   Navigate into both /frontend and /backend and install the required dependencies:

   ```bash
   npm install
   ```

3. **MySQL Database Setup**
   Make sure you have MySQL installed and running on your machine. You can use tools like MySQL Workbench or the terminal to manage your database.

   ```bash
   CREATE DATABASE source_db;
   CREATE DATABASE target_db;
   ```

Inside source_db and target_db:

```bash
CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. **Run the development server**:
   Start the development server with:

In /frontend

```bash
npm run dev
```

In /backend

```bash
npm start
```
