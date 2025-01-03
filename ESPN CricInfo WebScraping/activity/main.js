// home page 
const url = "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038";
const fs = require("fs");
const path = require("path");
const request = require("request");
const cheerio = require("cheerio");
const AllMatchObj = require("./Allmatch");

const iplPath = path.join(__dirname, "ipl");
dirCreator(iplPath);

request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractLink(html);
    }
}
function extractLink(html) {
    let $ = cheerio.load(html);
    // let anchorElem = $("a[data-hover='View All Results']");          //old website
    let anchorElem = $("a[title='View All Results']");

    // Attributes can be retrieved with attr() function.
    let link = anchorElem.attr("href");
    console.log(link);

    let fullLink = "https://www.espncricinfo.com" + link;
    console.log(fullLink);
    AllMatchObj.gAllmatches(fullLink);
}

function dirCreator(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }
}