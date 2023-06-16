const CounterModel      = require('./../../modules/extras/models/counters.model');

function CreateFolio (params) {
    return new Promise(async (resolve, reject) => {
        try {
            let type = params.type;
            let counter = await CounterModel.findOne({ type : type });
            let counterEnd = '';
            let folioDate = new Date().getFullYear() + ("0" + (new Date().getMonth() + 1)).slice(-2) + ("0" + new Date().getDate()).slice(-2);

            if (counter.counter <= 9) counterEnd = '000' + counter.counter.toString();
            else if (counter.counter >= 10 && counter.counter <= 99) counterEnd = '00' + counter.counter.toString();
            else if (counter.counter >= 100 && counter.counter <= 999) counterEnd = '0' + counter.counter.toString();
            else if (counter.counter >= 1000) counterEnd = counter.counter.toString();
            let folioTemp = params.prefix + '-' + folioDate + counterEnd;
            let folio = counter.counter++;

            let counterUpd = await CounterModel.updateOne({ _id : counter._id }, { $set : { 'lastFolio' : folioTemp }, $inc: { counter: 1 } });
            
            resolve(folioTemp);
        } catch (e) {
			reject(e);
		}
    });
}

function createObjectId(_id) {
    const mongoose = require('mongoose');
    return mongoose.Types.ObjectId(_id);
}

module.exports = {
    CreateFolio,
    createObjectId
};