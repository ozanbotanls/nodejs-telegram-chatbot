var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var telegramRoutes = require("./api/routes/telegramRoutes"); //importing route
telegramRoutes(app); //register the route

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);
console.log("Telegram webhook RESTful API server started on: " + port);
