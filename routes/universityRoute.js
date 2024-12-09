const express = require('express')
const router = express.Router();

const universityController = require("../controllers/universityController.js")

router.get("/", universityController.getAllUniversities);

module.exports = router;
