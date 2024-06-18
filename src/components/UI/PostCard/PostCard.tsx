import React from 'react'

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

};

const PostCard: React.FC<PostCardProps> = ({ title, content, author, nbComment, nbLike, isVisible, groupName, group, picture  }) => {
  const defaultImage = '/assets/images/groupe.png';

  return (
    <div className="postCard">
    <div className='header-card'>
      <AuthorBadge author={author} groupName={groupName} group={group} />
      {isVisible !== undefined ? (
        isVisible ? 
        ( <div className='published tag'>Publié</div> ) : 
        ( <div className='unpublished tag'>Non publié</div> )
        ) : null}
    </div>
    <div className="groupeIllustration">
              <Image alt="" src={picture || defaultImage} width={300} height={200} className="groupeImg"/>
            </div>

    <div className="postContent">
        <div className="postTitle">{title}</div>
        <p>{content}</p>
    </div>
    <div className='postTrending'>
      <div>{nbLike} j&apos;aime</div>
      <div>{nbComment} commentaires</div>
    </div>
    <div className="postButtons">
        <div><Image alt="" src='/assets/images/iconBtn/like.png' width={35} height={25} /></div>
        <div><Image alt="" src='/assets/images/iconBtn/comment.png' width={30} height={25} /></div>
    </div>
</div>
  )
};
export default PostCard




