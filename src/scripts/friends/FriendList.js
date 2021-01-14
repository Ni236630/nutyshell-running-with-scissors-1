// author: Aaron Resch
// purpose: list Friend cards in dashboard, allow users to search for friends to add, allow users to delete friends
import { useUsers } from '../users/userDataProvider.js';
import { useFriends, saveFriend } from './friendDataProvider.js';
import { Friend } from './Friend.js';
import { FriendSearch } from './FriendSearch.js';

const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.friend-list');

export const FriendList = () => {
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const friendRels = useFriends();
  const users = useUsers();

  const thisUserFriendRels = friendRels.filter(
    (rel) => rel.userId === activeUserId
  );

  const thisUserFriends = thisUserFriendRels.map((rel) => {
    return users.find((u) => rel.friendId === u.id);
  });

  return `
  <section class="friend-list__content">
    <div class="friend-list__requests">${FriendRequests()}</div>
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
  } else {
    const newFriendObject = {
      userId: activeUserId,
      friendId: friendIdToAdd,
    };

    saveFriend(newFriendObject);
  }
});
