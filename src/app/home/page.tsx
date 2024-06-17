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
  groupId?: number;
  groupName: string;


};


const HomePage = () => {
  const { data: session } = useSession();

  const [groupPosts, setGroupPosts] = useState<Post[]>([]);
  const [adminPosts, setAdminPosts] = useState<Post[]>([]);
  const [groupAuthors, setGroupAuthors] = useState<string[]>([]);


  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAllPost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/post/`);
      if (!response.ok) throw new Error('Failed to fetch group details');

      const dataPosts: Post[] = await response.json();
      const groupPosts = dataPosts.filter(post => post.groupId !== null);
      const adminPosts = dataPosts.filter(post => post.groupId === null);

      setGroupPosts(groupPosts);
      setAdminPosts(adminPosts);

      const groupAuthorsPromises = groupPosts.map(post => fetchGroupDetails(post.groupId!).then(groupName => ({ ...post, groupName })));
      const postsWithGroupNames = await Promise.all(groupAuthorsPromises);
      setGroupPosts(postsWithGroupNames);
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  const fetchGroupDetails = async (groupId: number) => {
    try {
        const response = await fetch(`/api/groupe/${groupId}`);
        if (!response.ok) throw new Error('Failed to fetch group details');

        const groupDetails = await response.json();
        return groupDetails.groupName;
    } catch (error) {
        console.error('Error fetching group details:', error);
        return ''; 
    }
};

  useEffect(() => {
    fetchAllPost()
  }, []);

  if (session?.user) {
    return (
      <main>
        <Header username={session.user.username} />
        <div className="content-page">
          <section className="post-section">
            <h1 className="title-section">Publications</h1>
            <div className="posts-admins">
              <h2>Publications Générales</h2>
              <br />
              <div className="post-list">
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : adminPosts.length > 0 ? (
                  adminPosts.map((post: Post) => (
                    <PostCard
                      key={post.postId}
                      title={post.title}
                      content={post.content}
                      author='author'
                      nbComment={5}
                      nbLike={5}
                    />
                  ))
                ) : (
                  <p>No Posts found</p>
                )}
              </div>
            </div>
            <div className="posts-groups">
              <h2>Publications de vos groupes</h2>
              <br />
              <div className="post-list">
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : groupPosts.length > 0 ? (
                  groupPosts.map((post: Post, index: number) => {
                    return (
                    <PostCard
                      key={post.postId}
                      title={post.title}
                      content={post.content}
                      groupName={post.groupName}
                      author=""
                      nbComment={5}
                      nbLike={5}
                    />
                    )}
                  )
                ) : (
                  <p>No Posts found</p>
                )}
              </div>
            </div>

          </section>

          <div>
            <h2>Events</h2>
            <br></br>
            <div className="event-list">
            </div>
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
