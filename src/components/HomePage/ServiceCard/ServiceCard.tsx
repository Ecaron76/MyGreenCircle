import React from 'react'
import './ServiceCard.css'
import Image from 'next/image';
type ServiceCardProps = {
  title: string;
  content: string;
  image: string;

};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, content, image  }) => {
  return (
    <div className='serviceCard'>
        <div className='serviceIconContainer'>
            <Image src={image} alt='' width={50} height={50} className=''/>
        </div>
        <h3 className='serviceCard-title'>{title}</h3>
        <p>{content}</p>
    </div>
  )
};
export default ServiceCard
