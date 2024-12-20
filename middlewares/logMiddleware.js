// winston for logging data in files and displaying it on console.
const fs = require('fs');
const path = require('path')

const logMiddleware = (req, res, next) => {
    const logMssg = `[${new Date().toISOString()}] ${req.method} ${req.url} \n`;
    const filePath = path.join(__dirname, '../logs/log.txt');

    fs.appendFile(filePath, logMssg, (err) =>{
        if(err)
        {
            console.error("Failed to write Details to Log.txt File!!!! because of : ", err)
        }
    });
    console.log(logMssg.trim());
    next();     // to handover control to the next middleware.
}

module.exports = logMiddleware;