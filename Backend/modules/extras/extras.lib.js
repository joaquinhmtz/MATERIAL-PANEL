const LotModel      = require('./models/lots.model');
const UtilHelper    = require('./../../utils/scripts/utils-global');

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

module.exports = {
    CreateLot
};