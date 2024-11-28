# ESPN Cricinfo IPL Web Scraper - 2023 Season
This Node.js web scraper extracts detailed player statistics from the **IPL 2023 season** by scraping match scorecards on **ESPN Cricinfo**. The scraper follows the flow from fetching the "View All Results" URL from the season page, collecting all match scorecard URLs, and then scraping player stats (e.g., runs, balls faced, strike rate) for each player who participated in the match. All scraped data is organized into **Excel files**, with each player's performance across all matches they played.

## Features
* **Fetch IPL 2023 Match Scorecards**: Scrapes the IPL 2023 season page [IPL 2023 Season on ESPN Cricinfo](https://www.espncricinfo.com/series/indian-premier-league-2023-1345038) to extract the **"View All Results"** URL and visits the "View All Results" page to gather links to all match scorecards for the season.
* **Match-Level Scraping**: For each match, scrapes detailed player stats like runs, balls faced, strike rate, and more.
* **Parallel Requests**: Utilizes the `request` package to make parallel HTTP requests for fast scraping.
* **HTML Parsing**: Uses `Cheerio` to parse HTML and extract player statistics from match scorecards.
* **Excel Export**: Saves each player's performance data into individual **Excel** files, using the `xlsx` module.
* **Team Directories and Player Excel Files**: Creates directories for each IPL team (e.g., "Mumbai Indians") within an "ipl" folder using the `fs` module, and stores each player's Excel file in their respective team directory.

## Installation
To run this scraper locally, follow these steps:
1. Clone the repository:     git clone `https://github.com/tyagipriyanshu/Webscraper.git`
2.   Navigate to the project directory:  `   cd ESPN CricInfo WebScraping`
3. Install dependencies:     `npm install`
4. Run the scraper:  `node main.js`
5. The scraper will create an "ipl" directory containing subdirectories for each team, with Excel files for each player's performance data.

## Technologies Used
* **Node.js**: JavaScript runtime to build and run the scraper.
* **request**: For making parallel HTTP requests to fetch match data.
* **Cheerio**: For parsing HTML and extracting player statistics.
* **fs module**: Built-in Node.js module to create directories and save files.
* **xlsx**: To export player data into Excel files.

## Sample Output
* An "ipl" directory containing subdirectories for each team (e.g., "Mumbai Indians", "Delhi Capitals").
* Each team directory contains Excel files for players who played for that team, with their match-level stats (e.g., "Virat Kohli.xlsx").
* Each Excel file will have rows corresponding to the matches in which the player participated, with columns for stats like runs, balls faced, strike rate, etc.

## Future Enhancements
* **Error Handling**: Add robust error handling to manage network issues or missing data.
* **Data Enrichment**: Include more detailed match statistics such as wickets taken, economy rate, and batting order.
* **Web Interface**: Create a front-end interface to display the scraped data interactively.
* **Scheduled Scraping**: Set up automated scraping at regular intervals to update player data as new matches are played.
