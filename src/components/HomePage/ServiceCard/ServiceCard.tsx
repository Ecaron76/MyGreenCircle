import React from 'react'
import './ServiceCard.css'
type ServiceCardProps = {
  title: string;
  content: string;

};

const ServiceCard: React.FC<ServiceCardProps> = ({ title, content  }) => {
  return (
    <div className='serviceCard'>
        <div>
            
        </div>
        <h3 className='serviceTitle'>{title}</h3>
        <p>{content}</p>
    </div>
  )
};
export default ServiceCard
