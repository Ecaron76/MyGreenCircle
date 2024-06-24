'use client'
import Header from "@/components/UI/Header/Header";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { redirect, useRouter } from "next/navigation";
import PostCard from "@/components/UI/PostCard/PostCard";
import MainButton from "@/components/UI/MainButton/MainButton";
import Link from "next/link";
import './PostsManager.css'
import DeleteModal from "@/components/UI/DeleteModal/DeleteModal";
import PublishModal from "@/components/UI/PublishModal/PublishModal";

type PostsManagerPageProps = {
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
    groupId: number;
    title: string;
    content: string;
    isVisible: boolean;
    picture?: string;
    user: {
        username: string;
      };

};
const PostsManager = ({ params }: PostsManagerPageProps) => {
    const { data: session } = useSession();
    const { groupId } = params;
    const [allMyPostsGroup, setAllMyPostsGroup] = useState<Post[]>([]);
    const [groupDetails, setGroupDetails] = useState<GroupDetails>();

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');


    const [isPublishModalVisible, setIsPublishModalVisible] = useState(false);
    const [isPublishing, setIsPublishing] = useState<boolean | undefined>();
    const [postToManage, setPostToManage] = useState<number | null>(null);

    const fetchGroupDetails = async () => {
        if (!groupId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/groupe/${groupId}`);
            if (!response.ok) throw new Error('Failed to fetch group details');

            const data = await response.json();
            setGroupDetails(data.group);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };

    const fetchAllPostsGroup = async () => {
        if (!groupId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/post/${groupId}/all`);
            if (!response.ok) throw new Error('Failed to fetch group details');

            const dataPosts = await response.json();
            setAllMyPostsGroup(dataPosts);
        } catch (error) {

        } finally {
            setIsLoading(false);
        }
    };
    const handlePublishPostClick = (postId:number, isVisible: boolean) => {
        setPostToManage(postId);
        setIsPublishing(isVisible);
        setIsPublishModalVisible(true);
      };
    
      const closePublishPostModal = () => {
        setIsPublishModalVisible(false);
        setPostToManage(null);
      };
    
      const handlePublishPost = async () => {
        try {
            console.log(!isPublishing)
          const response = await fetch(`/api/post/item/${postToManage}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isVisible: !isPublishing })
             
          });
          if (!response.ok) throw new Error('Failed to manage post');
          fetchAllPostsGroup()
          closePublishPostModal();
        } catch (error) {
          setError('');
        }
      };

    

    useEffect(() => {
        fetchGroupDetails()
        fetchAllPostsGroup()
      }, [groupId]);


    if (session?.user) {
        return (
            <main>
                <Header username={session.user.username} />
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
                        </div>
                        
                    ) : (
                        <p>No group details found</p>
                    )}
                </div>
                <h1 className="title-allPosts">Toutes les publications dans ce groupe</h1>
                <div className="post-list">
                {isLoading ? (
                        <div className="loading-circle">
                        <svg className="spinner" viewBox="0 0 50 50">
                          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                        </svg>
                      </div>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : allMyPostsGroup.length > 0 ? (
                        allMyPostsGroup.map((post: Post) => (
                            <PostCard
                                key={post.postId}
                                postId={post.postId}
                                groupId={post.groupId}
                                title={post.title}
                                content={post.content}
                                author={post.user.username}
                                nbComment={5}
                                nbLike={5}
                                picture={post.picture}
                                isVisible={post.isVisible}
                                validation
                                onPublish={() => handlePublishPostClick(post.postId, post.isVisible)}
                                
                            />
                        ))
                    ) : (
                        <p>No Posts found</p>
                    )}
                </div>
                
                
               
                {isPublishModalVisible && (
          <PublishModal
            onClose={closePublishPostModal}
            onSuccess={handlePublishPost}
            isPublishing={isPublishing}
          />
        )}

            </main>
        );
    }
}



export default PostsManager
