'use client'
import Header from "@/components/UI/Header/Header";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { redirect, useRouter } from "next/navigation";
import PostCard from "@/components/UI/PostCard/PostCard";
import MainButton from "@/components/UI/MainButton/MainButton";
import Link from "next/link";

import './MyPosts.css'

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
    isVisible: boolean;
    picture?: string;

};
const MyPosts = ({ params }: SingleGroupePageProps) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { groupId } = params;
    const [allMyPostsGroup, setAllMyPostsGroup] = useState<Post[]>([]);
    const [groupDetails, setGroupDetails] = useState<GroupDetails>();

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

    const fetchAllMyPostsGroup = async () => {
        if (!groupId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/post/${groupId}/me`);
            if (!response.ok) throw new Error('Failed to fetch group details');

            const dataPosts = await response.json();
            setAllMyPostsGroup(dataPosts);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    

    useEffect(() => {
        fetchGroupDetails()
        fetchAllMyPostsGroup()
      }, [groupId]);


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
                            <h1 className="group-title">{groupDetails.groupName}</h1>
                            <p>{groupDetails.groupDescription}</p>
                            <p>{groupDetails.groupLocation}</p>
                            <Link href={`/home/groupes/${groupId}/write`}><MainButton name="Ecrire un post"/></Link>

                        </div>
                        
                    ) : (
                        <p>No group details found</p>
                    )}
                </div>
                <h1 className="title-myposts">Toutes vos publications</h1>
                <div className="post-list">
                {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : allMyPostsGroup.length > 0 ? (
                        allMyPostsGroup.map((post: Post) => (
                            <PostCard
                                key={post.postId}
                                title={post.title}
                                content={post.content}
                                author={'author'}
                                nbComment={5}
                                nbLike={5}
                                picture={post.picture}
                                isVisible={post.isVisible}
                            />
                        ))
                    ) : (
                        <p>No Posts found</p>
                    )}
                </div>
                
                
               


            </main>
        );
    }
}



export default MyPosts
