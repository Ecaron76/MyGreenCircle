import React, { useEffect, useState } from 'react';
import { FiTrash2, FiEdit, FiCheckCircle, FiEyeOff,FiMessageSquare,FiThumbsUp  } from 'react-icons/fi';
import Image from 'next/image';
import './PostCard.css';
import AuthorBadge from '../AuthorBadge/AuthorBadge';
import Link from 'next/link';
import CommentModal from '../CommentModal/CommentModal';

type PostCardProps = {
  postId?: number;
  groupId?: number;
  title: string;
  content: string;
  isVisible?: boolean;
  author: string;
  nbLike: number;
  nbComment: number;
  groupName?: string;
  group?: boolean;
  picture?: string;
  editable?: boolean;
  onDelete?: () => void;
  onPublish?: () => void;
  validation?: boolean;
  onCommentClick: (postId: number) => void;
};

const PostCard: React.FC<PostCardProps> = ({
  postId,
  groupId,
  title,
  content,
  author,
  nbComment,
  nbLike,
  isVisible,
  groupName,
  group,
  picture,
  editable,
  onDelete,
  onPublish,
  validation,
  onCommentClick  
}) => {
  const [likes, setLikes] = useState(nbLike);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPostLikes = async () => {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        const data = await response.json();

        if (response.ok) {
          setLikes(data.likesCount);
          setLiked(data.userHasLiked);
        } else {
          console.error('Failed to fetch post likes');
        }
      } catch (error) {
        console.error('Error fetching post likes:', error);
      }
    };

    fetchPostLikes();
  }, [postId]);

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likes', {
        method: liked ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId }),
      });

      if (response.ok) {
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
      } else {
        console.error('Failed to update like');
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const defaultImage = '/assets/images/groupe.png';

  return (
    <div className="postCard">
      {editable && (
        <div className="edit-icons">
          <Link href={`/home/groupes/${groupId}/myposts/${postId}/update`}>
            <FiEdit className="icon" title="Éditer le post" />
          </Link>
          <FiTrash2 className="icon" title="Supprimer le post" onClick={onDelete} />
        </div>
      )}
      {validation && (
        <div className="check-icons">
          {isVisible ? (
            <button className="unpublish-btn" onClick={onPublish}>
              <FiEyeOff className="icon-off" title="Dépublier le post" />
              Dépublier
            </button>
          ) : (
            <button className="publish-btn" onClick={onPublish}>
              <FiCheckCircle className="icon-check" title="Autoriser la publication" />
              Publier
            </button>
          )}
        </div>
      )}
      <div className="header-card">
        <AuthorBadge author={author} groupName={groupName} group={group} />
        {isVisible !== undefined ? (
          isVisible ? (
            <div className="published tag">Publié</div>
          ) : (
            <div className="unpublished tag">Non publié</div>
          )
        ) : null}
      </div>
      <div className="postIllustration">
        <Image alt="" src={picture || defaultImage} width={300} height={200} className="postImg" />
      </div>

      <div className="postContent">
        <div className="postTitle">{title}</div>
        <p>{content}</p>
      </div>
      <div className="postButtons">
        <div className="like-container">
          <div className="postTrending">{likes} j&apos;aime</div>
          <button className="trending-btn" onClick={handleLike}>
            <FiThumbsUp className="like-icon" title="J'aime" />

          </button>
        </div>
        <div className="comment-container">
          <div className="postTrending">{nbComment} commentaires</div>
          <button className="trending-btn" onClick={() => onCommentClick(Number(postId))}>
            <FiMessageSquare className="comment-icon" title="Commentaires" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default PostCard;


