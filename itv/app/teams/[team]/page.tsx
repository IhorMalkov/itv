'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import Loader from "@/components/Loader/Loader";
import Header from "@/components/Header/Header";
import TeamData from "@/app/teams/[team]/TeamData";

export default function TeamPlayers() {
    const {team} = useParams();
    const decodedTeam = decodeURIComponent(team as string);

    const [teamData, setTeamData] = useState<TeamData[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch(`/api/scrapeTeamsInfo?team=${(decodedTeam)}`);
            if (!response.ok) {
                throw new Error("Failed to fetch data.");
            }
            const data = await response.json();
            setTeamData(data)
            setLoading(false);
        }
        fetchTeams();
    },[])

    console.log(decodedTeam);
    return (
        <div>
            { loading ? (
                <Loader/>
            ):(
                <>
                <Header />
                    {teamData.map((team, index) => (
                        <img key={index} src={team.teamLogo} alt="Team Logo" />
                    ))}
                </>
            )
            }
        </div>
    )
}