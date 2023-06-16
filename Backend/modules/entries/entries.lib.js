const EntrieModel    = require('./entries.model');
const LotModel       = require('./../extras/models/lots.model');
const EntrieHelper   = require('./entries.helper');
const UtilHelper     = require('./../../utils/scripts/utils-global');
const SupplieLib     = require('./../supplies/supplies.lib');
const ExtraLib       = require('./../extras/extras.lib');
const cloneDeep      = require('lodash').cloneDeep;
const async          = require('async');
const mongoose       = require('mongoose');

function EntrieNew(data) {
	return new Promise(async (resolve, reject) => {
		try {
            let folio = await UtilHelper.CreateFolio({ type : 'ENTRIES', prefix : 'E' });
            data.folio = folio;
			let model = new EntrieModel(data);
            let save = model.save();

            if (save) resolve(true);
		} catch (e) {
			reject(e);
		}
	});
}

const EntrieOperationStock = async function (supplie, callback) {
    let lot;
    let query;
    let updateQuery;
    let expiredDateTemp = new Date(supplie.expiredDate);
    let expiredDateFinal = new Date(expiredDateTemp.getFullYear(), expiredDateTemp.getMonth(), expiredDateTemp.getDate());
    let searchLote = await SupplieLib.SearchLoteSupplie({ suppliedId : supplie._id });
    if (searchLote && searchLote.exists) lot = await LotModel.find({ _id : searchLote.lot._id, expiredDate : expiredDateFinal });
    else lot = await ExtraLib.CreateLot({ suppliedId : supplie._id, expiredDate : expiredDateFinal });

    query = {
        "_id": (Array.isArray(lot) ? lot[0]._id : lot._id),
        "projects" : {
            "$elemMatch" : {
                '_id': new mongoose.Types.ObjectId('648b92d4c48148b419bf0dde')
            }
        }
    };
    updateQuery = {
        '$inc': {
            'projects.$.stock': supplie.quantity
        }
    };

    const increment = await LotModel.updateOne(query, updateQuery);

    return true;
};

function EntrieAddStock(data) {
    return new Promise(async (resolve, reject) => {
		try {

            async.eachSeries(data.supplies, EntrieOperationStock)
            .then( () => {
                console.log('Todo el stock ha sido añadido satisfactoriamente');
                resolve(true);
            }).catch( err => {
                console.log(err);
            });

		} catch (e) {
			reject(e);
		}
	});
}

function EntrieCountList (data) {
    return new Promise(async (resolve, reject) => {
		try {
            console.log('qijsiwqjsi')
			let query = await EntrieHelper.GetQueryEntrieList(data);
            
            let pipeline = [];
            pipeline.push({ $match : query });
			pipeline.push({ $sort : { name : -1 } });
			
			let pipelineCount = cloneDeep(pipeline);
			pipelineCount.push({ $count: 'total' });

			let count = await EntrieModel.aggregate(pipelineCount)
            
            if (count[0] && count[0].total) resolve(count);
			else resolve ([{total:0}]);

		} catch (e) {
			reject(e);
		}
	});
}

function EntrieList (data) {
    return new Promise(async (resolve, reject) => {
		try {
			let query = await EntrieHelper.GetQueryEntrieList(data);
            
            let pipeline = [];
            pipeline.push({ $match : query });
            pipeline.push({ 
				$project: {
					_id : "$_id",
					folio : "$folio",
                    supplies : "$supplies",
                    creation_date : "$creation_date",
				}
			});

			let list = await EntrieModel.aggregate(pipeline).sort({ folio : -1 })
            if (list) resolve(list);

		} catch (e) {
			reject(e);
		}
	});
}

module.exports = {
    EntrieNew,
    EntrieAddStock,
    EntrieCountList,
    EntrieList
};