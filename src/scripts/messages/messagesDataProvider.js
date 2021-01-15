// Component Author: Aaron Resch, Ryan Youngblood
// Purpose: Data provider messages table

let messages = [];
const eventHub = document.querySelector('.container');

const dispatchStateChangeEvent = () => {
  const messageStateChangedEvent = new CustomEvent('messagesStateChanged');
  eventHub.dispatchEvent(messageStateChangedEvent);
};

export const getMessages = () => {
  return fetch('http://localhost:8088/messages')
    .then((res) => res.json())
    .then((parsed) => {
      messages = parsed;
    });
};

export const useMessages = () => messages.slice();

export const saveMessage = (message) => {
  return fetch('http://localhost:8088/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
    .then(getMessages)
    .then(dispatchStateChangeEvent);
};

// Added the ability to delete messages - Ryan Y.
export const deleteMessage = entryId => {
  return fetch(`http://localhost:8088/messages/${entryId}`, {
    method: "DELETE"
  })
    .then(getMessages)
    .then(dispatchStateChangeEvent)
}

// Added the ability to edit chat messages - Ryan Y.
export const updateMessage = entryObject => {
  return fetch(`http://localhost:8088/messages/${entryObject.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(entryObject)
  })
    .then(getMessages)
    .then(dispatchStateChangeEvent)
}