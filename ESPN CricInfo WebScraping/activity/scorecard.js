// const url = "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038/chennai-super-kings-vs-gujarat-titans-qualifier-1-1370350/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const xlsx = require("xlsx");

function processScorecard(url) {
    // API
    request(url, cb);
}

// request(url, cb);
function cb(err, response, html) {
    if (err) {
        console.log(err);
    } else {
        // console.log(html);
        extractMatchDetails(html);
    }
}

function extractMatchDetails(html) {
    // ==============================================================
    // ipl ->
    //   team -> 
    //     player -> 
    //         |runs|balls|fours|sixes|sr|opponent|venue|date|result|
    // ==============================================================

    // venue, date, result  -> common for both teams
    // venue, date -> div.ds-grow div.ds-text-tight-m
    // result -> p.ds-text-tight-s.ds-font-medium    
    
    let $ = cheerio.load(html);
    let venueDate = $("div.ds-grow div.ds-text-tight-m");
    let result = $("p.ds-text-tight-s.ds-font-medium");
    // console.log(venueDate.text());
    // console.log(result.text());

    // to fetch date & venue 
    let stringArr = venueDate.text().split(",");         
    let venue = stringArr[1].trim();                  //trim() -> to remove white spaces
    let date = stringArr[2].trim();
    result = result.text();

    let innings = $(".ds-rounded-lg.ds-mt-2 > .ds-w-full.ds-bg-fill-content-prime");
    // let htmlString = "";
    for (let i = 0; i < innings.length; i++) {
        // htmlString = $(innings[i]).html(); 

        // to fetch team & opponent
        let teamName = $(innings[i]).find("span.ds-text-title-xs.ds-font-bold.ds-capitalize").text();
        // teamName = teamName.split("INNINGS")[0].trim();          // older website
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentName = $(innings[opponentIndex]).find("span.ds-text-title-xs.ds-font-bold.ds-capitalize").text();
        // opponentName = opponentName.split("INNINGS")[0].trim();    // older website
        console.log(`${venue} | ${date} | ${teamName} | ${opponentName} | ${result}`);
         
        let cInning = $(innings[i]);
        let allRows = cInning.find("table.ci-scorecard-table tbody tr");
        for (let j = 0; j < allRows.length; j++) {
            // -----logic to check if it is a batsman row in older website------
            // let allCols = $(allRows[j]).find("td");
            // let isWorthy = $(allCols[0]).hasClass("batsman-cell"); 
            // ------------------------------------------------------------------- 
            // ds-w-0 ds-whitespace-nowrap ds-min-w-max ds-flex ds-items-center
            let allCols = $(allRows[j]).find("td");
            let isWorthy = $(allCols[0]).hasClass("ds-whitespace-nowrap");  

            if (isWorthy) {                             // a batsman row
   
                //       Player  runs balls fours sixes sr 
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
                console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
                processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result);
            }
        }
    }
    console.log("`````````````````````````````````````````````````");
    // console.log(htmlString);
}

function processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result) {
    let teamPath = path.join(__dirname, "ipl", teamName);
    // create team directory if not created
    dirCreator(teamPath);

    let filePath = path.join(teamPath, playerName + ".xlsx");
    
    // if file exists -> reads the content
    // if file does not exist -> returns an empty array 
    let content = excelReader(filePath, playerName);

    let playerObj = {
        teamName,                  // same as -> "teamName" : teamName
        playerName,
        runs,
        balls,
        fours,
        sixes,
        sr,
        opponentName,
        venue,
        date,
        result
    };

    content.push(playerObj);

    // excel write
    excelWriter(filePath, content, playerName);
}

function dirCreator(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }
}

function excelWriter(filePath, json, sheetName) {
    // create workbook 
    let newWB = xlsx.utils.book_new();
    // create worksheet
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    // create excel file  
    xlsx.writeFile(newWB, filePath);
}

// json data -> excel format convert
// -> newwb , ws , sheet name
// filePath
// read 
// workbook get

function excelReader(filePath, sheetName) {
    if (fs.existsSync(filePath) == false) {
        return [];
    }
    // player workbook
    let wb = xlsx.readFile(filePath);
    // get data from a particular sheet in that wb
    let excelData = wb.Sheets[sheetName];
    // sheet to json 
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}

module.exports = {
    ps: processScorecard
}