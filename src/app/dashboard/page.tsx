import Header from "@/components/UI/Header/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    return (
        <main>
          <Header username={session.user.username}/>
          CONNEXION REUSSI / BIENVENUE SUR LE DASHBOARD 
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
