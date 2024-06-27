'use client'

import MainButton from "@/components/UI/MainButton/MainButton";
import Image from "next/image";
import './globals.css'
import ServiceCard from "@/components/UI/ServiceCard/ServiceCard";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LandingPage() {

  
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
          <Image alt="" src='/assets/images/logo.png' width={200} height={200} className="logo" />
        </div>
      </div>
    
      <p className="baitPhrase">Avec nous , tout le monde bénéficie d&apos;un environnement plus vert.</p>
      <section className="sectionService">
        <h2 className="titleSectionService">Tout ce que nous vous proposons chez GreenLink</h2>
        <div className="serviceCardList">
          <ServiceCard title="Groupes" content="Rejoignez un groupe  pour collaborer, échange et agir ensemble pour l&apos;environnement !" image={'/assets/images/iconServiceCard/service-groupe.png'}/>
          <ServiceCard title="Evénements" content="Organisez et participez à des événements écologiques" image={'/assets/images/iconServiceCard/service-event.png'}/>
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
              <div><Image alt="like" src='/assets/images/iconBtn/like.png' width={35} height={25}/></div>
              <div><Image alt="comment" src='/assets/images/iconBtn/comment.png' width={30} height={25}/></div>
            </div>
          </div>
          <div className="presentationSection">
            <h2 className="serviceTitle">Interagissez et inspirez via des posts !</h2>
            <p> Vous pouvez partager vos idées, susciter l&apos;engagement et créer une communauté active.</p>
            <Link href='/home'><MainButton name='Je partage' /></Link>
          </div>
        </section>
        <section className="sectionServiceEvent">
          <div className="presentationSection">
            <h2 className="serviceTitle">Dynamisons nos actions écologiques par des événements !</h2>
            <p> Vous pouvez organiser ou participer à des actions collectives pour le bien de l&apos;environment.</p>
            <Link href='/home'><MainButton name="J'agis"  /></Link>
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
              <p>Atelier de recyclage, où nous transormerons les déchets collectés en objet utles, sensibiliant ainsi la communauté à l&apos;importance du recyclage.</p>
            </div>
            <div className="eventLocation"><Image alt="" src='/assets/images/location.png' width={18} height={18}/>Rouen, 76000</div>
            <div className="eventButtons">
              <div className="participBtn"> <Image alt="" src='/assets/images/iconBtn/star.png' width={30} height={30}/> Participer </div>
              <div className="horraire">10h00</div>
          </div>
          </div>
          
        </section>
        <section className="sectionServiceGroupe">
          <div className="groupeCard">
            <div className="groupeIllustration">
              <Image alt="" src='/assets/images/groupe.png' width={300} height={200} className="groupeImg" />
            </div>
            <div className="groupeAuthor">
              <div className="authorIcon">
                <Image alt="" src='/assets/images/pp.png' width={70} height={70} className="authorIcon"/>
              </div>
              <div className="authorInfos">
                <h3>EcoNormandie</h3>
                <h4>Juan Pérez</h4>
              </div>
            </div>
            <div className="nbMembres">
              8.9k membres
            </div>
            <div className="groupeBtn">
              Rejoindre
            </div>
          </div>
          <div className="presentationSection">
            <h2 className="serviceTitle">Rejoignez une communauté de citoyens engagés !</h2>
            <p> Rejoignez un groupe  pour collaborer, échange et agir ensemble pour l&apos;environnement !</p>
            <Link href='/home'><MainButton name='Je rejoins' /></Link>
          </div>
        </section>
    </main>
  );
}
