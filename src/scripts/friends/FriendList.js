// author: Aaron Resch
// purpose: list Friend cards in dashboard, allow users to search for friends to add, allow users to delete friends
import { useUsers } from '../users/userDataProvider.js';
import { useFriends, saveFriend, deleteFriend } from './friendDataProvider.js';
import { Friend } from './Friend.js';
import { FriendSearch } from './FriendSearch.js';
import { FriendRequests } from './FriendRequests.js';
import { saveFriendRequest } from './friendRequestDataProvider.js';

const eventHub = document.querySelector('.container');

export const FriendList = () => {
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const friendRels = useFriends();
  const users = useUsers();

  const thisUserFriendRels = friendRels.filter(
    (rel) => rel.userId === activeUserId
  );

  if (thisUserFriendRels.length > 0) {
    const thisUserFriends = thisUserFriendRels.map((rel) => {
      return users.find((u) => rel.friendId === u.id);
    });

    return `
    <section class="friend-list__content">
      <div class="friend-list__requests">
        <h3>Active Friend Requests: </h3>
        <div id="friendRequests">${FriendRequests()}</div>
      </div>
      <div class="friend-list__add">
        <h3>Search for a Friend</h3>
        <div class="friend-list__search-container">${FriendSearch()}</div>
      </div>
      <div class="friend-list__friends">
        <h3>Your Friends</h3>
        <div class="friend-list__list">${render(thisUserFriends)}</div>
      </div>
    </section>
    `;
  } else {
    return `<section class="friend-list__content">
    <div class="friend-list__requests">
      <h3>Active Friend Requests: </h3>
      <div id="friendRequests">${FriendRequests()}</div>
    </div>
    <div class="friend-list__add">
      <h3>Search for a Friend</h3>
      <div class="friend-list__search-container">${FriendSearch()}</div>
    </div>
    <div class="friend-list__friends">
        <h3>Your Friends</h3>
        <div class="friend-list__list"><h2>YOU HAVE NO FRIENDS.</h2></div>
        </div>
      </section>
    `;
  }
};

const render = (userArray) => {
  return userArray
    .sort((a, b) => a.username.localeCompare(b.username))
    .map((u) => Friend(u))
    .join('');
};

eventHub.addEventListener('addFriendClicked', (e) => {
  const friendIdToAdd = parseInt(e.detail.friendIdToAdd);
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const friendRels = useFriends();
  const users = useUsers();

  const thisUserFriends = friendRels.filter(
    (rel) => rel.userId === activeUserId
  );

  const alreadyFriends = thisUserFriends.filter(
    (rel) => rel.friendId === friendIdToAdd
  );

  if (alreadyFriends.length > 0) {
    window.alert("You're already friends!");
  } else if (friendIdToAdd === activeUserId){
    window.alert("You can't be friends with yourself!")
  } else {
    const newFriendRequestObject = {
      senderId: activeUserId,
      recipientId: friendIdToAdd,
      isAccepted: false,
    };

    saveFriendRequest(newFriendRequestObject);
  }
});

eventHub.addEventListener('friendRequestsStateChanged', () => {
  document.getElementById('friendRequests').innerHTML = FriendRequests();
});

eventHub.addEventListener('removeFriendClicked', (e) => {
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const friendIdToRemove = parseInt(e.detail.userToRemove);
  const friendRels = useFriends();

  const friendRel1 = friendRels.find(
    (rel) => rel.userId === activeUserId && rel.friendId === friendIdToRemove
  );

  const friendRel2 = friendRels.find(
    (rel) => rel.userId === friendIdToRemove && rel.friendId === activeUserId
  );

  deleteFriend(friendRel1.id);
  deleteFriend(friendRel2.id);  
});
