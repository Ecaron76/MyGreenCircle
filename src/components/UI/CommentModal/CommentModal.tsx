"use client"
import React, { useState, useEffect } from 'react';
import './CommentModal.css';
import MainButton from '../MainButton/MainButton';
import { format } from 'date-fns';

type CommentModalProps = {
  postId: number;
  postTitle: string;
  onClose: () => void;
};
interface User {
    username: string;
  }
  
  interface Comment {
    id: number;
    content: string;
    createdAt: string;
    user?: User;
  }
const CommentModal: React.FC<CommentModalProps> = ({ postId,postTitle, onClose }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/${postId}`);
        const data = await response.json();
        if (response.ok) {
            const sortedComments = data.comments.sort((a: Comment, b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setComments(sortedComments);
        } else {
          console.error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handlePostComment = async () => {
    try {
      const response = await fetch(`/api/comments/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const { comment } = await response.json();
        setComments([comment,...comments ]);
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };
  

  return (
    <div className="modal-comment">
      <div className="modal-comment-content">
        <span className="close-comment" onClick={onClose}>
          &times;
        </span>
        <h2 className='postTitle-comments'>{postTitle}</h2>
        <h3>Commentaires</h3>
        {loading ? (
          <div className="loading-circle">
            <svg className="spinner" viewBox="0 0 50 50">
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
            </svg>
          </div>
        ) : (
            <div>
                <div className="new-comment">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Écrire un commentaire..."
                    />
                    <MainButton name='Poster' onClick={handlePostComment}/>
                </div>
                {comments.map((comment) => (
                <div key={comment.id} className="comment">
                    <div className='comment-author'>
                        <div className='comment-username'><strong>{comment.user ? comment.user.username : 'Anonyme'}</strong></div>
                        <div className='comment-date'>{format(new Date(comment.createdAt), "dd/MM/yyyy 'à' HH'h'mm")}</div>
                    </div>
                    <div className='comment-content'>{comment.content}</div>             
                    </div>
                ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentModal;
