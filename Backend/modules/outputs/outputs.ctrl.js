const OutputLib = require('./outputs.lib');

const OutputNew = async (req, res) => {
    try {
		let data = req.body;
        let decrementStock = await OutputLib.OutputDecrementStock(data);
		let save = await OutputLib.OutputNew(data);

		if (save) res.status(200).send({ msg: 'OK' });
		else res.status(200).send({ msg: 'NOT_OK' });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }
}

module.exports = {
    OutputNew
};