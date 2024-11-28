# ESPN Cricinfo IPL Web Scraper - 2023 Season
This Node.js web scraper extracts detailed player statistics from the **IPL 2023 season** by scraping match scorecards on **ESPN Cricinfo**. The scraper follows the flow from fetching the season page, collecting all match scorecard URLs, and then scraping player stats (e.g., runs, balls faced, strike rate) for each player who participated in the match. All scraped data is organized into **Excel files**, with each player's performance across all matches they played.

## Features
* **Fetch IPL 2023 Match Scorecards**: Scrapes the list of match scorecards from the IPL 2023 season page on ESPN Cricinfo.
* **Match-Level Scraping**: For each match, scrapes detailed player stats like runs, balls faced, strike rate, and more.
* **Parallel Requests**: Utilizes the `request` package to make parallel HTTP requests for fast scraping.
* **HTML Parsing**: Uses `Cheerio` to parse HTML and extract player statistics from match scorecards.
* **Excel Export**: Saves each player's performance data into individual **Excel** files, using the `xlsx` module.
* **Team Organization**: Creates directories for each IPL team within an "ipl" folder using the `fs` module, and stores each player's Excel file in their respective team directory.

## How It Works
1. **Scrape IPL Season Page**: The scraper first fetches the IPL 2023 season URL:
    * IPL 2023 Season on ESPN Cricinfo
2. **Extract Match URLs**: From the season page, it fetches the URLs of all matches played in the season. This is done by extracting the links to individual match scorecards.
3. **Scrape Match Scorecards**: The scraper then visits each match scorecard URL, where it extracts player details for all players who participated in the match. This includes statistics like:
    * Runs scored
    * Balls faced
    * Strike rate
    * Other relevant match stats
4. **Store Data**: For each player, their statistics are saved in an Excel file. If the player has played in multiple matches, their stats are aggregated across all matches.
5. **Player Folders and Excel Files**: The fs module is used to create folders for each player and store the Excel fileswith their stats. Each file contains their performance in each match they played.

## Installation
To run this scraper locally, follow these steps:
1. Clone the repository:     git clone `https://github.com/tyagipriyanshu/Webscraper.git`
2.   Navigate to the project directory:  `   cd Webscraper`
3. Install dependencies:     `npm install`
4. Run the scraper:  `node main.js`
5. The scraper will create a directory for each player and generate Excel files with their performance data.

## Technologies Used
* **Node.js**: JavaScript runtime to build and run the scraper.
* **request**: For making parallel HTTP requests to fetch match data.
* **Cheerio**: For parsing HTML and extracting player statistics.
* **fs module**: Built-in Node.js module to create directories and save files.
* **xlsx**: To export player data into Excel files.

## Sample Output
* A folder for each player containing Excel files with match-level stats (e.g., "Virat Kohli.xlsx").
* Each Excel file will have rows corresponding to the matches in which the player participated, with columns for stats like runs, balls faced, strike rate, etc.

## Future Enhancements
* Error Handling: Add robust error handling to manage network issues or missing data.
* Data Enrichment: Include more detailed match statistics such as wickets taken, economy rate, and batting order.
* Web Interface: Create a front-end interface to display the scraped data interactively.
* Scheduled Scraping: Set up automated scraping at regular intervals to update player data as new matches are played.
