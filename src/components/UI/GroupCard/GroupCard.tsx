import React from 'react'

import Image from 'next/image';
import './GroupCard.css'
import AuthorBadge from '../AuthorBadge/AuthorBadge';
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
            <AuthorBadge author='Ecaron' groupeName='EcoNormandie'/>
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




