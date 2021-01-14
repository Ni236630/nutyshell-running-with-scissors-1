// author: Aaron Resch
// purpose: displays a list of event cards in the DOM

import { Event } from './Event.js';
import { useEvents } from './eventProvider.js';
import { useFriends } from '../friends/friendDataProvider.js';
import { NewEventForm } from './NewEventForm.js';

const eventHub = document.querySelector('.container');

export const EventList = () => {
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const events = useEvents();
  const friends = useFriends();

  // array of user's events
  const userEvents = events.filter((e) => activeUserId === e.userId);

  if (events.length > 0) {
    // add a class designation to each user event object
    userEvents.forEach((e) => {
      e.class = 'userEvent';
    });

    const userFriends = friends.filter((f) => activeUserId === f.userId);

    const friendIds = userFriends.map((f) => f.friendId);

    // array of events for all friends
    let fEvents = [];
    friendIds.forEach((i) => {
      let event = events.find((e) => i === e.userId);
      if (!event) {
        return;
      } else {
        fEvents.push(event);
      }
    });

    if (fEvents.length > 0) {
      // add a class designation to each friend event object
      fEvents.forEach((e) => {
        e.class = 'friendEvent';
      });

      const allEvents = userEvents.concat(fEvents);

      return `
      <div class="event-list__top-row">
      <button id="newEvent">New Event</button>      
      </div>
      <div class="event-list__events">
      ${render(allEvents)}
      </div>
      <dialog id="newEventFormDialog"></dialog>
      `;
    } else {
      return `
      <div class="event-list__top-row">
      <button id="newEvent">New Event</button>      
      </div>
      <div class="event-list__events">
      ${render(userEvents)}
      </div>
      <dialog id="newEventFormDialog"></dialog>
      `;
    }
  } else {
    return `
    <div class="event-list__top-row">
    <button id="newEvent">New Event</button>      
    </div>
    <div class="event-list__events">
    <h2>No events found.</h2>
    </div>
    <dialog id="newEventFormDialog"></dialog>
    `;
  }
};

const render = (events) => {
  return events
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((e) => Event(e))
    .join('');
};

eventHub.addEventListener('click', (e) => {
  if (e.target.id !== 'newEvent') {
    return;
  } else {
    NewEventForm();
  }
});

// TODO: refactor so that friends display more than one event (filter instead of find)