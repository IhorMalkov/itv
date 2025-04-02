'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import Header from '@/components/Header/Header';
import styles from './team.module.css';

interface TeamData {
    teamName: string;
    teamCoach: string;
    teamLogo: string;
    trophyImage: string[];
    teamPlayerName: string[];
    teamPlayerPhoto: string[];
}

export default function TeamPlayers() {
    const params = useParams();
    const team = params?.team;
    const decodedTeam = team ? decodeURIComponent(team as string) : '';

    const [teamData, setTeamData] = useState<TeamData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!decodedTeam) return;

        const fetchTeams = async () => {
            try {
                const storageKey = `team_${decodedTeam}`;
                const cachedData = localStorage.getItem(storageKey);

                if (cachedData) {
                    setTeamData(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }

                const response = await fetch(`/api/scrapeTeamsInfo?team=${decodedTeam}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data.');
                }

                const data: TeamData[] = await response.json();
                setTeamData(data);
                localStorage.setItem(storageKey, JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching team data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [decodedTeam]);

    return (
        <div className={styles.container}>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Header />
                    <div className={styles.content}>
                        {teamData.map((team) => (
                            <div key={team.teamName} className={styles.teamContainer}>
                                <div className={styles.teamHeader}>
                                    <div className={styles.teamLogoContainer}>
                                        <img 
                                            src={team.teamLogo || "/placeholder.svg"} 
                                            alt={`${team.teamName} logo`} 
                                            className={styles.teamLogo} 
                                        />
                                    </div>
                                    <div className={styles.teamInfo}>
                                        <h1 className={styles.teamName}>{team.teamName}</h1>
                                        <div className={styles.teamCoach}>
                                            <span className={styles.label}>Coach:</span> {team.teamCoach || "N/A"}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.playersSection}>
                                    <h2 className={styles.sectionTitle}>Players</h2>
                                    <div className={styles.playersGrid}>
                                        {team.teamPlayerName.length > 0 ? (
                                            team.teamPlayerName.map((playerName, idx) => (
                                                <div key={idx} className={styles.playerCard}>
                                                    <div className={styles.playerImageContainer}>
                                                        <img 
                                                            src={team.teamPlayerPhoto[idx] || "/placeholder.svg"} 
                                                            alt={`${playerName}'s photo`} 
                                                            className={styles.playerImage} 
                                                        />
                                                    </div>
                                                    <div className={styles.playerInfo}>
                                                        <div className={styles.playerName}>{playerName}</div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className={styles.emptyMessage}>No players found</p>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.trophiesSection}>
                                    <h2 className={styles.sectionTitle}>Trophies</h2>
                                    <div className={styles.trophiesContainer}>
                                        {team.trophyImage.length > 0 ? (
                                            team.trophyImage.map((image, idx) => (
                                                <div key={idx} className={styles.trophyItem}>
                                                    <img 
                                                        src={image || "/placeholder.svg"} 
                                                        alt="Team trophy" 
                                                        className={styles.trophyImage} 
                                                    />
                                                </div>
                                            ))
                                        ) : (
                                            <p className={styles.emptyMessage}>No trophies found</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}


