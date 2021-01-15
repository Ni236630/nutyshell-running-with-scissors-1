// author: Aaron Resch
// purpose: html representation of each user search result, including add friend button

const eventHub = document.querySelector('.container');

export const SearchResult = (user) => {
  return `
  <div class="search-result">
    <div class="friend-card__info text-center">
      <p><strong>Username: </strong>${user.username}</p>
      <p><strong>Email: </strong>${user.email}</p>
    </div>
    <div class="friend-card__button-container text-center">
      <button id="addFriend--${user.id}">Send Friend Request</button>
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
