function GetQuerySupplieList (data) {
    let query = {};

    if (data.searchName != '' || data.searchName != undefined) {
        query['$or'] = [{
			'name': new RegExp(data.searchName, 'i')
		}, {
			'description': new RegExp(data.searchName, 'i')
		}];
    }

    return query;
}

module.exports = {
    GetQuerySupplieList
};