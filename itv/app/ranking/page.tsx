"use client";
import Header from "@/components/Header/Header";
import Loader from "@/components/Loader/Loader";
import RankingCard from "@/components/RankingCard/RankingCard";
import RankingData from "@/app/ranking/RankingData";
import Link from 'next/link'
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function RankingPage() {
  const [teams, setTeams] = useState<RankingData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const cachedData = localStorage.getItem("ranking");
        if (cachedData) {
          setTeams(JSON.parse(cachedData));
          setLoading(false);
          return;
        }

        const response = await fetch("/api/scrapeRanks");
        if (!response.ok) {
          throw new Error("Failed to fetch team data.");
        }
        const data = await response.json();
        setTeams(data);
        localStorage.setItem("ranking", JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching team data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header />
            <h1 className={styles.title}>Team Rankings</h1>
            <ul className={styles.list}>
              {teams.map((team) => (
                <li key={team.name}>
                  {" "}
                  <Link href={`/teams/${encodeURIComponent(team.teamLink)}`} legacyBehavior>
                    <a className={styles.teamLink}>
                      <RankingCard
                          position={team.ranking}
                          name={team.name}
                          points={team.points}
                          logo={team.logoUrl}
                      />
                    </a>
                  </Link>
                </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
