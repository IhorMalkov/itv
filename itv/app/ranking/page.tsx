"use client";
import Header from "@/components/Header/Header";
import Loader from "@/components/Loader/Loader";
import TeamCard from "@/components/TeamCard/TeamCard";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface TeamData {
  id: string;
  ranking: string;
  name: string;
  points: string;
  logoUrl: string;
}

export default function RankingPage() {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("/api/scrape");
        if (!response.ok) {
          throw new Error("Failed to fetch team data.");
        }
        const data = await response.json();
        setTeams(data);
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
                <li key={team.id}>
                  {" "}
                  <TeamCard
                    position={team.ranking}
                    name={team.name}
                    points={team.points}
                    logo={team.logoUrl}
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </main>
  );
}
