'use client'
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";

export default function TeamPlayers(){
    const {team} = useParams();
    const decodedTeam = decodeURIComponent(team as string);

  /*  const [teamData, setTeamData] = useState([]);
    useEffect(() => {
        const fetchTeams = async () => {
            const response = await fetch("/api/scrapeTeamsInfo");
        }
    },[])
  */

    console.log(decodedTeam);
    return (
        <div>
            Team Players Page
        </div>
    )
}