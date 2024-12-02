import Link from "next/link";
import './global.css'
import Header from "@/components/Header/Header";

export default function Home(){
  return(
    <div>
      <Header/>
    <Link href='/teams'>See Ranking</Link>
    </div>
  )
}
