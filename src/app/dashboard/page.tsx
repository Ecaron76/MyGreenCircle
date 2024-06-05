import Header from "@/components/UI/Header/Header";
import PostCard from "@/components/UI/PostCard/PostCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import './dashboard.css'
import GroupCard from "@/components/UI/GroupCard/GroupCard";
import EventCard from "@/components/UI/EventCard/EventCard";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    return (
        <main>
          <Header username={session.user.username}/>
          <div>
            <h2>Publications</h2>
            <br></br>
            <div className="post-list">
              <PostCard title='Éco-Tips du Mois !' nbComment={50} nbLike={100} author="Ecaron" content="Bonjour éco-amis ! Partageons nos astuces pour réduire les déchets. Quelle est votre méthode favorite ? 🌿🌍"/>
              <PostCard title='Éco-Tips du Mois !' nbComment={50} nbLike={100} author="Ecaron" content="Bonjour éco-amis ! Partageons nos astuces pour réduire les déchets. Quelle est votre méthode favorite ? 🌿🌍"/>
              <PostCard title='Éco-Tips du Mois !' nbComment={50} nbLike={100} author="Ecaron" content="Bonjour éco-amis ! Partageons nos astuces pour réduire les déchets. Quelle est votre méthode favorite ? 🌿🌍"/>
            </div>
          </div>
          <div>
            <h2>Groupes</h2>
            <br></br>
            <div className="group-list">
              <GroupCard title="EcoNormandie" description="Nous agissons pour la normandie" author="Ecaron" nbMember='5.2 K'/>
              <GroupCard title="EcoNormandie" description="Nous agissons pour la normandie" author="Ecaron" nbMember='5.2 K' />
              <GroupCard title="EcoNormandie" description="Nous agissons pour la normandie" author="Ecaron" nbMember='5.2 K' />
            </div>
          </div>
          <div>
            <h2>Events</h2>
            <br></br>
            <div className="event-list">
              <EventCard author="EcoNormandie" title="Recyclons Ensemble !" date="03/06/2024" description="Atelier de recyclage, où nous transormerons les déchets collectés en objet utles, sensibiliant ainsi la communauté à l&apos;importance du recyclage." location="Rouen, 76000" hourly="10h00"/>
              <EventCard author="EcoNormandie" title="Recyclons Ensemble !" date="03/06/2024" description="Atelier de recyclage, où nous transormerons les déchets collectés en objet utles, sensibiliant ainsi la communauté à l&apos;importance du recyclage." location="Rouen, 76000" hourly="10h00"/>
              <EventCard author="EcoNormandie" title="Recyclons Ensemble !" date="03/06/2024" description="Atelier de recyclage, où nous transormerons les déchets collectés en objet utles, sensibiliant ainsi la communauté à l&apos;importance du recyclage." location="Rouen, 76000" hourly="10h00"/>
            </div>
          </div>
          
        </main>
      );    
  } 
  else {
    return (
        <main>
            Vous devez être connecté pour voir cette page.
        </main>
    )
    }
}

export default DashboardPage
