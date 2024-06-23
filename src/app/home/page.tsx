'use client';

import Header from "@/components/UI/Header/Header";
import PostCard from "@/components/UI/PostCard/PostCard";
import './home.css'
import EventCard from "@/components/UI/EventCard/EventCard";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Post {
  postId: number;
  title: string;
  content: string;
  groupId?: number;
  group: {
    groupName: string;
  };
  picture?: string;
  user: {
    username: string;
  };
  likesCount: number;
  commentsCount: number;
}

interface Event {
  eventId: number;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  createdBy: {
    username: string;
  };
  participants: {
    userId: string;
  }[];
}

const HomePage = () => {
  const { data: session } = useSession();

  const [groupPosts, setGroupPosts] = useState<Post[]>([]);
  const [adminPosts, setAdminPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorPosts, setErrorPosts] = useState('');
  const [errorEvents, setErrorEvents] = useState('');


  const fetchAllPost = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/post/`);
      if (!response.ok) throw new Error('Failed to fetch posts');

      const dataPosts: Post[] = await response.json();
      const groupPosts = dataPosts.filter(post => post.groupId !== null);
      const adminPosts = dataPosts.filter(post => post.groupId === null);
      console.log(groupPosts)

      setGroupPosts(groupPosts);
      setAdminPosts(adminPosts);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorPosts(error.message);
      } else {
        setErrorPosts(String(error));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/event/userEvents');
      if (!response.ok) throw new Error('Failed to fetch events');
      const dataEvents: Event[] = await response.json();
      setEvents(dataEvents);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorEvents(error.message);
      } else {
        setErrorEvents(String(error));
      }
    } finally {
      setIsLoading(false);
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
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.eventId === eventId
            ? { ...event, participants: [...event.participants, { userId: session?.user?.id! }] }
            : event
        )
      );
    } catch (error) {
      console.error('Error participating in event:', error);
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
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.eventId === eventId
            ? { ...event, participants: event.participants.filter(p => p.userId !== session?.user?.id) }
            : event
        )
      );
    } catch (error) {
      console.error('Error cancelling participation in event:', error);
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
      setEvents(prevEvents => prevEvents.filter(event => event.eventId !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  useEffect(() => {
    fetchAllPost();
    fetchUserEvents();
  }, []);

  if (session?.user) {
    return (
      <main>
        <Header username={session.user.username} />
        <div className="content-page">
          <section className="post-section">
            <h1 className="title-section">Publications</h1>
            <div className="posts-admins">
              <h2 className="title-posts-section">Publications Générales</h2>
              <br />
              <div className="post-list">
                {isLoading ? (
                  <div className="loading-circle">
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                  </div>
                ) : errorPosts ? (
                  <p>Error: {errorPosts}</p>
                ) : adminPosts.length > 0 ? (
                  adminPosts.map((post: Post) => (
                    
                    <PostCard
                      key={post.postId}
                      postId={post.postId}
                      title={post.title}
                      content={post.content}
                      author='MyGreenCircle'
                      nbComment={post.commentsCount}
                      picture={post.picture}
                      nbLike={post.likesCount}
                      userId={session.user.id}
                    />
                  ))
                ) : (
                  <p>No Posts found</p>
                )}
              </div>
            </div>
            <div className="posts-groups">
              <h2 className="title-posts-section">Publications de vos groupes</h2>
              <br />
              <div className="post-list">
                {isLoading ? (
                  <div className="loading-circle">
                    <svg className="spinner" viewBox="0 0 50 50">
                      <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
                    </svg>
                  </div>
                ) : errorPosts ? (
                  <p>Error: {errorPosts}</p>
                ) : groupPosts.length > 0 ? (
                  groupPosts.map((post: Post) => {
                    return (
                      <PostCard
                        key={post.postId}
                        postId={post.postId}
                        title={post.title}
                        content={post.content}
                        groupName={post.group.groupName}
                        picture={post.picture}
                        group
                        author={post.user.username}
                        nbComment={post.commentsCount}
                        nbLike={post.likesCount}
                        userId={session.user.id}
                      />
                    );
                  })
                ) : (
                  <p>No Posts found</p>
                )}
              </div>
            </div>
          </section>

          <div>
            <h2 className="title-section">Events</h2>
            <br />
            <div className="event-list">
              {isLoading ? (
                <p>Loading...</p>
              ) : errorEvents ? (
                <p>Error: {errorEvents}</p>
              ) : events.length > 0 ? (
                events.map((event: Event) => (
                  <EventCard
                    key={event.eventId}
                    title={event.title}
                    author={event.createdBy.username}
                    description={event.description}
                    date={new Date(event.startDate).toLocaleDateString()}
                    location={event.location}
                    hourly={`${new Date(event.startDate).toLocaleTimeString()} - ${new Date(event.endDate).toLocaleTimeString()}`}
                    isCreator={event.createdBy.username === session.user.username}
                    isParticipant={event.participants.some(p => p.userId === session.user.id)}
                    onParticipate={() => participateInEvent(event.eventId)}
                    onUnparticipate={() => unparticipateInEvent(event.eventId)}
                    onDelete={() => deleteEvent(event.eventId)}
                  />
                ))
              ) : (
                <p>No Events found</p>
              )}
            </div>
          </div>
        </div>
      </main>
    );
  } else {
    return (
      <main>
        Vous devez être connecté pour voir cette page.
      </main>
    );
  }
};

export default HomePage;
