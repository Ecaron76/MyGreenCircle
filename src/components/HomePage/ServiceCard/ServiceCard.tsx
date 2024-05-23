import React from 'react'
import './MainButton.css'

type ServiceCardProps = {
  title: string;
  content: string;
  image: string;

};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, content  }) => {
  return (
    <div className='serviceCard'>
        <div>
            <Image />
        </div>
        <h3>{title}</h3>
        <p>{content}</p>
    </div>
  )
};
export default ServiceCard
