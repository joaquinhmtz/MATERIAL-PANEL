const SupplieCtrl = require('./supplies.ctrl');

module.exports = function(app,router){
    router.route('/api/v1/supplies/new').post(SupplieCtrl.SupplieNew);
    router.route('/api/v1/supplies/list').post(SupplieCtrl.SupplieList);
}