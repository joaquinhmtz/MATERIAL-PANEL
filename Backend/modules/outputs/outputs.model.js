const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Supplie = new Schema({
    _id                     : { type : Schema.Types.ObjectId },
    name                    : { type : String, trim : true },
    description             : { type : String, trim : true },
    quantity                : { type : Number, default : 0 },
});

let User = new Schema({
    _id                     : { type : Schema.Types.ObjectId },
    fullname                : { type : String, trim : true}
});

let Output = new Schema({
    folio                   : { type : String, trim : true },
    supplies                : [Supplie],
    project : {
        _id                 : { type : Schema.Types.ObjectId },
        name                : { type : String, trim : true }
    },
    payment : {
        key                 : { type : String },
        name                : { type : String }
    },
    type : {
        key                 : { type : String },
        name                : { type : String }
    },
    user                    : User,
    creation_date           : { type : Date, default : Date.now() },
    observations            : { type : String, trim : true },
});

module.exports = mongoose.model('outputs', Output);