exports.onUpdateReceived = function (req, res) {
    // handle incoming Telegram payload here.
    console.log(req.body);
    res.json({ status: "ok" });
};

exports.onGetRequest = function (req, res) {
    res.json({ status: "ok", message: "hello there!" });
};
