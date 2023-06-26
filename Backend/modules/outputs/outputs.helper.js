function GetQueryOutputList (data) {
    let query = {};

    if (data.searchName != '' || data.searchName != undefined) {
        query['folio'] = new RegExp(data.searchName, 'i');
    }

    if (data.folio != '' || data.folio != undefined) {
        query['folio'] = new RegExp(data.folio, 'i');
    }

    return query;
}

module.exports = {
    GetQueryOutputList
};