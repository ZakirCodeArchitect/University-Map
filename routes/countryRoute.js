const express = require('express')
const router = express.Router();
const path = require('path')

const countryController = require("../controllers/countryController.js")
const mainFile = path.join(__dirname, '../views/main.html');

router.get("/:country", countryController.countryUniversities);
router.get("/store/:country", countryController.storecountryUniversities);
router.get("/", countryController.mainPage)

module.exports = router;
