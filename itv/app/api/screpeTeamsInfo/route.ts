import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export async function GET(): Promise<string> {
    try {
        console.log("Scraping new data...");
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const url = `{https://www.hltv.org${}`;

        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
        );
        await page.goto(url, { waitUntil: "networkidle2" });


        await browser.close();


        return NextResponse.json();
    } catch (error) {
        console.error("Error scraping:", error);
        return NextResponse.json(
            { error: "Failed to scrapeRanks data." },
            { status: 500 }
        );
    }
}
