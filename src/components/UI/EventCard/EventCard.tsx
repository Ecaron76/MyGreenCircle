import React from 'react'

import Image from 'next/image';
import './EventCard.css'
type EventCardProps = {
  title: string;
  author: string;
  description: string;
  date: string;
  location: string;
  hourly: string;
};

const EventCard: React.FC<EventCardProps> = ({title, author, description, date, location, hourly}) => {
  return (
    <div className="eventCard">
            <div className="eventCard-header">
              <div className="eventTitle">{title}</div>
            </div>
            <div className="eventOrganisation">
              <div>Organisé par {author}</div>
              <div className="eventDate">{date}</div>
              </div>
            <div className="eventIllustration">
              <Image alt="" src='/assets/images/recyclage.jpg' width={200} height={200} className="eventImage"/>
            </div>
            
            <div className="eventContent">
              <p>{description}</p>
            </div>
            <div className="eventLocation"><Image alt="" src='/assets/images/location.png' width={18} height={18}/>{location}</div>
            <div className="eventButtons">
              <div className="participBtn"> <Image alt="" src='/assets/images/iconBtn/star.png' width={30} height={30}/> Participer </div>
              <div className="horraire">{hourly}</div>
          </div>
          </div>
  )
};
export default EventCard




