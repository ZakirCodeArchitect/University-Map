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

const addUniversity = async (req, res) => {
    
    const universities = [
        {name: "Qau", state: "Islamabad",country: "Pakistan", website: "https://qau.edu.pk/", domain: "qau.edu.pk" },
        {name: "Nust", state: "Islamabad",country: "Pakistan", website: "https://nust.edu.pk/", domain: "nust.edu.pk" },
        {name: "Fast", state: "Islamabad",country: "Pakistan", website: "http://isb.nu.edu.pk/", domain: "nuces.edu.pk" },
        {name: "GIKI", state: "Swabi",country: "Pakistan", website: "https://giki.edu.pk/", domain: "giki.edu.pk" },
        {name: "PIEAS", state: "Islamabad",country: "Pakistan", website: "https://www.pieas.edu.pk/", domain: "pieas.edu.pk" }
    ]

    try {
        await University.insertMany(universities);
        res.status(200).send('Five universities added successfully')

    } catch (error) {
      console.error("Error Storing Data for the universities", error.message);
      res.status(500).json({
        message: `Failed to store data of the universities.`,
      });
    }
};

const deleteUniversity = async (req, res) => {
    const { university } = req.params;

    try {
        await University.findOneAndDelete({university});

        res.status(200).send(`University : ${university} has now been deleted`)

    } catch (error) {
      console.error("Error Deleting university", error.message);
      res.status(500).json({
        message: `Failed to delete university`,
      });
    }
};

const updateUniversity = async (req, res) => {
    const { name } = req.params;
    const updateDetails = req.body;

    try {
        // res.send(name); // -> correct
        // res.send(updateDetails);   // -> correct

      // Await the query result
      const updatedUniversityData = await University.findOneAndUpdate(
        {name: { $regex: new RegExp(name, 'i') }}, // Case-insensitive search
        updateDetails,
        { new: true } 
      );
  
      // Check if university data exists
      if (!updatedUniversityData) {
        return res.status(404).json({
          message: "University Not Found!",
        });
      }
      
      // Respond with the data
      res.status(200).json({
        message: "University Data Updated Successfully",
        data: updatedUniversityData
      });
    } catch (error) {
        console.error("Error updating university:", error.message);
        res.status(500).json({
            message: "Failed to update university",
        });
    }
};

const fetchCapitalUniversity = async (req, res) => {
    const capitals = ["Islamabad", "Mumbai", "tehran", "Buenos Aires", "Berlin"]

    try {
        const results = {}

        for(const capital of capitals)
        {
            results[capital] = await University.find(
                {state_province: { $regex: new RegExp(capital, 'i') }}
            )
        }
      
      // Respond with the data
      res.status(200).json(results);
    } catch (error) {
        console.error("Error Fetching universities Data ", error.message);
        res.status(500).json({
            message: "Failed to fetch universities data",
        });
    }
};

// from gpt
const fetchCapitalUniversitySeparate = async (req, res) => {
    const results = {}
    const capitals = [
        "Islamabad",
        "tehran"
    ]

    try {
        for (const [country, capital] of capitals) {
            const collectionName = `${country}s`; // Form collection name
            const University = mongoose.connection.collection(collectionName);

            // Fetch universities in the capital
            const universities = await University.find({ state_province: capital }).toArray();
            results[country] = universities;
        }

        res.status(200).json({
            message: "Universities in capitals of the five countries",
            data: results,
        });

    } catch (error) {
        console.error(`Error Fetching universities of capitals for this country: ${country}`, error.message);
        res.status(500).json({
            message: "Failed to fetch universities of capitals!",
        });
    }
};

module.exports = {  
    storeAllUniversities, 
    getAllUniversities, 
    getUniversityData, 
    addUniversity, 
    deleteUniversity,
    updateUniversity,
    fetchCapitalUniversity,
    fetchCapitalUniversitySeparate 
};