import MainButton from "@/components/UI/MainButton/MainButton";
import Image from "next/image";
import './globals.css'
import ServiceCard from "@/components/HomePage/ServiceCard/ServiceCard";
export default function Home() {
  return (
    <main>
      <div className="titleApp">My GreenCircle</div>
      <MainButton name='Commencer'/>

      <ServiceCard title="Groupes" content="Rejoignez un groupe  pour collaborer, échange et agir ensemble pour l'environnement !"/>
      <ServiceCard title="Evénements" content="Organise et participe à des événements écologiques"/>
      <ServiceCard title="Posts" content="Exprimez-vous, partagez vos expériences et mobilisez la communauté pour l'écologie !"/>

      <h2>Tout ce que nous vous proposons chez GreenLink Tout ce que nous vous proposons chez GreenLink</h2>
      <h2>Interagissez et inspirez via des posts !</h2>
      <h2>Dynamisons nos actions écologiques par des événements !</h2>
      <h2>Les Groupes</h2>


    </main>
  );
}
