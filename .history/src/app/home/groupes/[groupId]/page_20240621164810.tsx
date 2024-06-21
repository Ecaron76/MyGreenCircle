'use client';

import Header from "@/components/UI/Header/Header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import './SingleGroupePage.css';
import { useRouter } from "next/navigation";
import PostCard from "@/components/UI/PostCard/PostCard";
import MainButton from "@/components/UI/MainButton/MainButton";
import Link from "next/link";
import CreateEventModal from "@/components/GroupePage/CreateEventModal/CreateEventModal";

type SingleGroupePageProps = {
    params: {
        groupId: number;
    }
}
interface UserRole {
    groupId: number;
    role: string;
}
interface GroupDetails {
    groupId: number;
    groupName: string;
    groupDescription: string;
    groupLocation: string;
};

interface Post {
    postId: number;
    title: string;
    content: string;
    picture?: string;

};

const SingleGroupePage = ({ params }: SingleGroupePageProps) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { groupId } = params;

    const [groupDetails, setGroupDetails] = useState<GroupDetails>();
    const [allGroupPosts, setAllGroupPosts] = useState<Post[]>([]);
    const role = session?.user.roles.find((r: UserRole) => r.groupId === Number(groupId)).role;

    
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const fetchGroupDetails = async () => {
        if (!groupId) return;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/groupe/${groupId}`);
            if (!response.ok) throw new Error('Failed to fetch group details');
            const data = await response.json();
            setGroupDetails(data.group);
            setIsAdmin(data.isAdmin);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllGroupPost = async () => {
        if (!groupId) return;
        setIsLoading(true);
        try {
            const response = await fetch(`/api/post/${groupId}`);
            if (!response.ok) throw new Error('Failed to fetch group posts');
            const dataPosts = await response.json();
            setAllGroupPosts(dataPosts);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLeaveGroup = async () => {
        try {
            const response = await fetch(`/api/groupe/join/${groupId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to leave group');
            alert('You have left the group successfully');
            router.push('/home/groupes');
        } catch (error) {
            console.error('Error leaving group:', error);
        }
    };

    useEffect(() => {
        fetchGroupDetails();
        fetchAllGroupPost();
      }, [groupId]);

      
      


    if (session?.user) {
        return (
            <main>
                <Header username={session.user.username} />
                {isAdmin && <MainButton name="Créer un évènement" onClick={() => setIsModalOpen(true)} />}
                <div className="group-details-container">
                    {isLoading ? (
                        <div className="loading-circle">
                        <svg className="spinner" viewBox="0 0 50 50">
                          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                        </svg>
                      </div>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : groupDetails ? (
                        <div>
                            <h1 className="group-title">{groupDetails.groupName}</h1>
                            <p>{groupDetails.groupDescription}</p>
                            <p>{groupDetails.groupLocation}</p>
                            { role !== 'admin' ? 
                            (
                                <button className="leave-btn" onClick={handleLeaveGroup}>Quitter le groupe</button>

                            ) : null
                            }
                        </div>
                    ) : (
                        <p>No group details found</p>
                    )}
                </div>
                <nav className="group-navbar">
                    <Link href={`/home/groupes/${groupId}/myposts`}><div>Mes posts</div></Link>
                    { session.user.role == 'admin' ? 
                            (
                                <Link href={`/home/groupes/${groupId}/posts-manager`}><div>Gérer les posts</div></Link>

                            ) : null
                            }
                    </nav>    
                    <h2 className="title-section">Publications</h2>
                <div className="post-list">
                {isLoading ? (
                        <div className="loading-circle">
                        <svg className="spinner" viewBox="0 0 50 50">
                          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                        </svg>
                      </div>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : allGroupPosts.length > 0 ? (
                        allGroupPosts.map((post: Post) => (
                            <PostCard
                                key={post.postId}
                                title={post.title}
                                content={post.content}
                                author="Ecaron"
                                nbComment={5}
                                nbLike={5}
                                picture={post.picture}
                                group={true}
                            />
                        ))
                    ) : (
                        <p>No Posts found</p>
                    )}
                </div>
                {isModalOpen && <CreateEventModal groupId={groupId} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchAllGroupPost(); }} />}
            </main>
        );
    }

    return null;
};

export default SingleGroupePage;
