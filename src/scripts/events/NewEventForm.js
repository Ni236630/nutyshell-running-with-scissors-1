import { saveEvent } from './eventProvider.js';

const eventHub = document.querySelector('.container');

export const NewEventForm = () => {
  const contentTarget = document.getElementById('newEventFormDialog');
  contentTarget.innerHTML = '';
  contentTarget.innerHTML = render();
  contentTarget.showModal();
};

const render = () => {
  return `
  <div class="new-event-form">
  <div class="new-event-form__form">
  <label for="newEventName">Name: </label>  
  <input id="newEventName" type="text" autocomplete="off">
  <label for="newEventDate">Date: </label>  
  <input id="newEventDate" type="date">
  <label for="newEventLocation">Location: </label>  
  <input id="newEventLocation" type="text" autocomplete="off">
  <button id="saveNewEvent">Save New Event</button>
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
