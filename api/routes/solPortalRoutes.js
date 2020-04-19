module.exports = function (app) {
    var soLCtrl = require("../controllers/solPortalContoller");
    app.route("/solportalbot")
        .get(soLCtrl.onGetRequest)
        .post(soLCtrl.onUpdateReceived);
};
