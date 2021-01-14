// author: Aaron Resch
// purpose: HTML representation of friend cards to be shown in FriendsList
const eventHub = document.querySelector('.container');

export const Friend = (userObject) => {
  return `
  <div class="friend-card">
    <div class="friend-card__info">
      <p><strong>Username: </strong>${userObject.username}</p>
      <p><strong>Email: </strong>${userObject.email}</p>
    </div>
    <div class="friend-card__button-container">
      <button id="removeFriend--${userObject.id}">Remove Friend</button>
    </div>
  </div>
  `;
};

eventHub.addEventListener('click', (e) => {
  if (!e.target.id.startsWith('removeFriend--')) {
    return;
  } else {
    const [unused, userToRemove] = e.target.id.split('--');
    const customEvent = new CustomEvent('removeFriendClicked', {
      detail: {
        userToRemove,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});
