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

        const BOT_TOKEN = process.env.BOT_TOKEN_SOL_PORTAL;
        const results = [];

        var Parser = require("rss-parser");
        new Parser().parseURL("https://sol.org.tr/rss.xml", (err, feed) => {
            if (feed.items) {
                for (let i = 0; i < 25; i++) {
                    const newsItem = feed.items[i];
                    let fromLink = newsItem.content.indexOf('<a href="');
                    let toLink = newsItem.content.indexOf("hreflang");
                    const link = newsItem.content.substring(
                        fromLink + 9,
                        toLink - 2
                    );
                    // let fromImg = newsItem.content.indexOf(
                    //     '<img src="',
                    //     toLink
                    // );
                    // let toImg = newsItem.content.indexOf("?itok", toLink);
                    // const img = newsItem.content.substring(fromImg + 9, toImg);

                    results.push({
                        type: "article",
                        id: i + "_soL",
                        title: newsItem.title,
                        input_message_content: {
                            message_text: link,
                            parse_mode: "Markdown",
                        },
                        description: newsItem.contentSnippet.substr(0, 50),
                        thumb_url:
                            "http://haber.sol.org.tr/sites/default/files/styles/newsimagestyle_615x410/public/4wjak9m6.jpg",
                        thumb_width: 70,
                        thumb_height: 70,
                    });
                }
                telegramUtility = require("../utilities/telegramUtility");
                // send out the results as queryResult format.
                telegramUtility.answerInlineQuery(
                    BOT_TOKEN,
                    messageId,
                    results
                );
            }
            if (err) {
                console.error("Error occurred: " + err);
            }
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
