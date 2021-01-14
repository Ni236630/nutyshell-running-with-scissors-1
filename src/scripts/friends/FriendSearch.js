import { useUsers } from '../users/userDataProvider.js';
import { useFriends } from './friendDataProvider.js';
import { SearchResult } from './SearchResult.js';

const eventHub = document.querySelector('.container');

export const FriendSearch = () => {
  return `<input type="search" placeholder="Search by username..." autocomplete="off" id="friendSearch">
  <div id="searchResults"></div>`;
};

eventHub.addEventListener('keyup', (e) => {
  if (e.target.id !== 'friendSearch') {
    return;
  } else {
    const searchBar = document.querySelector('#friendSearch');
    const resultsContainer = document.querySelector('#searchResults');
    const users = useUsers();
    const friends = useFriends();
    const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
    let searchResults = [];
    let searchInput = searchBar.value;

    if (searchInput !== '') {
      searchResults = users.filter((u) => u.username.includes(searchInput));

      if (searchResults.length > 0) {
        resultsContainer.innerHTML = searchResults
          .map((result) => SearchResult(result))
          .join('');
      } else {
        resultsContainer.innerHTML = `<p>No Results Found.</p>`;
      }
    }
  }
});

eventHub.addEventListener('input', (e) => {
  if (e.target.id !== 'friendSearch') {
    return;
  } else {
    if (e.target.value === '') {
      const resultsContainer = document.querySelector('#searchResults');
      resultsContainer.innerHTML = '';
    }
  }
});
