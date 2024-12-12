const { default: axios } = require("axios");
const University = require("../models/universityModel");  // university JSON Data from the web
const { default: mongoose } = require("mongoose");

// processing Data:
const getAllUniversities = async (req, res) => {

    try{
        const url = await axios.get('http://universities.hipolabs.com/search?');

        const universities = url.data;

        const processedData = universities.map((university, index) => ({
            id: index + 1,
            name: university.name,
            state_province: university['state-province'] || 'N/A',
            country: university.country,
            website: university.web_pages.join(', '),
            domains: university.domains.join(', ')

        }));


        res.json({message: "University all over the World", data: processedData});

    } catch(error){
        console.log("Error Getting Data", error.message);
        res.status(500).json({message:"Failed to fetch data of the universities"});
    }

}

const storeAllUniversities = async (req, res) => {

    try{
        const url = await axios.get('http://universities.hipolabs.com/search?');

        const universities = url.data;

        const processedData = universities.map((university, index) => ({
            id: index + 1,
            name: university.name,
            state_province: university['state-province'] || 'N/A',
            country: university.country,
            website: university.web_pages.join(', '),
            domains: university.domains.join(', ')

        }));

        // inserting processed data into Database
        await University.insertMany(processedData);

        res.json({message: "University data has been stored in the database!", data: processedData});

    } catch(error){
        console.log("Error Getting Data", error.message);
        res.status(500).json({message:"Failed to fetch data of the universities"});
    }

}

const getUniversityData = async (req, res) => {
    const { name } = req.params;
  
    try {
      // Await the query result
      const universityData = await University.findOne({
        name: { $regex: new RegExp(name, 'i') }, // Case-insensitive search
      });
  
      // Check if university data exists
      if (!universityData) {
        return res.status(404).json({
          message: "University Not Found!",
        });
      }
  
      // Log the university details
      console.log(`University: ${universityData.name}`);
      console.log(`Website: ${universityData.website}`);
  
      // Respond with the data
      res.status(200).json({
        name: universityData.name,
        website: universityData.website, // Return as an array for better structure
      });
    } catch (error) {
      console.error("Error Fetching Data", error.message);
      res.status(500).json({
        message: `Failed to fetch data for the university: ${name}`,
      });
    }
  };
  

module.exports = {  storeAllUniversities, getAllUniversities, getUniversityData };