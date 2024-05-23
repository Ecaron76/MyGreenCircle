import MainButton from "@/components/UI/MainButton/MainButton";
import Image from "next/image";
import './globals.css'
export default function Home() {
  return (
    <main>
      <div className="titleApp">My GreenCircle</div>
      <MainButton name='Commencer'/>
      
    </main>
  );
}
