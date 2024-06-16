// 'use client';

// import { useEffect, useState } from 'react';
// import EventCard from '@/components/UI/EventCard/EventCard';
// import { EventWithCreator } from '@/types/event';
// import Header from '@/components/UI/Header/Header';
// import { useSession } from 'next-auth/react';

// const fetchUserEvents = async () => {
//   try {
//     const response = await fetch('/api/event/userEvents');
//     if (!response.ok) {
//       throw new Error('Failed to fetch events');
//     }
//     const events = await response.json();
//     return events;
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return [];
//   }
// };

// const EventPage = () => {
//   const [events, setEvents] = useState<EventWithCreator[]>([]);

//   useEffect(() => {
//     fetchUserEvents().then(setEvents);
//   }, []);

//   const { data: session } = useSession();

//   if (!session?.user) {
//     return <div>Not authenticated</div>;
//   }
//   return (
//     <>
//     <Header username={session.user.username} />
//     <div>
//       <h1>Events Page</h1>
//       {events.length === 0 ? (
//         <p>No events found.</p>
//       ) : (
//         <ul>
//           {events.map(event => (
//             <li key={event.eventId}>
//               <EventCard
//                 title={event.title}
//                 author={event.createdBy?.username || 'Unknown'}
//                 description={event.description}
//                 date={new Date(event.startDate).toLocaleDateString()}
//                 location={event.location}
//                 hourly={`${new Date(event.startDate).toLocaleTimeString()} - ${new Date(event.endDate).toLocaleTimeString()}`}
//               />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//     </>
//   );
// };

// export default EventPage;

// 'use client';

// import { useEffect, useState } from 'react';
// import EventCard from '@/components/UI/EventCard/EventCard';
// import { EventWithCreator } from '@/types/event';
// import Header from '@/components/UI/Header/Header';
// import { useSession } from 'next-auth/react';

// const fetchUserEvents = async () => {
//   try {
//     const response = await fetch('/api/event/userEvents');
//     if (!response.ok) {
//       throw new Error('Failed to fetch events');
//     }
//     const events = await response.json();
//     return events;
//   } catch (error) {
//     console.error('Error fetching events:', error);
//     return [];
//   }
// };

// const EventPage = () => {
//   const [events, setEvents] = useState<EventWithCreator[]>([]);
//   const { data: session } = useSession();

//   useEffect(() => {
//     fetchUserEvents().then(setEvents);
//   }, []);

//   if (!session?.user) {
//     return <div>Not authenticated</div>;
//   }

//   return (
//     <>
//       <Header username={session.user.username} />
//       <div>
//         <h1>Events Page</h1>
//         {events.length === 0 ? (
//           <p>No events found.</p>
//         ) : (
//           <ul>
//             {events.map(event => (
//               <li key={event.eventId}>
//                 <EventCard
//                   title={event.title}
//                   author={event.createdBy?.username || 'Unknown'}
//                   description={event.description}
//                   date={new Date(event.startDate).toLocaleDateString()}
//                   location={event.location}
//                   hourly={`${new Date(event.startDate).toLocaleTimeString()} - ${new Date(event.endDate).toLocaleTimeString()}`}
//                   isCreator={event.createdBy.username === session.user.username}
//                   isParticipant={event.participants.some(p => p.userId === session.user.id)}
//                 />
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

// export default EventPage;

'use client';

import { useEffect, useState } from 'react';
import EventCard from '@/components/UI/EventCard/EventCard';
import { EventWithCreator } from '@/types/event';
import Header from '@/components/UI/Header/Header';
import { useSession } from 'next-auth/react';

const fetchUserEvents = async () => {
  try {
    const response = await fetch('/api/event/userEvents');
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

const EventPage = () => {
  const [events, setEvents] = useState<EventWithCreator[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    fetchUserEvents().then(setEvents);
  }, []);

  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  return (
    <>
      <Header username={session.user.username} />
      <div>
        <h1>Events Page</h1>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul>
            {events.map(event => (
              <li key={event.eventId}>
                <EventCard
                  title={event.title}
                  author={event.createdBy?.username || 'Unknown'}
                  description={event.description}
                  date={new Date(event.startDate).toLocaleDateString()}
                  location={event.location}
                  hourly={`${new Date(event.startDate).toLocaleTimeString()} - ${new Date(event.endDate).toLocaleTimeString()}`}
                  isCreator={event.createdBy.username === session.user.username}
                  isParticipant={event.participants.some(p => p.userId === session.user.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default EventPage;
