import Header from "@/components/UI/Header/Header";
import PostCard from "@/components/UI/PostCard/PostCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import './groupes.css'
import GroupCard from "@/components/UI/GroupCard/GroupCard";
import EventCard from "@/components/UI/EventCard/EventCard";

const GroupsPage = async () => {
    const session = await getServerSession(authOptions)

    if (session?.user) {

        return (
            <main>
                <Header username={session.user.username} />
                <div className="search-container">
                    <input type="text" placeholder="Rechercher dans les groupes" />
                    <button>
                        <img src="https://img.icons8.com/material-outlined/24/000000/search.png" alt="Search Icon" />
                    </button>
                </div>
                
                <section className="mygroups-section">
                    <h2>Vos Groupes</h2>
                    <div className="mygroups-list">
                        <GroupCard author="Ecaron" title="EcoNormandie" btn nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" btn nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" btn nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" btn nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" btn nbMember="5,2K"/>
                        <GroupCard author="Ecaron" title="EcoNormandie" btn nbMember="5,2K"/>
                    </div>
                </section>

            </main>
        );
    }
}




export default GroupsPage
