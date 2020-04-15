module.exports = function (app) {
    var telegramCtl = require("../controllers/telegramContoller");
    app.route("/telegram")
        .get(telegramCtl.onGetRequest)
        .post(telegramCtl.onUpdateReceived);
};
