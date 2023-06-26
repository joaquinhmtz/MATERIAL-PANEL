const OutputCtrl = require('./outputs.ctrl');

module.exports = function(app,router){
    router.route('/api/v1/outputs/new').post(OutputCtrl.OutputNew);
    router.route('/api/v1/outputs/list').post(OutputCtrl.OutputList);
}