// author: Aaron Resch
// purpose: list Friend cards in dashboard, allow users to search for friends to add, allow users to delete friends
import { useUsers } from '../users/userDataProvider.js';
import { useFriends } from './friendDataProvider.js';
import { Friend } from './Friend.js';

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
    <div class="friend-list__requests"></div>
    <div class="friend-list__add"></div>
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
