const { default: axios } = require("axios");
const { default: mongoose } = require("mongoose");
const path = require('path')

const mainFile = path.join(__dirname, '../views/main.html');
// const homeFile = path.join(__dirname, "../views/home.html")

const countrySchema = new mongoose.Schema({
    name: String,
    state_province: String,
    country: String,
    website: [String],
    domain: [String]
},{
    timestamps: true
});


const mainPage = async (req, res) => {
    res.sendFile(mainFile)
}

// processing Data:
const countryUniversities = async (req, res) => {
    const  { country } = req.params;

    try{
        const url = await axios.get(`http://universities.hipolabs.com/search?country=${country}`)
        const universities = url.data;

        if(!universities.length){
            return res.status(204).json({
                message: `No university found for this country : ${country}`
            })
        }

        const processedData = universities.map((university, index) => ({
            id: index + 1,
            name: university.name,
            state_province: university['state-province'] || 'N/A',
            country: university.country,
            website: university.web_pages.join(', '),
            domains: university.domains.join(', ')

        }));

        const numOfUniversities = universities.length;

        res.json({message: ` Universities in this ${country} : ${numOfUniversities}`, data: processedData});

    } catch(error){
        console.log("Error Getting Data", error.message);
        res.status(500).json({message:"Failed to fetch data of the universities"});
    }

    
}

const storecountryUniversities = async (req, res) => {
    const  { country } = req.params;

    try{
        const url = await axios.get(`http://universities.hipolabs.com/search?country=${country}`)
        const universities = url.data;

        if(!universities.length){
            return res.status(204).json({
                message: `No university found for this country : ${country}`
            })
        }

        const countryModel = mongoose.model( `${country}`, countrySchema);

        const processedData = universities.map((university, index) => ({
            id: index + 1,
            name: university.name,
            state_province: university['state-province'] || 'N/A',
            country: university.country,
            website: university.web_pages.join(', '),
            domains: university.domains.join(', ')

        }));

        // inserting processed data into Database
        await countryModel.insertMany(processedData);
        const numOfUniversities = universities.length;

        res.json({message: ` ${numOfUniversities} universities data has been stored in the database for ${country}`, data: processedData});

    } catch(error){
        console.log("Error Getting Data", error.message);
        res.status(500).json({message:"Failed to fetch data of the universities"});
    }

    
}

module.exports = { countryUniversities, storecountryUniversities, mainPage};

