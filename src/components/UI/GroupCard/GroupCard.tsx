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
  groupId: number;
  refreshGroups?: () => void;
};

const GroupCard: React.FC<GroupCardProps> = ({ title, author, description, nbMember, myGroup, groupId, refreshGroups  }) => {
  const handleJoinGroup = async () => {
    try {
      const response = await fetch(`/api/groupe/join/${groupId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Joined group successfully:', data);
        refreshGroups && refreshGroups();
      } else {
        console.error('Failed to join group:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="groupeCard">
            <div className="groupeIllustration">
              <Image alt="" src='/assets/images/groupe.png' width={300} height={200} className="groupeImg"/>
            </div>
            <AuthorBadge author='Ecaron' groupeName={title}/>
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
                <div className="groupeBtn" onClick={handleJoinGroup}>Rejoindre</div> 
                <div className="groupeBtn">Infos</div> 
              </div>
            }
            
          </div>
  )
};
export default GroupCard




