'use client'
import Header from "@/components/UI/Header/Header";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import './SingleGroupePage.css'
import { redirect, useRouter } from "next/navigation";
import PostCard from "@/components/UI/PostCard/PostCard";

type SingleGroupePageProps = {
    params: {
        groupId: number
    }

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
    author: string
}


const SingleGroupePage = ({ params }: SingleGroupePageProps) => {
    const { data: session } = useSession();
    const router = useRouter();

    const { groupId } = params;
    const [groupDetails, setGroupDetails] = useState<GroupDetails>();
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchGroupDetails = async () => {
        if (!groupId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/groupe/${groupId}`);
            if (!response.ok) throw new Error('Failed to fetch group details');

            const data = await response.json();
            setGroupDetails(data);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    const getAllGroupPosts = async () => {
        if (!groupId) return;
            setIsLoading(true);
        try {
            const response = await fetch(`/api/post/${groupId}`);
            if (!response.ok) throw new Error('Failed to get posts of the group');
            const dataPosts = await response.json();
            setAllPosts(dataPosts);
        } catch (error) {

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
        getAllGroupPosts();
        
      }, []);


    if (session?.user) {
        return (
            <main>
                <Header username={session.user.username} />
                <div className="group-details-container">
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : groupDetails ? (
                        <div>
                            <h2>{groupDetails.groupName}</h2>
                            <p>{groupDetails.groupDescription}</p>
                            <p>{groupDetails.groupLocation}</p>
                            <button onClick={handleLeaveGroup}>Quitter le groupe</button>
                        </div>
                    ) : (
                        <p>No group details found</p>
                    )}
                </div>
                <h2>Publications</h2>
                <div className="post-list">
                    
                    {
                        allPosts  ? (
                            allPosts.map((post: Post) => (
                                <PostCard
                                    key={post.postId}
                                    title={post.title}
                                    content={post.content}
                                    author='author'
                                    nbComment={5}
                                    nbLike={5}
                                />
                            ))
                        ) : null
                    }
                </div>
            </main>
        );
    }
}



export default SingleGroupePage
