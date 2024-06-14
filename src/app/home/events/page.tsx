'use client'

import { Event } from '@prisma/client';
import { useEffect, useState } from 'react';

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
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchUserEvents().then(setEvents);
  }, []);

  return (
    <div>
      <h1>Events Page</h1>
    {events.length === 0 ? (
        <p>No events found.</p>
    ) : (
        <ul>
            {events.map((event: Event) => (
                <li key={event.eventId}>
                    <h2>{event.title}</h2>
                    <p>{event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Date:</strong> {new Date(event.startDate).toLocaleDateString()}</p>
                </li>
            ))}
        </ul>
    )}
    </div>
  );
};

export default EventPage;
