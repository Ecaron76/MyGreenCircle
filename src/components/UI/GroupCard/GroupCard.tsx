import React from 'react'

import Image from 'next/image';
import './GroupCard.css'
import AuthorBadge from '../AuthorBadge/AuthorBadge';
type GroupCardProps = {
  title: string;
  author: string;
  description?: string
  nbMember: string;
  myGroup?: boolean

};

const GroupCard: React.FC<GroupCardProps> = ({ title, author, description, nbMember, myGroup  }) => {
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
            {
              myGroup ? <div className="groupeBtn">Consulter</div> 
              : 
              <div className='groupeBtn-container'>
                <div className="groupeBtn">Rejoindre</div> 
                <div className="groupeBtn">Infos</div> 
              </div>
            }
            
          </div>
  )
};
export default GroupCard




