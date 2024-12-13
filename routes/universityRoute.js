const express = require('express')
const router = express.Router();

const universityController = require("../controllers/universityController.js")

router.get("/universities", universityController.getAllUniversities);
router.get("/store", universityController.getAllUniversities);
router.get("/university/:name", universityController.getUniversityData);

router.get("/capital", universityController.fetchCapitalUniversity)   // find universities in capitals of country 
router.post("/addUniversities",universityController.addUniversity)   // Add a university
router.put("/:name", universityController.updateUniversity)   // update information for university
router.delete("/:deleteUniversity", universityController.deleteUniversity) // delete university

module.exports = router;
