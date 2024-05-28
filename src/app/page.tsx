import MainButton from "@/components/UI/MainButton/MainButton";
import Image from "next/image";
import './globals.css'
import ServiceCard from "@/components/HomePage/ServiceCard/ServiceCard";
export default function Home() {
  return (
    <main>
      <div className="titleApp">
        <h1>My GreenCircle</h1>
      </div>
      <MainButton name='Commencer'/>
      <p>Avec nous , tout le monde bénéficie d'un environnement plus vert.</p>
      <section className="sectionService">
        <h2 className="titleSectionService">Tout ce que nous vous proposons chez GreenLink</h2>
        <div className="serviceCardList">
          <ServiceCard title="Groupes" content="Rejoignez un groupe  pour collaborer, échange et agir ensemble pour l'environnement !" image={'/assets/images/iconServiceCard/service-groupe.png'}/>
          <ServiceCard title="Evénements" content="Organise et participe à des événements écologiques" image={'/assets/images/iconServiceCard/service-event.png'}/>
          <ServiceCard title="Posts" content="Exprimez-vous, partagez vos expériences et mobilisez la communauté pour l'écologie !" image={'/assets/images/iconServiceCard/service-post.png'} />
        </div>
        <div className="sectionServicePost">
          <div className="postCard">
            <div className="author">
              <Image alt="" src='/assets/images/pp.png' width={60} height={60} className="pp"/>
              <div>Juan Pérez</div>
            </div>
            <div className="postContent">
              <div className="postTitle">Éco-Tips du Mois !</div>
              <p>Bonjour éco-amis ! Partageons nos astuces pour réduire les déchets. Quelle est votre méthode favorite ? 🌿🌍</p>
            </div>
            <div className="postButtons">
              <div><Image alt="" src='/assets/images/iconBtn/like.png' width={35} height={25}/></div>
              <div><Image alt="" src='/assets/images/iconBtn/comment.png' width={30} height={25}/></div>
            </div>
          </div>
          <div className="presentationPost">
            <h2 className="serviceTitle">Interagissez et inspirez via des posts !</h2>
            <p> Vous pouvez partager vos idées, susciter l'engagement et créer une communauté active.</p>
            <div><MainButton name='Rejoignez-nous'/></div>
          </div>
        </div>
        <h2 className="serviceTitle">Dynamisons nos actions écologiques par des événements !</h2>
        <h2 className="serviceTitle">Les Groupes</h2>
      </section>

    </main>
  );
}
