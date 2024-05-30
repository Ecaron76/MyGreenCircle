import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    return (
        <main>
          CONNEXION REUSSI / BIENVENUE SUR LE DASHBOARD {session?.user.username}
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
