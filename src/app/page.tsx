import MainButton from "@/components/UI/MainButton/MainButton";
import Image from "next/image";
import './globals.css'
import ServiceCard from "@/components/HomePage/ServiceCard/ServiceCard";
export default function Home() {
  return (
    <main>
      <div className="hero">
        <div className="hero-left">
          <div className="titleApp">
            My GreenCircle
          </div>
          <h1>Rejoignez une communauté dédiée à un monde plus propre et plus sain !</h1>
        </div>
        <div className="hero-right">
          <Image alt="" src='/assets/images/logo.png' width={200} height={200} className="logo"/>
        </div>
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
        
      </section>
      <section className="sectionServicePost">
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
          <div className="presentationSection">
            <h2 className="serviceTitle">Interagissez et inspirez via des posts !</h2>
            <p> Vous pouvez partager vos idées, susciter l'engagement et créer une communauté active.</p>
            <div><MainButton name='Je partage'/></div>
          </div>
        </section>
        <section className="sectionServiceEvent">
          <div className="presentationSection">
            <h2 className="serviceTitle">Dynamisons nos actions écologiques par des événements !</h2>
            <p> Vous pouvez organiser ou participer à des actions collectives pour le bien de l'environment.</p>
            <div><MainButton name="J'agis"/></div>
          </div>
          <div className="eventCard">
            <div className="eventCard-header">
              <div className="eventTitle">Recyclage Rouen</div>
            </div>
            <div className="eventOrganisation">
              <div>Organisé par EcoNormandie</div>
              <div className="eventDate">28/05/2024</div>
              </div>
            <div className="eventIllustration">
              <Image alt="" src='/assets/images/recyclage.jpg' width={200} height={200} className="eventImage"/>
            </div>
            
            <div className="eventContent">
              <p>Atelier de recyclage, où nous transormerons les déchets collectés en objet utles, sensibiliant ainsi la communauté à l'importance du recyclage.</p>
            </div>
            <div className="eventLocation"><Image alt="" src='/assets/images/location.png' width={18} height={18}/>Rouen, 76000</div>
            <div className="eventButtons">
              <div className="participBtn"> <Image alt="" src='/assets/images/iconBtn/star.png' width={30} height={30}/> Participer </div>
              <div className="horraire">10h00</div>
          </div>
          </div>
          
        </section>
        <h2 className="serviceTitle">Les Groupes</h2>
    </main>
  );
}
