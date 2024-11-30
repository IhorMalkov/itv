"use client"
import { useEffect, useState } from "react";

interface TeamData {
  position: string;
  team_name: string;
  points: string;
  logo_url: string;
}

const Teams = () => {
  const [teams, setTeams] = useState<TeamData[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await fetch("/api/scrape");
      const data = await response.json();
      setTeams(data);
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Top 20 Teams</h1>
      <ul>
        {teams.map((team) => (
          <li key={team.position}>
            <p>Position: {team.position}</p>
            <p>Team: {team.team_name}</p>
            <p>Points: {team.points}</p>
            <img src={team.logo_url} alt={`${team.team_name} logo`} width={50} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
