let friendRequests = [];

const eventHub = document.querySelector('.container');
const dispatchStateChangeEvent = () => {
  const requestChangeEvent = new CustomEvent('friendRequestsStateChanged');
  eventHub.dispatchEvent(requestChangeEvent);
};

export const getFriendRequests = () => {
  return fetch('http://localhost:8088/friendRequests')
    .then((res) => res.json())
    .then((parsed) => {
      friendRequests = parsed;
    });
};

export const useFriendRequests = () => friendRequests.slice();

export const saveFriendRequest = (request) => {
  return fetch('http://localhost:8088/friendRequests', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  })
    .then(getFriendRequests)
    .then(dispatchStateChangeEvent);
};
