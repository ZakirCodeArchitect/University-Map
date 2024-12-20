// winston for logging data in files and displaying it on console.
const fs = require('fs');
const path = require('path')

const errorMiddleware = (err, req, res, next) => {
    const errMssg = `[${new Date().toISOString()}] ERROR: ${err.message}\nSTACK: ${err.stack}\n`;
    const filePath = path.join(__dirname, '../logs/log.txt');
    
    fs.appendFile(filePath, errMssg, (err) =>{
        if(err)
        {
            console.error("ERROR: Failed to write erros to Log.txt File!!!! because of : ", err)
            
        }
    });
    console.error(errMssg.trim());
    
    res.status(500).json({
        message: "Error occured: ", 
        error: err.message
    });
}

module.exports = errorMiddleware;