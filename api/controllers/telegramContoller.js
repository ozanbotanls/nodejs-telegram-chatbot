exports.onUpdateReceived = function (req, res) {
    if (req.body.inline_query) {
        let messageId = req.body.inline_query.id;
        let query = req.body.inline_query.query;
        let firstName = req.body.inline_query.from.first_name;
        console.log("firstName => " + firstName);
        if (query != "") {
            res.json({ status: "ok" });
            return;
        }

        const Spotify = require("node-spotify-api");
        var spotify = new Spotify({
            id: process.env.SPOTIFY_APP_ID,
            secret: process.env.SPOTIFY_APP_SECRET,
        });

        const BOT_TOKEN = process.env.BOT_TOKEN_TKP;
        const results = [];

        spotify
            .request(
                "https://api.spotify.com/v1/shows/3umkGQAmujYDEwA8EXCypL/episodes?market=TR"
            )
            .then(function (data) {
                if (data.items) {
                    const sortedEpisodes = data.items.sort(
                        (a, b) => b.release_date - a.release_date
                    );
                    sortedEpisodes.forEach((episode) => {
                        results.push({
                            type: "article",
                            id: episode.id,
                            title: episode.name,
                            input_message_content: {
                                message_text: episode.external_urls.spotify,
                                parse_mode: "Markdown",
                            },
                            description: episode.description,
                            thumb_url: episode.images[2].url,
                            thumb_width: episode.images[2].width,
                            thumb_height: episode.images[2].height,
                        });
                    });
                    telegramUtility = require("../utilities/telegramUtility");
                    // send out the results as queryResult format.
                    telegramUtility.answerInlineQuery(
                        BOT_TOKEN,
                        messageId,
                        results
                    );
                }
            })
            .catch(function (err) {
                console.error("Error occurred: " + err);
            });
    }
    res.json({ status: "ok" });
};

exports.onGetRequest = function (req, res) {
    res.json({
        status: "ok",
        message: "hey there! This path is functional for POST request only",
    });
};
