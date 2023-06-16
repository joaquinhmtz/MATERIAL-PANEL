const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Counter = new Schema({
	counter         : { type : Number, default : 0 },                                              
    name            : { type : String, uppercase: true },
    type            : { type : String, uppercase: true },
    lastFolio       : { type : String, trim : true }
});

module.exports = mongoose.model('counters', Counter);