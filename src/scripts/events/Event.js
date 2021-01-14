// author: Aaron Resch
// purpose: event card HTML component

import { useUsers } from '../users/userDataProvider.js';

const eventHub = document.querySelector('.container');

export const Event = (eventObject) => {
  const users = useUsers();

  const thisEventUser = users.find((u) => u.id === eventObject.userId);

  if (eventObject.class === 'userEvent') {
    return `
      <div class="event-card ${eventObject.class}" id="event-card--${eventObject.id}">
        <div class="event-card__name">Event: ${eventObject.name}</div>
        <div class="event-card__organizer">Organizer: ${thisEventUser.username}</div>
        <div class="event-card__location">Location: ${eventObject.location}</div>
        <div class="event-card__date">Date: ${eventObject.date}</div>
        <button id="deleteEvent--${eventObject.id}">Delete Event</button>
      </div> 
    `;
  } else {
    return `
      <div class="event-card ${eventObject.class}" id="event-card--${eventObject.id}">
        <div class="event-card__name">Event: ${eventObject.name}</div>
        <div class="event-card__organizer">Organizer: ${thisEventUser.username}</div>
        <div class="event-card__location">Location: ${eventObject.location}</div>
        <div class="event-card__date">Date: ${eventObject.date}</div>
      </div> 
    `;
  }

};

eventHub.addEventListener('click', (e) => {
  if (!e.target.id.startsWith('deleteEvent--')) {
    return;
  } else {
    const [unused, eventId] = e.target.id.split('--');
    const customEvent = new CustomEvent('deleteEventClicked', {
      detail: {
        eventToDelete: eventId,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});
