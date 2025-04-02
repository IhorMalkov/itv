    import { NextResponse } from "next/server";
    import puppeteer from "puppeteer-extra";
    import StealthPlugin from "puppeteer-extra-plugin-stealth";
    import { insertTeamsData } from "@/lib/database";

    puppeteer.use(StealthPlugin());

    export async function GET(req) {
        try {

            const { searchParams } = new URL(req.url);
            const team = searchParams.get('team');
            console.log(`Received team: ${team}`);
            if (!team) {
                return NextResponse.json(
                    { error: "Team parameter is missing" },
                    { status: 400 }
                );
            }

            console.log(`Scraping new data for team: ${team}`);

            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            const url = `https://www.hltv.org${team}`;

            await page.setUserAgent(
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
            );
            await page.goto(url, { waitUntil: "networkidle2" });

            const teamLogos = await page.$$eval(".teamlogo", (images) =>
                images
                    .filter((img) => !img.classList.contains("day-only"))
                    .map((img) => {
                        const src = img.getAttribute("src");
                        return src.startsWith("http") ? src : `https://www.hltv.org${src}`;
                    })
            );

            const teamName = await page.$eval('.profile-team-name', (name) => name.textContent);

            const teamPlayersNames = await page.$$eval(".text-ellipsis.bold", (players) =>
            players.slice(0,5).map((player) => player.textContent?.trim() || ""));

            const teamPlayerPhotos = await page.$$eval('.bodyshot-team-img', (images) =>
                images.map((img) => {
                    const src = img.getAttribute("src");
                    return src.startsWith("http") ? src : `https://www.hltv.org${src}`;
                })
            );

            const teamCoach = await page.$eval('.bold.a-default', (coach) => coach.textContent);

            const trophyImages = await page.$$eval(".trophyIcon", (images) =>
                images.map((img) => {
                    const src = img.getAttribute("src");
                    return src.startsWith("http") ? src : `https://www.hltv.org${src}`;
                })
            );;

            const teamData = [{
                teamLogo: teamLogos,
                teamName: teamName,
                teamPlayerPhoto: teamPlayerPhotos,
                teamPlayerName: teamPlayersNames,
                teamCoach: teamCoach,
                trophyImage: trophyImages
            }];

            await browser.close();

            await insertTeamsData(teamData, "teamInfo");

            return NextResponse.json(teamData);
        } catch (error) {
            console.error("Error scraping:", error);
            return NextResponse.json(
                { error: "Failed to scrape team data." },
                { status: 500 }
            );
        }
    }
