const SupplieModel    = require('./supplies.model');
const SupplieHelper   = require('./supplies.helper');
const LotModel		  = require('./../extras/models/lots.model');
const UtilHelper	  = require('./../../utils/scripts/utils-global');
const cloneDeep       = require('lodash').cloneDeep;
const mongoose        = require('mongoose');
const suppliesModel = require('./supplies.model');

function SupplieNew(data) {
	return new Promise(async (resolve, reject) => {
		try {
			let model = new SupplieModel(data);
            let save = model.save();

            if (save) resolve(true);
		} catch (e) {
			reject(e);
		}
	});
}

function SupplieCountList (data) {
    return new Promise(async (resolve, reject) => {
		try {
			let query = await SupplieHelper.GetQuerySupplieList(data);
            
            let pipeline = [];
            pipeline.push({ $match : query });
			pipeline.push({ $sort : { name : 1 } });
			
			let pipelineCount = cloneDeep(pipeline);
			pipelineCount.push({ $count: 'total' });

			let count = await SupplieModel.aggregate(pipelineCount)
            
            if (count[0] && count[0].total) resolve(count);
			else resolve ([{total:0}]);

		} catch (e) {
			reject(e);
		}
	});
}

function SupplieList (data) {
    return new Promise(async (resolve, reject) => {
		try {
			let query = await SupplieHelper.GetQuerySupplieList(data);

            let pipeline = [];
            pipeline.push({ $match : query });
            pipeline.push({ 
				$project: {
					_id : "$_id",
					name : "$name",
                    description : "$description",
					presentation : "$presentation",
                    public_price : "$public_price"
				}
			});

			let list = await SupplieModel.aggregate(pipeline).sort({ name : 1 })
            if (list) resolve(list);

		} catch (e) {
			reject(e);
		}
	});
}

function SuppliegetById (_id) {
    return new Promise(async (resolve, reject) => {
		try {
			let supplie = await SupplieModel.findOne({ _id : new mongoose.Types.ObjectId(_id) });

			resolve(supplie);
		} catch (e) {
			reject(e);
		}
	});
}

function SupplieUpdate(data) {
	return new Promise(async (resolve, reject) => {
		try {
			let supplie = await suppliesModel.updateOne({ _id : new mongoose.Types.ObjectId(data._id) }, { $set : data });

            if (supplie) resolve(true);
		} catch (e) {
			reject(e);
		}
	});
}

/** FUNCTIONS USED IN THE OTHER MODULES **/
function SearchLoteSupplie (data) {
	return new Promise (async (resolve, reject) => {
		try {
			let lot = await LotModel.findOne({ suppliedId : data.suppliedId });

			resolve((lot && lot._id) ? { lot : lot, exists : true } : { lot : {}, exists : false });
		} catch (e) {
			reject(e);
		}
	});
}

module.exports = {
    SupplieNew,
    SupplieCountList,
    SupplieList,
	SuppliegetById,
	SupplieUpdate,
	SearchLoteSupplie,
};