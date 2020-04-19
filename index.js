var express = require("express"),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.json({
        message:
            "Hey there! This app has different paths serving for some Telegram chatbots",
    });
});

var telegramRoutes = require("./api/routes/telegramRoutes");
telegramRoutes(app); //register the telegram route

var soLRoutes = require("./api/routes/solPortalRoutes");
soLRoutes(app); //register the solportal route

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);
console.log("Telegram webhook RESTful API server started on: " + port);
