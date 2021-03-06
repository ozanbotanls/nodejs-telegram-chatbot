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
                const authorToIndex = newsItem.contentSnippet.indexOf("\n");
                const author = newsItem.contentSnippet.substring(0, authorToIndex - 1);
                news.push({
                    id: newsItem.guid,
                    title: newsItem.title,
                    time: newsItem.pubDate.time[0].$.datetime.substring(0, 10),
                    time2: newsItem.pubDate.time[0].$.datetime.substr(11,5),
                    pubDate: newsItem.pubDate.time[0]._,
                    //content: newsItem.content,
                    contentSnippet: newsItem.contentSnippet,
                    image: img,
                    link: link,
                    author: author,
                    type: "news"
                });
            }
        }
        if (err) {
            console.error("Error occurred: " + err);
        }
        res.json({ success: true, data: news });
    });
}; 

exports.parseSolYazarlarToJSON = (res) => {
    var Parser = require("rss-parser");
    const news = [];
    new Parser().parseURL("https://sol.org.tr/rss-yazar.xml", (err, feed) => {
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
                const authorToIndex = newsItem.contentSnippet.indexOf("\n");
                const author = newsItem.contentSnippet.substring(0, authorToIndex - 1);
                news.push({
                    id: newsItem.guid,
                    title: newsItem.title,
                    pubDate: newsItem.pubDate.time[0]._,
                    //content: newsItem.content,
                    contentSnippet: newsItem.contentSnippet,
                    image: img,
                    link: link,
                    author: author,
                    type: "article"
                });
            }
        }
        if (err) {
            console.error("Error occurred: " + err);
        }
        res.json({ success: true, data: news });
    });
};
