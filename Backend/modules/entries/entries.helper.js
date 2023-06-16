function GetQueryEntrieList (data) {
    let query = {};

    if (data.searchName != '' || data.searchName != undefined) {
        query['folio'] = new RegExp(data.searchName, 'i');
    }

    return query;
}

module.exports = {
    GetQueryEntrieList
};