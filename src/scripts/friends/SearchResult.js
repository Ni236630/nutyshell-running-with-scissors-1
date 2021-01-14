const eventHub = document.querySelector('.container');

export const SearchResult = (user) => {
  return `
  <div class="search-result">
    <div class="friend-card__info">
      <p><strong>Username: </strong>${user.username}</p>
      <p><strong>Email: </strong>${user.email}</p>
    </div>
    <div class="friend-card__button-container">
      <button id="addFriend--${user.id}">Add Friend</button>
    </div>
  </div>
  `;
};

eventHub.addEventListener('click', (e) => {
  if (!e.target.id.startsWith('addFriend--')) {
    return;
  } else {
    const [unused, newFriendId] = e.target.id.split('--');

    const customEvent = new CustomEvent('addFriendClicked', {
      detail: {
        friendIdToAdd: newFriendId,
      },
    });
    eventHub.dispatchEvent(customEvent);
  }
});
