module.exports = function (app) {
    var telegramCtl = require("../controllers/telegramContoller");
    app.route("/telegram").post(telegramCtl.onUpdateReceived);
};
