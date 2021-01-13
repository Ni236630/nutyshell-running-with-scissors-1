const contentTarget = document.getElementById('newEventFormDialog')

export const NewEventForm = () => {
  contentTarget.innerHTML = '';
  contentTarget.innerHTML = render();

}

const render = () => {
  return `
  <div class="new-event-form">
    <div class="new-event-form__form">
      <label for="newEventName">Name: </label>  
      <input id="newEventName" type="text">
      <label for="newEventDate">Name: </label>  
      <input id="newEventDate" type="date">
      <label for="newEventLocation">Location: </label>  
      <input id="newEventLocation" type="text">
      <button id="saveNewEvent">Save New Event</button>
    </div>
  </div>
  `
}
