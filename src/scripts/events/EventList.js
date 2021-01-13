import { Event } from './Event.js';
import { useEvents } from './eventProvider.js';
import { useFriends } from '../friends/friendDataProvider.js';

export const EventList = () => {
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const events = useEvents();
  const friends = useFriends();

  const userFriends = friends.filter((f) => activeUserId === f.userId);

  const friendIds = userFriends.map((f) => f.friendId);

  // array of user's events
  const userEvents = events.filter((e) => activeUserId === e.userId);
  // add a class designation to each user event object
  userEvents.forEach((e) => {
    e.class = 'userEvent';
  });

  // array of events for all friends
  const friendEvents = friendIds.map((i) => {
    return events.find((e) => i === e.userId);
  });

  // add a class designation to each friend event object
  friendEvents.forEach((e) => {
    e.class = 'friendEvent';
  });

  const allEvents = userEvents.concat(friendEvents);

  // execute HTML converter on all events
  const eventCardCollection = allEvents
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => Event(e))
    .join('');

  return `
    <div class="event-list__top-row">
      <button id="newEvent">New Event</button>      
    </div>
    <div class="event-list__events">
      ${eventCardCollection}
    </div>
    `;
};
