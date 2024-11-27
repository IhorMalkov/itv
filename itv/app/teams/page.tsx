import { scrapeTeam } from "@/lib/scraper";

export async function getServerSideProps(){
  try{
  const rankings = await scrapeTeam();
  return {
    props: {rankings},
  };
  }catch(error){
    console.error(`Failed to scrape`, error);
    return{
      props: {rankings: []},
    };
  }
}

export default function Teams({rankings}) {
  return (
    <div>
      <h1>Complete Ranking</h1>
      {rankings.map((team) => (
          <div>{team.name}</div>
      ))}
      </div>
  );
}
