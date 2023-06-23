const ExtraLib = require('./extras.lib');

const SupplieListStock = async (req, res) => {
    try {
		let data = req.body;
		let supplieListStock = await ExtraLib.SupplieListStock(data);

		if (supplieListStock) res.status(200).send({ msg: 'OK', list : supplieListStock });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }
}

module.exports = {
    SupplieListStock
};