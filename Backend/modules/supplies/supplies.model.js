const mongoose = require('mongoose');

let Supplie = new mongoose.Schema({
    folio                   : { type : String, trim : true },
    name                    : { type : String, trim : true },
    description             : { type : String, trim : true },
    unit_price              : { type : Number, default : 0 },
    public_price            : { type : Number, default : 0 },
    history_price  : {
        highest_price : {
            price           : { type : Number, default : 0 },
            last_modified   : { type : Date }
        },
        lowest_price : {
            price           : { type : Number, default : 0 },
            last_modified   : { type : Date }
        }
    },
    presentation : {
        key                 : { type : String },
        name                : { type : String }
    },
    manufacturer            : { type : String, trim : true },
    active                  : { type : Boolean, default : true },
    cover_photo             : { type : String, trim : true },
    creation_date           : { type : Date, default : Date.now() }
});

module.exports = mongoose.model('supplies', Supplie);