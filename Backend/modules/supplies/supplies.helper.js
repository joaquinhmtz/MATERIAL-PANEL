function GetQuerySupplieList (data) {
    let query = {};

    if (data.searchName != '' || data.searchName != undefined) {
        query['$or'] = [{
			'name': new RegExp(data.searchName, 'i')
		}, {
			'description': new RegExp(data.searchName, 'i')
		}];
    }

    if (data.description != undefined || data.searchName != '') {
        query['$or'] = [{
			'name': new RegExp(data.description, 'i')
		}, {
			'description': new RegExp(data.description, 'i')
		}];
    }

    query['active'] = true;

    return query;
}

module.exports = {
    GetQuerySupplieList
};