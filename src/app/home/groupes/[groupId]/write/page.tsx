'use client'
import Header from "@/components/UI/Header/Header";
import './write.css'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import {  useRouter } from "next/navigation";

type WritePostPageProps = {
    params: {
        groupId: number;
    };
};

interface Post {
    postId: number;
    title: string;
    content: string;

};
const WritePostPage = ({ params }: WritePostPageProps) => {    
    const { data: session } = useSession();
    const router = useRouter();
    const { groupId } = params;
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const createPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/post/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, groupId: Number(groupId) }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const data = await response.json();
            router.push(`/home/groupes/${groupId}`);
        } catch (error) {
            setError('Failed to create post');
        } finally {
            setIsLoading(false);
        }
    };

    
    if (session?.user) {
        return (
            <main>
                <Header username={session.user.username} />
                
                <form onSubmit={createPost}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating...' : 'Create Post'}
                </button>
            </form>


            </main>
        );
    }
}



export default WritePostPage
