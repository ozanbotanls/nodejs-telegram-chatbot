exports.onUpdateReceived = function (req, res) {
    // handle incoming Telegram payload here.
    console.log(req.body);
    //res.json({ status: "ok" });
    res.json(req.body);
};

exports.onGetRequest = function (req, res) {
    res.json({ status: "ok", message: "hello there!" });
};
