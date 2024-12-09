const express = require('express')
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require('mongoose');
const universityRoute = require("./routes/universityRoute.js");
const morgan = require('morgan');


//middleware
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'));

// Constants
const PORT = process.env.PORT || 3001;
const Mongo_DB_URL = process.env.MONGO_DB_URL;

//  MongoDB
mongoose.connect(Mongo_DB_URL)
.then(()=>{
    console.log("MongoDB connected successfully")
}).catch((error)=>{
    console.log(`Failed to connect MongoDB ${error.message}`)
});

// routing 
app.use("/universities", universityRoute)

// server
app.listen(PORT, ()=>{
    console.log(`Server Running on : ${PORT}`)
})