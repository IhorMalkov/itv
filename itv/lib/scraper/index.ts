import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeTeam(url:string) {
    if(!url) return;

    //curl -i --proxy brd.superproxy.io:33335 --proxy-user brd-customer-hl_0f99b238-zone-teamscraper:habuy6j26nsf -k "https://geo.brdtest.com/welcome.txt?product=unlocker&method=native"

    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    
    const port = 22225; 
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
        username: `${username}-session-${session_id}`,
        password: password,
        },
        host: `brd.superproxy.io`,
        port: port,
        rejectUnauthorized: false,
    }

    try{
        //Fetching hltv-result page
        const response = await axios.get(url, options);
        console.log(response.data);
    }catch(error: unknown){
        if (error instanceof Error) {
        throw new Error(`Failed to Scrape team: ${error.message}`);
    }
}

}