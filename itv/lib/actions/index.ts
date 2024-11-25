"use server"

import { scrapeTeam } from "../scraper/indetx";

export async function scrapeAndStoreTeams(url:string) {
    if(!url) return

    try{
        const scrapedTeam = await scrapeTeam(url);
    }catch(error: unknown){
        if (error instanceof Error) {
            throw new Error(`Unable to access or store data: ${error.message}`);
        } else {
            throw new Error("An unknown error occurred while processing the data.");
        }  
    }
    
}