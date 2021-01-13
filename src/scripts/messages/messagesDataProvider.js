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
