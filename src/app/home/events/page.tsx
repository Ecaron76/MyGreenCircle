'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '../../../components/UI/Header/Header';
import EventCard from '@/components/UI/EventCard/EventCard';
import { EventWithCreator } from '@/types/event';
import '../events/events.css';

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

const participateInEvent = async (eventId: number) => {
  try {
    const response = await fetch('/api/event/participate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId }),
    });
    if (!response.ok) {
      throw new Error('Failed to participate in event');
    }
    return true;
  } catch (error) {
    console.error('Error participating in event:', error);
    return false;
  }
};

const unparticipateInEvent = async (eventId: number) => {
  try {
    const response = await fetch('/api/event/unparticipate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ eventId }),
    });
    if (!response.ok) {
      throw new Error('Failed to cancel participation in event');
    }
    return true;
  } catch (error) {
    console.error('Error cancelling participation in event:', error);
    return false;
  }
};

const deleteEvent = async (eventId: number) => {
  try {
    const response = await fetch(`/api/event/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete event');
    }
    return true;
  } catch (error) {
    console.error('Error deleting event:', error);
    return false;
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

  const handleParticipate = async (eventId: number) => {
    const success = await participateInEvent(eventId);
    if (success) {
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.eventId === eventId
            ? {
                ...event,
                participants: [...event.participants, { userId: session.user.id }],
              }
            : event
        )
      );
    }
  };

  const handleUnparticipate = async (eventId: number) => {
    const success = await unparticipateInEvent(eventId);
    if (success) {
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.eventId === eventId
            ? {
                ...event,
                participants: event.participants.filter(p => p.userId !== session.user.id),
              }
            : event
        )
      );
    }
  };

  const handleDelete = async (eventId: number) => {
    const success = await deleteEvent(eventId);
    if (success) {
      setEvents(prevEvents => prevEvents.filter(event => event.eventId !== eventId));
    }
  };

  return (
    <>
      <Header username={session.user.username} />
      <div className="content-page">
        <h2 className="title-section">Evènements</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul className="event-list">
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
                  onParticipate={() => handleParticipate(event.eventId)}
                  onUnparticipate={() => handleUnparticipate(event.eventId)}
                  onDelete={() => handleDelete(event.eventId)}
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
