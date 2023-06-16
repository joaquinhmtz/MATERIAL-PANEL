const EntrieLib = require('./entries.lib');

const EntrieNew = async (req, res) => {
    try {
		let data = req.body;
        let addStock = await EntrieLib.EntrieAddStock(data);
		let save = await EntrieLib.EntrieNew(data);

		if (save) res.status(200).send({ msg: 'OK' });
		else res.status(200).send({ msg: 'NOT_OK' });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }
}

const EntrieList = async (req, res) => {
    try {
		let data = req.body;
		let count = await EntrieLib.EntrieCountList(data);
        let list = await EntrieLib.EntrieList(data);

		if (count && list) res.status(200).send({ count : count, list : list, success : true });
		else res.status(200).send({ msg: 'NOT_OK_ENTRIE_LIST' });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }
}

module.exports = {
    EntrieNew,
    EntrieList
};