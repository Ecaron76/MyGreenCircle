import React from 'react'

import Image from 'next/image';
import './GroupCard.css'
import AuthorBadge from '../AuthorBadge/AuthorBadge';
import Link from 'next/link';
type GroupCardProps = {
  title: string;
  description?: string
  nbMember: number;
  image?: string
  myGroup?: boolean
  group?: boolean;
  groupId: number;
  refreshGroups?: () => void;
};

const GroupCard: React.FC<GroupCardProps> = ({ title, description, nbMember, myGroup, groupId, refreshGroups, image  }) => {

  const defaultImage = '/assets/images/groupe.png';
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
              <Image alt="" src={image || defaultImage} width={300} height={200} className="groupeImg"/>
            </div>
            <h2 className='title-group'>{title}</h2>
            <div className='groupeDescription'>
                {description}
            </div>
            <div className="nbMembres">
            {nbMember} membres
            </div>
            {
              myGroup ? <Link  href={`/home/groupes/${groupId}`}><div className="groupeBtn">Consulter</div></Link>
              : 
              <div className='groupeBtn-container'>
                <div className="groupeBtn" onClick={handleJoinGroup}>Rejoindre</div> 
              </div>
            }
            
          </div>
  )
};
export default GroupCard




