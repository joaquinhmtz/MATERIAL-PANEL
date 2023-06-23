const OutputModel       = require('./outputs.model');
const LotModel          = require('./../extras/models/lots.model');
const ExtraLib          = require('./../extras/extras.lib');
const UtilHelper        = require('./../../utils/scripts/utils-global');
const async             = require('async');
const mongoose          = require('mongoose');


function OutputNew(data) {
	return new Promise(async (resolve, reject) => {
		try {
            let folio = await UtilHelper.CreateFolio({ type : 'OUTPUTS', prefix : 'O' });
            data.folio = folio;
			let model = new OutputModel(data);
            let save = model.save();

            if (save) resolve(true);
		} catch (e) {
			reject(e);
		}
	});
}

function OutputDecrementStock(data) {
    return new Promise(async (resolve, reject) => {
		try {
            async.eachSeries(data.supplies, OutputOperationStock)
            .then( () => {
                console.log('Todo el stock ha sido restado satisfactoriamente');
                resolve(true);
            }).catch( err => {
                console.log(err);
            });

		} catch (e) {
			reject(e);
		}
	});
}

const OutputOperationStock = async function (data) {
    try {
        let query;
        let updateQuery;
        let quantitytemp = 0;
        let notSufficientStock = [];

        let lot = await ExtraLib.GetLoteSupplieWithProject({ _id : data.lotId, projectId : '648b92d4c48148b419bf0dde' });
        //pruebas con 0
        if (lot[0].projects.stock < data.quantity) {
            quantitytemp = (data.quantity - lot[0].projects.stock);
            data.quantity -= quantitytemp;
        }

        query = {
            "_id": lot[0]._id,
            "projects" : {
                "$elemMatch" : {
                    '_id': new mongoose.Types.ObjectId('648b92d4c48148b419bf0dde')
                }
            }
        };
        updateQuery = {
            '$inc': {
                'projects.$.stock': -data.quantity
            }
        };
    
        const decrement = await LotModel.updateOne(query, updateQuery);

        return true;

    } catch (e) {
        reject(e);
    }
}

module.exports = {
    OutputNew,
    OutputDecrementStock
};