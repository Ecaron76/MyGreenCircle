'use client'
import Header from "@/components/UI/Header/Header";
import PostCard from "@/components/UI/PostCard/PostCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import './home.css'
import GroupCard from "@/components/UI/GroupCard/GroupCard";
import EventCard from "@/components/UI/EventCard/EventCard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";



interface Post {
  postId: number;
  title: string;
  content: string;

};

const HomePage =  () => {
  const { data: session } = useSession();

    const [allPosts, setAllPosts] = useState<Post[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchAllPost = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(`/api/post/`);
          if (!response.ok) throw new Error('Failed to fetch group details');

          const dataPosts = await response.json();
          setAllPosts(dataPosts);
      } catch (error) {

      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
    fetchAllPost()
  }, []);

  if (session?.user) {
    return (
        <main>
          <Header username={session.user.username}/>
          <div>
            <h2>Publications</h2>
            <br></br>
            <div className="post-list">
            {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : allPosts.length > 0 ? (
                        allPosts.map((post: Post) => (
                            <PostCard
                                key={post.postId}
                                title={post.title}
                                content={post.content}
                                author={'author'}
                                nbComment={5}
                                nbLike={5}
                            />
                        ))
                    ) : (
                        <p>No Posts found</p>
                    )}
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

export default HomePage
