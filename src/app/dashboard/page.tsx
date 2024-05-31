import Header from "@/components/UI/Header/Header";
import PostCard from "@/components/UI/PostCard/PostCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import './dashboard.css'
import GroupCard from "@/components/UI/GroupCard/GroupCard";

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
              <GroupCard title="EcoNormandie" description="Nous agissons pour la normandie" author="Ecaron" nbMember='5.2 K' btn={true}/>
              <GroupCard title="EcoNormandie" description="Nous agissons pour la normandie" author="Ecaron" nbMember='5.2 K' btn={true}/>
              <GroupCard title="EcoNormandie" description="Nous agissons pour la normandie" author="Ecaron" nbMember='5.2 K' btn={true}/>
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
