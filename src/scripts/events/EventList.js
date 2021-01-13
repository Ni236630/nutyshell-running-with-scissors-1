import { Event } from './Event.js';
import { useEvents } from './eventProvider.js';
import { useFriends } from '../friends/friendDataProvider.js';

export const EventList = () => {
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const events = useEvents();
  const friends = useFriends();

  const userFriends = friends.filter((f) => activeUserId === f.userId);

  const friendIds = userFriends.map((f) => f.friendId);

  const userEvents = events.filter((e) => activeUserId === e.userId);
  userEvents.forEach((e) => {
    e.class = 'userEvent';
  });
  const friendEvents = friendIds.map((i) => {
    return events.find((e) => i === e.userId);
  });
  friendEvents.forEach((e) => {
    e.class = 'friendEvent';
  });

  const allEvents = userEvents.concat(friendEvents);
  const eventCardCollection = allEvents.map((e) => Event(e)).join('');

  return `
    <div class="event-list__top-row">
      <button id="newEvent">New Event</button>      
    </div>
    <div class="event-list__events">
      ${eventCardCollection}
    </div>
    `
};
