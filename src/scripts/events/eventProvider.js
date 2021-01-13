// Component Author: Ryan Youngblood
// Purpose: Data providers for user events.

let events = [] // Initialize the events array

// Dispatch event to update the DOM when changes are mode
const dispatchStateChangeEvent = () => {
    const eventStateChangedEvent = new CustomEvent("eventStateChanged")
    eventHub.dispatchEvent(eventStateChangedEvent)
}

// Get a slice of the events array to use elsewhere
export const useEvents = () => events.slice()

// Grab the events from our database
export const getEvents = () => {
    return fetch('http://localhost:8088/events')
        .then(response => response.json())
        .then(parsedEvents => {
            events = parsedEvents
        })
}

// Save the new event to our database
export const saveEvent = newEvent => {
    return fetch('http://localhost:8088/events', {
        method: "POST", //POST is used to post new data
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newEvent) //Take the object passed in to saveEvent and convert it to JSON via the JSON.stringify method.
    })
    .then(getEvents) // Get the updated state to match the application state
    .then(dispatchStateChangeEvent) // Dispatch a change event
}

// Delete the event from our database
export const deleteEvent = eventId => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
        method: "DELETE"
    })
        .then(getEvents)
        .then(dispatchStateChangeEvent)
}

// Edit the event in our database
export const editEvent = eventToEdit => {
    return fetch(`http://localhost:8088/entries/${eventToEdit.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventToEdit)
    })
        .then(getEvents)
        .then(dispatchStateChangeEvent)
}