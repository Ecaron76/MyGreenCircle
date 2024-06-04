import React from 'react'

import Image from 'next/image';
import './PostCard.css'
import AuthorBadge from '../AuthorBadge/AuthorBadge';
type PostCardProps = {
  title: string;
  content: string;
  author: string;
  nbLike: number;
  nbComment: number;

};

const PostCard: React.FC<PostCardProps> = ({ title, content, author, nbComment, nbLike  }) => {
  return (
    <div className="postCard">
    <AuthorBadge author='Ecaron' groupeName='EcoNormandie'/>

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




