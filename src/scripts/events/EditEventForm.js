// Ryan DeVault - Purpose: listens for the edit button within 
// an event to be pressed and presents the user with a modal when it is

// Imports
import { editEvent } from './eventProvider.js';

// Selectors
const eventHub = document.querySelector(".container");

// Variables
let eventId = '';
let oldName = '';
let oldLocation = '';

// When the user presses the edit icon in any event they saved, display the diglog box
eventHub.addEventListener("editEvent", event => {
    // Store the eventId to get the DOM element and also for saving the edit later
    eventId = event.detail.eventId[2];
  
    // Store the DOM element of the event to be edited
    let oldEvent = document.getElementById(`event-card--${eventId}`);
    
    // Save the information from the old event
    const rawName = oldEvent.childNodes[1].innerHTML;
    oldName = rawName.slice(7);

    const rawLocation = oldEvent.childNodes[5].innerHTML;
    oldLocation = rawLocation.slice(10);

    // Clear out the old event variable
    oldEvent = '';

    // When the user presses the "Edit Event button within an event that they saved, display a dialog box
    EditEventForm();
});

// Targets the area in the DOM where the dialog box needs to be injected and then does so.
// If the user closes out the dialog box, clear out all of the related variables
const EditEventForm = () => {
    const contentTarget = document.getElementById('editEventFormDialog');
    contentTarget.innerHTML = '';
    contentTarget.innerHTML = render();
    contentTarget.showModal();
    document
    .getElementById('edit-event-form__close')
    .addEventListener('click', () => {
        contentTarget.close();
        eventId = '';
        oldName = '';
        oldLocation = '';
    });
};

// Renders the dialog box when called
const render = () => {
    return `
    <div class="edit-event-form">
      <div class="edit-event-form__top-row">
        <h1 class="edit-event-form__title text-center">Edit Your Event</h1>
        <i class="btn fas fa-window-close fa-2x" id="edit-event-form__close"></i>
      </div>
      <div class="edit-event-form__form">
        <div class="edit-event-form__form-group">
          <label for="editEventDate">Date: </label>  
          <input id="editEventDate" type="date">
        </div>
        <div class="edit-event-form__form-group">
          <label for="editEventName">Name: </label>  
          <input id="editEventName" type="text" autocomplete="off" value="${oldName}">
        </div>
        <div class="edit-event-form__form-group">
          <label for="editEventLocation">Location: </label>  
          <input id="editEventLocation" type="text" autocomplete="off" value="${oldLocation}">
        </div>
        <div class="edit-event-form__form-group">      
            <button id="saveEditEvent">Save Event</button>
        </div>
      </div>
    </div>
    `;
  };

// When the user clicks the save button inside the dialog box, save the data inside as a new event. 
// If all fields are not filled out, display an alert
eventHub.addEventListener('click', (e) => {
  if (e.target.id === 'saveEditEvent') {
    const contentTarget = document.getElementById('editEventFormDialog');
    let eventName = document.querySelector('#editEventName').value;
    let eventDate = document.querySelector('#editEventDate').value;
    let eventLocation = document.querySelector('#editEventLocation').value;
    let eventUser = parseInt(sessionStorage.getItem('activeUser'));

    if (eventName && eventDate && eventLocation !== '') {
      const newEvent = {
        id: eventId,
        userId: eventUser,
        name: eventName,
        date: eventDate,
        location: eventLocation,
      };

      editEvent(newEvent);
      eventId = '';
      eventName = '';
      eventDate = '';
      eventLocation = '';
      eventUser = '';
      contentTarget.close();
    } else {
      window.alert('Please fill in all fields');
    };
  };
});