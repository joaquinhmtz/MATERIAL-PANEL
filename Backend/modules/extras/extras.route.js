const ExtraCtrl = require('./extras.ctrl');

module.exports = function(app,router){
    router.route('/api/v1/extras/list/supplies-stock').post(ExtraCtrl.SupplieListStock);
}