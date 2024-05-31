import Header from "@/components/UI/Header/Header";
import PostCard from "@/components/UI/PostCard/PostCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import './dashboard.css'

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
