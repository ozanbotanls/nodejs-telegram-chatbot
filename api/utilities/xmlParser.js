exports.parseSolToJSON = (res) => {
    var Parser = require("rss-parser");
    const news = [];
    new Parser().parseURL("https://sol.org.tr/rss.xml", (err, feed) => {
        if (feed.items) {
            for (let i = 0; i < feed.items.length; i++) {
                const newsItem = feed.items[i];
                let fromLink = newsItem.content.indexOf('<a href="');
                let toLink = newsItem.content.indexOf("hreflang");
                const link = newsItem.content.substring(
                    fromLink + 9,
                    toLink - 2
                );
                let fromImg = newsItem.content.indexOf('<img src="', toLink);
                let toImg = newsItem.content.indexOf("?itok", toLink);
                const img = newsItem.content.substring(fromImg + 10, toImg);
                news.push({
                    id: newsItem.guid,
                    title: newsItem.title,
                    time: newsItem.pubDate.time[0].$.datetime.substring(0, 10),
                    content: newsItem.content,
                    image: img,
                    link: link,
                });
            }
        }
        if (err) {
            console.error("Error occurred: " + err);
        }
        res.json({ success: true, data: news });
    });
};
