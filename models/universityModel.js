const mongoose = require('mongoose')

// defining the dataTypes of the variables
const universitySchema = mongoose.Schema({
    name: String,
    state_province: String,
    country: String,
    website: String,
    domain: String
},{
    timestamps: true
});

module.exports = mongoose.model("university", universitySchema)