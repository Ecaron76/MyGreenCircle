import React, { useState } from 'react'
import { FiTrash2, FiEdit } from 'react-icons/fi';
import Image from 'next/image';
import './PostCard.css'
import AuthorBadge from '../AuthorBadge/AuthorBadge';

type PostCardProps = {
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
  onDelete: () => void;
};

const PostCard: React.FC<PostCardProps> = ({ title, content, author, nbComment, nbLike, isVisible, groupName, group, picture, editable, onDelete }) => {

  const defaultImage = '/assets/images/groupe.png';

  

  return (
    <div className="postCard">
      {editable && (
          <div className="edit-icons">
            <FiEdit className="icon" title="Éditer le post" />
            <FiTrash2 className="icon" title="Supprimer le post" onClick={onDelete}/>
          </div>
        )}
      <div className='header-card'>
        <AuthorBadge author={author} groupName={groupName} group={group} />
        {isVisible !== undefined ? (
          isVisible ?
            (<div className='published tag'>Publié</div>) :
            (<div className='unpublished tag'>Non publié</div>)
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
        <div className='like-container'>
          <div className='postTrending'>{nbLike} j&apos;aime</div>
          <div className='trending-btn'>
            <Image alt="" src='/assets/images/iconBtn/like.png' width={35} height={25} />
          </div>
        </div>
        <div className='comment-container'>
          <div className='postTrending'>{nbComment} commentaires</div>
          <div className='trending-btn'>
            <Image alt="" src='/assets/images/iconBtn/comment.png' width={30} height={25} />
          </div>
        </div>
      </div>
    </div>
  )
};
export default PostCard




