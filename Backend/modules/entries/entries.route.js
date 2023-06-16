const EntrieCtrl = require('./entries.ctrl');

module.exports = function(app,router){
    router.route('/api/v1/entries/new').post(EntrieCtrl.EntrieNew);
    router.route('/api/v1/entries/list').post(EntrieCtrl.EntrieList);
}