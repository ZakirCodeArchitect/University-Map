const express = require('express')
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const logMiddleware = require('./middlewares/logMiddleware.js')

const universityRoute = require("./routes/universityRoute.js");
const countryRoute = require("./routes/countryRoute.js");

const morgan = require('morgan');


//middleware
app.use(express.urlencoded({ extended: false }))
app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));    // for public pages
app.use(logMiddleware); 

// Constants
const PORT = process.env.PORT || 3001;
const Mongo_DB_URL = process.env.MONGO_DB_URL;

//  MongoDB
mongoose.connect(Mongo_DB_URL)
.then(()=>{
    console.log("MongoDB connected successfully")
}).catch((error)=>{
    app.use(errorMiddleware);
    console.log(`Failed to connect MongoDB : ${error.message}`)
});


// routing 
app.use("/", universityRoute);
app.use("/", countryRoute);


// server
app.listen(PORT, () => {
    const serverMessage = `[${new Date().toISOString()}] INFO: Server started on PORT: ${PORT}\n`;
    console.log(serverMessage.trim());

    const fs = require('fs');
    const path = require('path');

    const filePath = path.join(__dirname, './logs/log.txt');
    fs.appendFile(filePath, serverMessage, (err) => {
        if(err)
        {
            app.use(errorMiddleware);
            console.error(`ERROR: Failed to write to log File`)
        }
    })
})