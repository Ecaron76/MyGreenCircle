import React from 'react'

import Image from 'next/image';
import './GroupCard.css'
type GroupCardProps = {
  title: string;
  author: string;
  description?: string
  nbMember: string;
  btn?: boolean
};

const GroupCard: React.FC<GroupCardProps> = ({ title, author, description, nbMember, btn  }) => {
  return (
    <div className="groupeCard">
            <div className="groupeIllustration">
              <Image alt="" src='/assets/images/groupe.png' width={300} height={200} className="groupeImg"/>
            </div>
            <div className="groupeAuthor">
              <div className="authorIcon">
                <Image alt="" src='/assets/images/pp.png' width={70} height={70} className="authorIcon"/>
              </div>
              <div className="authorInfos">
                <h3>{title}</h3>
                <h4>{author}</h4>
              </div>
            </div>
            <div className='groupeDescription'>
                {description}
            </div>
            <div className="nbMembres">
            {nbMember} membres
            </div>
            {btn ? <div className="groupeBtn">Rejoindre</div> : null}
            
          </div>
  )
};
export default GroupCard




