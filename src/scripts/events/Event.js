// author: Aaron Resch
// purpose: event card HTML component

import { useUsers } from '../users/userDataProvider.js';

export const Event = (eventObject) => {
  const users = useUsers();

  const thisEventUser = users.find((u) => u.id === eventObject.userId);

  return `
    <div class="event-card ${eventObject.class}" id="event-card--${eventObject.id}">
      <div class="event-card__name">Event: ${eventObject.name}</div>
      <div class="event-card__organizer">Organizer: ${thisEventUser.username}</div>
      <div class="event-card__location">Location: ${eventObject.location}</div>
      <div class="event-card__date">Date: ${eventObject.date}</div>
    </div> 
  `;
};
