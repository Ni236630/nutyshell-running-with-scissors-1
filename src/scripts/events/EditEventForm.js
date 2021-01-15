// Ryan DeVault - Purpose: listens for the edit button within 
// an event to be pressed and presents the user with a modal when it is

// Imports
import { editEvent } from './eventDataProvider.js';

// Selectors
const eventHub = document.querySelector(".container");

// Variables
let eventId = '';
let oldName = '';
let oldDate = '';
let oldLocation = '';

// When the user presses the edit icon in any event they saved, display the diglog box
eventHub.addEventListener("editEvent", event => {
    // Store the articleId to get the DOM element and also for saving the edit later
    eventId = event.detail.eventId
    
    // Store the DOM element of the article to be edited
    let oldEvent = document.getElementById(`event-card--${articleId}`).childNodes;
    console.log(oldEvent)
    // Save the information from the old article
    oldName = oldEvent[1].innerHTML;
    oldDate = oldEvent[3].childNodes[0];
    oldLocation = oldEvent[5].innerHTML;
    
    // Clear out the old article variable
    oldEvent = '';

    // When the user presses the "Edit Article button within an article that they saved, display a dialog box
    //EditEventForm();
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
        oldDate = '';
        oldLocation = '';
    });
};

// Renders the dialog box when called
const render = () => {
    return `
    <div class="edit-event-form">
      <div class="edit-event-form__top-row">
        <h1 class="edit-event-form__title text-center">Create a Edit Event</h1>
        <button id="edit-event-form__close">Close Form</button>
      </div>
      <div class="edit-event-form__form">
        <div class="edit-event-form__form-group">
          <label for="editEventDate">Date: </label>  
          <input id="editEventDate" type="date" value="${oldDate}">
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

// When the user clicks the save button inside the dialog box, save the data inside as a new article. 
// If all fields are not filled out, display an alert
eventHub.addEventListener('click', (e) => {
  if (e.target.id === 'saveEditedEvent') {
    const contentTarget = document.getElementById('editEventFormDialog');
    let eventName = document.querySelector('#editEventName').value;
    let eventDate = document.querySelector('#editEventDate').value;
    let eventLocation = document.querySelector('#editEventLocation').value;
    let articleUser = parseInt(sessionStorage.getItem('activeUser'));

    if (articleTitle && articleUrl && articleSynopsis !== '') {
      const newArticle = {
        id: articleId,
        userId: articleUser,
        title: articleTitle,
        url: articleUrl,
        synopsis: articleSynopsis,
        timestamp: new Date()
      };

      editArticle(newArticle);
      articleId = '';
      articleTitle = '';
      articleUrl = '';
      articleSynopsis = '';
      articleUser = '';
      contentTarget.close();
    } else {
      window.alert('Please fill in all fields');
    };
  };
});