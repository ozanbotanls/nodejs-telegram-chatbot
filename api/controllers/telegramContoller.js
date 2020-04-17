exports.onUpdateReceived = function (req, res) {
    const fetch = require("node-fetch");
    const Spotify = require("node-spotify-api");
    const BOT_TOKEN = process.env.BOT_TOKEN;
    if (req.body.inline_query) {
        let messageId = req.body.inline_query.id;
        let query = req.body.inline_query.query;
        let userName = req.body.inline_query.from.username;
        console.log("query => " + query);
        console.log("userName => " + userName);
        var spotify = new Spotify({
            id: process.env.SPOTIFY_APP_ID,
            secret: process.env.SPOTIFY_APP_SECRET,
        });
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
                    const telegramPayload = {
                        inline_query_id: messageId,
                        results: results,
                    };
                    fetch(
                        "https://api.telegram.org/bot" +
                            BOT_TOKEN +
                            "/answerInlineQuery",
                        {
                            method: "post",
                            body: JSON.stringify(telegramPayload),
                            headers: { "Content-Type": "application/json" },
                        }
                    )
                        .then((res) => res.json())
                        .then((json) => console.log(json));
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
