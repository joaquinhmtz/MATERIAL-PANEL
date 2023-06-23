const LotModel      = require('./models/lots.model');
const UtilHelper    = require('./../../utils/scripts/utils-global');
const mongoose      = require('mongoose');

function CreateLot (data) {
    return new Promise (async (resolve, reject) => {
        try {
            let defaultData = { 
                code : 'APAPACHO METEPEC - LOCAL', 
                name : 'APAPACHO METEPEC - LOCAL',
                suppliedId : data.suppliedId,
                expiredDate : data.expiredDate,
                projects : [{
                    _id : '648b92d4c48148b419bf0dde',
                    stock : 0,
                    transit : 0
                }],
                appliedExpiredDate : data.appliedExpiredDate
            };
            let obj = new LotModel(defaultData);
            let save = await obj.save();
            let lot = await LotModel.findOne({ suppliedId : data.suppliedId, expiredDate : data.expiredDate });

            resolve(lot);
        } catch(e) {
            reject(e);
        }
    });
}


function SupplieListStock(data) {
	return new Promise(async (resolve, reject) => {
		try {
			let pipeline = [];
			pipeline.push({
                $lookup: {
                    from: "supplies",
                    localField: "suppliedId",
                    foreignField: "_id",
                    as: "supplieData"
                }
            });
            pipeline.push({ $unwind : "$supplieData" });
            pipeline.push({ $unwind : "$projects" });
            pipeline.push({
                $match : { 
                    "projects._id" : new mongoose.Types.ObjectId('648b92d4c48148b419bf0dde'), 
                    "active" : true
                }
            });
            pipeline.push({
                $group : {
                    _id : "$suppliedId",
                    name : { $first:"$supplieData.name" },
                    description : { $first:"$supplieData.description" },
                    stock :  { $first:"$projects.stock" },
                    expiredDate :  { $first:"$projects.expiredDate" },
                    lotId : { $first:"$_id" },
                    lotName : { $first:"$name" }
                }
            });
            pipeline.push({
                $project : {
                    _id : 1,
                    name : 1,
                    description : 1,
                    fullname : { $concat: [ "$name", " - ", "$description" ] },
                    stock : 1,
                    expiredDate : 1,
                    lotId : 1,
                    lotName : 1
                }
            });
			let list = await LotModel.aggregate(pipeline).sort({ name : 1 })
            
			if (list) resolve(list);
		} catch (e) {
			reject(e);
		}
	});
}

function GetLoteSupplieWithProject (data) {
    return new Promise(async (resolve, reject) => {
        try {
            let pipeline = [];
            pipeline.push({
                $match : { _id : new mongoose.Types.ObjectId(data._id) }
            });
            pipeline.push({ $unwind : "$projects" });
            pipeline.push({
                $match : { 'projects._id' : new mongoose.Types.ObjectId(data.projectId) }
            });

            let lot = await LotModel.aggregate(pipeline);

            if (lot) resolve(lot);
        } catch (e) {
			reject(e);
		}
    });
}

module.exports = {
    CreateLot,
    SupplieListStock,
    GetLoteSupplieWithProject
};