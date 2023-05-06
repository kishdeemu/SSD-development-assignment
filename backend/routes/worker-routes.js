const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const verifyAdminToken = require("../auth/verifyAdminToken");
const verifyWorkerToken = require("../auth/verifyWorkerToken");

//Import controllers
const workerControllers = require('../controllers/worker-controller');


//Routes
router.post("/add", verifyWorkerToken, workerControllers.addNewWorker);
router.post("/login", workerControllers.workerLogin);
router.post("/savemsg", verifyWorkerToken, workerControllers.saveMsg);

module.exports = router;