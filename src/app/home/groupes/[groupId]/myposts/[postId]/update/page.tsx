'use client'
import Header from "@/components/UI/Header/Header";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import './UpdatePostPage.css'
import { useRouter } from "next/navigation";

type UpdatePostPageProps = {
    params: {
        groupId: number;
        postId: number;
    };
};

interface Post {
    postId: number;
    title: string;
    content: string;
    picture?: string;
};

interface GroupDetails {
    groupId: number;
    groupName: string;
    groupDescription: string;
    groupLocation: string;
};
const UpdatePostPage = ({ params }: UpdatePostPageProps) => {
    const { data: session } = useSession();
    const router = useRouter();
    const { groupId, postId } = params;
    const [postDetails, setPostDetails] = useState<Post>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [file, setFile] = useState<File>()
    const [imageObjectUrl, setImageObjectUrl] = useState<string | null>(null)
    const [groupDetails, setGroupDetails] = useState<GroupDetails>();


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

    const fetchPostDetails = async () => {
        if (!postId) return;

        setIsLoading(true);
        try {
            const response = await fetch(`/api/post/item/${postId}`);
            if (!response.ok) throw new Error('Failed to fetch post details');

            const data = await response.json();
            setPostDetails(data);
            setTitle(data.title);
            setContent(data.content);
            setImageObjectUrl(data.picture || null);
        } catch (error) {
            setError('Failed to fetch post details');
        } finally {
            setIsLoading(false);
        }
    };

    const updatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let imageUrl = postDetails?.picture || null;
            if (file) {
                imageUrl = await uploadImage();
            }

            const response = await fetch(`/api/post/item/${postId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content, groupId: Number(groupId), picture: imageUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to update post');
            }

            router.push(`/home/groupes/${groupId}`);
        } catch (error) {
            setError('Failed to update post');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGroupDetails()
        fetchPostDetails()
      }, [groupId, postId]);

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
                <form onSubmit={updatePost}>
                    <div>
                        <label htmlFor="title">Titre:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="content">Contenu:</label>
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
                                if (e.target.files && e.target.files[0]) {
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
                        {isLoading ? 'Mise à jour...' : 'Mettre à jour le post'}
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                


            </main>
        );
    }
}



export default UpdatePostPage
