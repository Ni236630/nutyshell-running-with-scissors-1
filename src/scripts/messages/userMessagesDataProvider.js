// Component Author: Aaron Resch, Ryan Youngblood
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

export const saveUserMessage = (userMessage) => {
  return fetch('http://localhost:8088/userMessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // Refactored this to accomodate the object I need to pass in - Ryan Y.
    body: JSON.stringify(userMessage),
  })
    .then(getUserMessages)
    .then(dispatchStateChangeEvent);
};

export const deleteUserMessage = (userMessageId) => {
  return fetch(`http://localhost:8088/userMessages/${userMessageId}`, {
    method: "DELETE"
  })
    .then(getUserMessages)
    .then(dispatchStateChangeEvent)
}