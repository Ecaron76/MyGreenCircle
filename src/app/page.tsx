import MainButton from "@/components/UI/MainButton/MainButton";
import Image from "next/image";
import './globals.css'
import ServiceCard from "@/components/HomePage/ServiceCard/ServiceCard";
export default function Home() {
  return (
    <main>
      <div className="titleApp">My GreenCircle</div>
      <MainButton name='Commencer'/>
      <section className="sectionService">
        

        <h2 className="titleSectionService">Tout ce que nous vous proposons chez GreenLink</h2>
        <div className="serviceCardList">
          <ServiceCard title="Groupes" content="Rejoignez un groupe  pour collaborer, échange et agir ensemble pour l'environnement !" image={'/assets/images/iconServiceCard/service-groupe.png'}/>
          <ServiceCard title="Evénements" content="Organise et participe à des événements écologiques" image={'/assets/images/iconServiceCard/service-event.png'}/>
          <ServiceCard title="Posts" content="Exprimez-vous, partagez vos expériences et mobilisez la communauté pour l'écologie !" image={'/assets/images/iconServiceCard/service-post.png'} />
        </div>
        <h2 className="serviceTitle">Interagissez et inspirez via des posts !</h2>
        <h2 className="serviceTitle">Dynamisons nos actions écologiques par des événements !</h2>
        <h2 className="serviceTitle">Les Groupes</h2>
      </section>

    </main>
  );
}
