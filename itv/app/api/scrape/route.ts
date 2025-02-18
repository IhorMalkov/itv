import { NextResponse } from "next/server";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { insertTeamsData } from "@/lib/database";

puppeteer.use(StealthPlugin());

export async function GET() {
  try {
    console.log("Scraping new data...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = "https://www.hltv.org/ranking/teams/2025/february/10";

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
    );
    await page.goto(url, { waitUntil: "networkidle2" });

    const positions = await page.$$eval(".position", (elements) =>
      elements.slice(0, 20).map((el) => el.textContent?.trim())
    );
    const teamLogos = await page.$$eval(".team-logo img", (images) =>
      images
        .filter((img) => !img.classList.contains("day-only"))
        .slice(0, 20)
        .map((img) => img.getAttribute("src"))
    );
    const names = await page.$$eval(".name", (elements) =>
      elements.slice(0, 20).map((el) => el.textContent?.trim())
    );
    const points = await page.$$eval(".points", (elements) =>
      elements.slice(0, 20).map((el) => el.textContent?.trim())
    );

    const teamLinks = await page.$$eval(".moreLink", (elements) =>
    elements.slice(0, 20).map((el) => el.textContent?.trim())
    );

    const teamsData = positions.map((ranking, index) => ({
      ranking: ranking,
      name: names[index],
      points: points[index],
      logoUrl: teamLogos[index],
      teamLinks: teamLinks[index],
    }));

    await browser.close();

    await insertTeamsData(teamsData);

    return NextResponse.json(teamsData);
  } catch (error) {
    console.error("Error scraping:", error);
    return NextResponse.json(
      { error: "Failed to scrape data." },
      { status: 500 }
    );
  }
}
