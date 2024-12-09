const { default: axios } = require("axios");
const University = require("../models/universityModel");  // university JSON Data from the web

const getAllUniversities = async (req, res) => {

    try{
        const response = await axios.get('http://universities.hipolabs.com/search?country=Pakistan');

        const universities = response.data;

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

module.exports = { getAllUniversities };