'use client'
import Header from "@/components/UI/Header/Header";
import './write.css'
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

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
    const [file, setFile] = useState<File>()
    const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null)


    const uploadImage = async () => {
        if (!file) return null;

        const imageData = new FormData();
        imageData.append('file', file);
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: imageData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            const data = await response.json();
            return data.url;
        } catch (error) {
            console.error('Error in uploading image', error);
            return null;
        }
    }

    const createPost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const imageUrl = await uploadImage();


        try {
            const response = await fetch('/api/post/item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, groupId: Number(groupId), picture: imageUrl }),
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
                    <div className="form-group">
                        <input
                            type="file"
                            id="picture"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setFile(e.target.files[0]);
                                    setImageObjectUrl(URL.createObjectURL(e.target.files[0]));
                                }
                            }}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="picture" className="custom-file-upload">
                            Choisir une image
                        </label>
                        {imageObjectUrl && <img src={imageObjectUrl} alt="Post Preview" className="image-preview" />}
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
