'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader/Loader";
import Header from "@/components/Header/Header";
import Team from "@/components/TeamCard/Team";

export default function TeamPlayers() {
    const {team} = useParams();
    const decodedTeam = decodeURIComponent(team as string);

    const [teamData, setTeamData] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const storageKey = `team_${decodedTeam}`;
                const cachedData = localStorage.getItem(storageKey);
                if (cachedData) {
                    setTeamData(JSON.parse(cachedData));
                    setLoading(false);
                    return;
                }
                const response = await fetch(`/api/scrapeTeamsInfo?team=${(decodedTeam)}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data.");
                }
                const data = await response.json();
                setTeamData(data);
                localStorage.setItem(storageKey, JSON.stringify(data));
            } catch (error) {
                console.error("Error fetching team data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTeams();
    }, [decodedTeam]);

    console.log(decodedTeam);

    return (
        <div>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    <Header/>
                    {teamData.map((team) => (
                        <div key={team.teamName}>
                            <h1>{team.teamName}</h1>
                            {team.teamCoach}
                            <img src={(team.teamLogo)} alt={`${team.teamName} logo`}/>
                            <ul>
                                {team.trophyImage.map((image, idx) => {
                                    return (
                                        <li key={idx}>
                                            <img src={image} alt="team trophies"/>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
