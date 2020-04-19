exports.answerInlineQuery = (BOT_TOKEN, messageId, results) => {
    const fetch = require("node-fetch");
    const telegramPayload = {
        inline_query_id: messageId,
        results: results,
    };
    fetch("https://api.telegram.org/bot" + BOT_TOKEN + "/answerInlineQuery", {
        method: "post",
        body: JSON.stringify(telegramPayload),
        headers: { "Content-Type": "application/json" },
    })
        .then((res) => res.json())
        .then((json) => console.log(json));
};
