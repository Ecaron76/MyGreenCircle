import React, { useState } from 'react'
import { FiTrash2, FiEdit, FiCheckCircle, FiEyeOff } from 'react-icons/fi';
import Image from 'next/image';
import './PostCard.css'
import AuthorBadge from '../AuthorBadge/AuthorBadge';
import Link from 'next/link';

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
  validation?: boolean
};

const PostCard: React.FC<PostCardProps> = ({ postId, groupId, title, content, author, nbComment, nbLike, isVisible, groupName, group, picture, editable, onDelete,onPublish, validation }) => {

  const defaultImage = '/assets/images/groupe.png';


  return (
    <div className="postCard">
      {editable && (
          <div className="edit-icons">
            <Link href={`/home/groupes/${groupId}/myposts/${postId}/update`}>
              <FiEdit className="icon" title="Éditer le post" />
            </Link>
            <FiTrash2 className="icon" title="Supprimer le post" onClick={onDelete}/>
          </div>
        )}
        {validation && (
          <div className="check-icons">
           
            {isVisible ? (
                  <button className='unpublish-btn' onClick={onPublish}><FiEyeOff className="icon-off" title="Dépublier le post" />Dépublier </button>
            ): (  <button className='publish-btn' onClick={onPublish}><FiCheckCircle className="icon-check" title="Autoriser la publication" /> Publier </button>)}
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




