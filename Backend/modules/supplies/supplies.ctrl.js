const SupplieLib = require('./supplies.lib');

const SupplieNew = async (req, res) => {
    try {
		let data = req.body;
		let save = await SupplieLib.SupplieNew(data);

		if (save) res.status(200).send({ msg: 'OK' });
		else res.status(200).send({ msg: 'NOT_OK' });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }
}

const SupplieList = async (req, res) => {
    try {
		let data = req.body;
		let count = await SupplieLib.SupplieCountList(data);
        let list = await SupplieLib.SupplieList(data);

		if (count && list) res.status(200).send({ count : count, list : list, success : true });
		else res.status(200).send({ msg: 'NOT_OK_SUPPLIE_LIST' });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }
}

const SuppliegetById = async (req, res) => {
    try {
		let data = req.query;
		let supplie = await SupplieLib.SuppliegetById(data._id);

		res.status(200).send({ msg: 'OK', supplie : supplie });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }
}

const SupplieUpdate = async (req, res) => {
    try {
		let data = req.body;
		let upd = await SupplieLib.SupplieUpdate(data);

		if (upd) res.status(200).send({ msg: 'OK' });
		else res.status(200).send({ msg: 'NOT_OK' });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }
}

const SupplieDelete = async (req, res) => {
    try {
		let data = req.body;
		data['active'] = false;
		let upd = await SupplieLib.SupplieUpdate(data);

		if (upd) res.status(200).send({ msg: 'OK' });
		else res.status(200).send({ msg: 'NOT_OK' });
	} catch (e) {
		console.log(e)
        throw new Error(e)
    }

}

module.exports = {
    SupplieNew,
    SupplieList,
	SuppliegetById,
	SupplieUpdate,
	SupplieDelete
};