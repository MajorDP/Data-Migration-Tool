const express = require("express");
const databaseController = require("../controllers/database-controller");

const router = express.Router();

router.post("/connect/source", databaseController.getSourceDBMetadata);
router.post("/connect/target", databaseController.connectTargetDb);
router.get("/columns/:tableName", databaseController.getSourceDBColumnNames);
router.patch("/migrate", databaseController.migrateTables);

module.exports = router;
