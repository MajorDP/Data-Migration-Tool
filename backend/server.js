const express = require("express");
const cors = require("cors");
const databaseRoutes = require("./routes/database-routes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", databaseRoutes);

app.listen(3000);
