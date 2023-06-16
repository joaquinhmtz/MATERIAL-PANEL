const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectModel = new Schema([{
	_id 		: { type : Schema.Types.ObjectId, ref : 'projects' },
	stock 	    : { type : Number, default : 0 },
	transit     : { type : Number, default : 0 },
    expiredDate : { type : Date, default : Date.now() }
}]);

const LotModel = new Schema({
	code            : { type : String, trim : true, uppercase : true },
	suppliedId      : { type : Schema.Types.ObjectId , ref : 'supplies' },
	name 			: { type : String, trim : true, uppercase : true },
	expiredDate     : { type: Date },
	active 			: { type : Boolean, default : true },
	projects        : [ProjectModel]
});

module.exports = mongoose.model('lots', LotModel);