// Component Author: Aaron Resch
// Purpose: Data provider for user/messages join table

const eventHub = document.querySelector('.container');
const activeUserId = parseInt(sessionStorage.getItem('activeUser'));

let userMessages = [];

const dispatchStateChangeEvent = () => {
  eventHub.dispatchEvent(new CustomEvent('userMessagesStateChanged'));
};

export const getUserMessages = () => {
  return fetch('http://localhost:8088/userMessages')
    .then((res) => res.json())
    .then((parsed) => {
      userMessages = parsed;
    });
};

export const useUserMessages = () => userMessages.slice();

export const saveUserMessage = (recipientId, messageId) => {
  return fetch('http://localhost:8088/userMessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: activeUserId,
      recipientId: recipientId,
      messageId: messageId,
    }),
  })
    .then(getUserMessages)
    .then(dispatchStateChangeEvent);
};
