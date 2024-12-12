const express = require('express')
const router = express.Router();

const universityController = require("../controllers/universityController.js")

router.get("/", universityController.getAllUniversities);
router.get("/store", universityController.getAllUniversities);
router.get("/:name", universityController.getUniversityData);

module.exports = router;
