// author: Aaron Resch
// purpose: handles friend request functionality, lists active friend requests and allows users to interact with them

import { useUsers } from '../users/userDataProvider.js';
import { saveFriend } from './friendDataProvider.js';
import {
  deleteFriendRequest,
  editFriendRequest,
  useFriendRequests,
} from './friendRequestDataProvider.js';

const eventHub = document.querySelector('.container');

export const FriendRequests = () => {
  const requests = useFriendRequests();
  const users = useUsers();
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));

  const thisUserRequests = requests.filter(
    (req) => req.recipientId === activeUserId && req.isAccepted === false
  );

  if (thisUserRequests.length > 0) {
    return thisUserRequests
      .map((req) => {
        const requestor = users.find((u) => u.id === req.senderId);

        return `
      <div class="friend-request">
        <p>${requestor.username} wants to be your friend!</p>
        <div class="friend-request__buttons">
          <button id="acceptRequest--${req.id}">Accept</button>
          <button id="denyRequest--${req.id}">Deny</button>
        </div>
      </div>
      `;
      })
      .join('');
  } else {
    return 'No friend requests found.';
  }
};

eventHub.addEventListener('click', (e) => {
  if (!e.target.id.startsWith('acceptRequest--')) {
    return;
  } else {
    const [unused, requestId] = e.target.id.split('--');

    const customEvent = new CustomEvent('acceptedRequest', {
      detail: {
        requestId: requestId,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});

eventHub.addEventListener('acceptedRequest', (e) => {
  const requests = useFriendRequests();
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));

  const thisRequestObject = requests.find(
    (req) => req.id === parseInt(e.detail.requestId)
  );

  const newFriendObject1 = {
    userId: activeUserId,
    friendId: thisRequestObject.senderId,
  };

  const newFriendObject2 = {
    userId: thisRequestObject.senderId,
    friendId: activeUserId,
  };
  thisRequestObject.isAccepted = true;

  saveFriend(newFriendObject1).then(() => {
    saveFriend(newFriendObject2).then(() => {
      editFriendRequest(thisRequestObject);
      eventHub.dispatchEvent(new CustomEvent('eventsStateChanged'));
      eventHub.dispatchEvent(new CustomEvent('articlesStateChanged'));
    });
  });
});

eventHub.addEventListener('click', (e) => {
  if (!e.target.id.startsWith('denyRequest--')) {
    return;
  } else {
    const [unused, requestId] = e.target.id.split('--');

    const customEvent = new CustomEvent('deniedRequest', {
      detail: {
        requestId: requestId,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});

eventHub.addEventListener('deniedRequest', (e) => {
  deleteFriendRequest(parseInt(e.detail.requestId));
});
