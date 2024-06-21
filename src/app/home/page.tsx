'use client'
import Header from "@/components/UI/Header/Header";
import PostCard from "@/components/UI/PostCard/PostCard";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import './home.css'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";



interface Post {
  postId: number;
  title: string;
  content: string;
  groupId?: number;
  group: {
    groupName: string;
  };
  picture?: string;
  user: {
    username: string;
  };


};


const HomePage = () => {
  const { data: session } = useSession();

  const [groupPosts, setGroupPosts] = useState<Post[]>([]);
  const [adminPosts, setAdminPosts] = useState<Post[]>([]);


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
        <Header username={session.user.username} />
        <div className="content-page">
          <section className="post-section">
            <h1 className="title-section">Publications</h1>
            <div className="posts-admins">
              <h2 className="title-posts-section">Publications Générales</h2>
              <br />
              <div className="post-list">
                {isLoading ? (
                  <div className="loading-circle">
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                  </svg>
                </div>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : adminPosts.length > 0 ? (
                  adminPosts.map((post: Post) => (
                    <PostCard
                      key={post.postId}
                      title={post.title}
                      content={post.content}
                      author='MyGreenCircle'
                      nbComment={5}
                      picture={post.picture}
                      nbLike={5}
                    />
                  ))
                ) : (
                  <p>No Posts found</p>
                )}
              </div>
            </div>
            <div className="posts-groups">
              <h2 className="title-posts-section">Publications de vos groupes</h2>
              <br />
              <div className="post-list">
                {isLoading ? (
                  <div className="loading-circle">
                  <svg className="spinner" viewBox="0 0 50 50">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                  </svg>
                </div>
                ) : error ? (
                  <p>Error: {error}</p>
                ) : groupPosts.length > 0 ? (
                  groupPosts.map((post: Post) => {
                    return (
                    <PostCard
                      key={post.postId}
                      title={post.title}
                      content={post.content}
                      groupName={post.group.groupName}
                      picture={post.picture}
                      group
                      author={post.user.username}
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
            <h2 className="title-section">Events</h2>
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
