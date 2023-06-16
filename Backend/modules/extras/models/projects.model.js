const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectModel = new Schema({
    name 	        : { type : String, trim : true },
    rfc 	        : { type : String, trim : true },
    street 	        : { type : String, trim : true },
    creationDate    : { type : Date, default : Date.now() },
    active 	        : { type : Boolean, default : true },
});

module.exports = mongoose.model('projects', ProjectModel);