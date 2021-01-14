// Ryan DeVault - Purpose: Retrieve, save and/or delete friends information from the database.json file within the api folder

// Local Variables
let friends = [];

// Selectors
const eventHub = document.querySelector('.container');

// Event Dispatcher (Called when saveFriend or deleteFriend is called)
const dispatchStateChangeEvent = () => {
  const friendsStateChangedEvent = new CustomEvent('friendsStateChanged');
  eventHub.dispatchEvent(friendsStateChangedEvent);
  eventHub.dispatchEvent(new CustomEvent('eventsStateChanged'));
  eventHub.dispatchEvent(new CustomEvent('articlesStateChanged'));
  eventHub.dispatchEvent(new CustomEvent('messagesStateChanged'));
};

// GETs friends from database.json and stores them in the local friends variable
export const getFriends = () => {
  return fetch('http://localhost:8088/friends')
    .then((response) => response.json())
    .then((parsedFriends) => {
      friends = parsedFriends;
    });
};

// Returns a copy of the array in the friends variable
export const useFriends = () => friends.slice();

// Saves a new friend to the API
export const saveFriend = (friend) => {
  return fetch('http://localhost:8088/friends', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(friend),
  })
    .then(getFriends)
    .then(dispatchStateChangeEvent);
};

// Deletes a friend from the API
export const deleteFriend = (friendId) => {
  return fetch(`http://localhost:8088/friends/${friendId}`, {
    method: 'DELETE',
  })
    .then(getFriends)
    .then(dispatchStateChangeEvent);
};
