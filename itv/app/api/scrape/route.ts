"use server"
import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export async function GET() {
  try {
    const browser = await puppeteer.launch({ headless: true }); 
    const page = await browser.newPage();
    const url = "https://www.hltv.org/ranking/teams/2024/november/25";

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2" });

    try {
      const [acceptButton] = await page.$x("//button[text()='Allow all Cookies']");
      if (acceptButton) {
        await acceptButton.click();
      }
    } catch (error) {
      console.log("No cookie banner found or already accepted.");
    }

    const positions = await page.$$eval(".position", (elements) =>
      elements.slice(0, 20).map((el) => el.textContent?.trim())
    );
    const teamLogos = await page.$$eval(".team-logo img", (images) =>
      images.slice(0, 20).map((img) => img.getAttribute("src"))
    );
    const names = await page.$$eval(".name", (elements) =>
      elements.slice(0, 20).map((el) => el.textContent?.trim())
    );
    const points = await page.$$eval(".points", (elements) =>
      elements.slice(0, 20).map((el) => el.textContent?.trim())
    );

    const teamsData = positions.map((position, index) => ({
      position,
      team_name: names[index],
      points: points[index],
      logo_url: teamLogos[index],
    }));

    await browser.close();

    return NextResponse.json(teamsData); 
  } catch (error) {
    console.error("Error scraping:", error);
    return NextResponse.json({ error: "Failed to scrape data." }, { status: 500 });
  }
}
