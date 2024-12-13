const express = require('express')
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require('mongoose');
const path = require('path')

const universityRoute = require("./routes/universityRoute.js");
const countryRoute = require("./routes/countryRoute.js");

const morgan = require('morgan');


//middleware
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));    // for public pages

// Constants
const PORT = process.env.PORT || 3001;
const Mongo_DB_URL = process.env.MONGO_DB_URL;

//  MongoDB
mongoose.connect(Mongo_DB_URL)
.then(()=>{
    console.log("MongoDB connected successfully")
}).catch((error)=>{
    console.log(`Failed to connect MongoDB : ${error.message}`)
});


// routing 
app.use("/", universityRoute);
app.use("/", countryRoute);


// server
app.listen(PORT, ()=>{
    console.log(`Server Running on : ${PORT}`)
})