// author: Aaron Resch
// purpose: affordance for users to create new events

import { saveEvent } from './eventProvider.js';

const eventHub = document.querySelector('.container');

export const NewEventForm = () => {
  const contentTarget = document.getElementById('newEventFormDialog');
  contentTarget.innerHTML = '';
  contentTarget.innerHTML = render();
  contentTarget.showModal();
  document
    .getElementById('new-event-form__close')
    .addEventListener('click', () => {
      let eventName = document.querySelector('#newEventName').value;
      let eventDate = document.querySelector('#newEventDate').value;
      let eventLocation = document.querySelector('#newEventLocation').value;
      let eventUser = parseInt(sessionStorage.getItem('activeUser'));
      contentTarget.close();
      eventName = '';
      eventDate = null;
      eventLocation = '';
      eventUser = '';
    });
};

const render = () => {
  return `
  <div class="new-event-form">
    <div class="new-event-form__top-row">
      <h1 class="new-event-form__title text-center">Create a New Event</h1>
      <i class="btn fas fa-window-close fa-2x"id="new-event-form__close"></i>
    </div>
    <div class="new-event-form__form">
      <div class="new-event-form__form-group">
        <label for="newEventDate">Date: </label>  
        <input id="newEventDate" type="date">
      </div>
      <div class="new-event-form__form-group">
        <label for="newEventName">Name: </label>  
        <input id="newEventName" type="text" autocomplete="off">
      </div>
      <div class="new-event-form__form-group">
        <label for="newEventLocation">Location: </label>  
        <input id="newEventLocation" type="text" autocomplete="off">
      </div>
      <div class="new-event-form__form-group">      
          <button id="saveNewEvent">Save New Event</button>
      </div>
    </div>
  </div>
  `;
};

eventHub.addEventListener('click', (e) => {
  if (e.target.id === 'saveNewEvent') {
    const contentTarget = document.getElementById('newEventFormDialog');
    let eventName = document.querySelector('#newEventName').value;
    let eventDate = document.querySelector('#newEventDate').value;
    let eventLocation = document.querySelector('#newEventLocation').value;
    let eventUser = parseInt(sessionStorage.getItem('activeUser'));

    if (eventName && eventDate && eventLocation !== '') {
      const newEvent = {
        userId: eventUser,
        name: eventName,
        date: eventDate,
        location: eventLocation,
      };

      saveEvent(newEvent);
      eventName = '';
      eventDate = '';
      eventLocation = '';
      eventUser = '';
      contentTarget.close();
    } else {
      window.alert('Please fill in all fields');
    }
  }
});
