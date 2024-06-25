"use client"
import React, { useState, useEffect } from 'react';
import './CommentModal.css';

type CommentModalProps = {
  postId: number;
  onClose: () => void;
};
interface User {
    username: string;
  }
  
  interface Comment {
    id: number;
    content: string;
    user?: User;
  }
const CommentModal: React.FC<CommentModalProps> = ({ postId, onClose }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/${postId}`);
        const data = await response.json();
        if (response.ok) {
          setComments(data.comments);
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
        setComments([...comments, comment]);
        setNewComment('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Commentaires</h2>
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p><strong>{comment.user.username}</strong>: {comment.content}</p>
              </div>
            ))}
          </div>
        )}
        <div className="new-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Écrire un commentaire..."
          />
          <button onClick={handlePostComment}>Poster</button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
