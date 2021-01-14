import { getUsers, useUsers } from './users/userDataProvider.js';
import { getArticles } from './articles/articleDataProvider.js';
import { getEvents } from './events/eventProvider.js';
import { getTasks } from './tasks/taskDataProvider.js';
import { getUserMessages } from './messages/userMessagesDataProvider.js';
import { getMessages } from './messages/messagesDataProvider.js';
import { getFriends } from './friends/friendDataProvider.js';
import { LoginForm } from './auth/LoginForm.js';
import { RegisterForm } from './auth/RegisterForm.js';
import { weatherList, getLocation } from './weather/weatherList.js';
import { EventList } from './events/EventList.js';
import { FriendList } from './friends/FriendList.js';
import { taskList } from './tasks/taskList.js';

import { ArticleList } from './articles/ArticleList.js';

const eventHub = document.querySelector('.container');
const contentTarget = document.querySelector('.dashboard');

const promises = [
  getUsers(),
  getArticles(),
  getEvents(),
  getTasks(),
  getMessages(),
  getFriends(),
  getUserMessages(),
];

// logout button event handler
eventHub.addEventListener('click', (e) => {
  if (e.target.id === 'logout') {
    sessionStorage.clear();
    contentTarget.innerHTML = '';
    LoginForm();
    RegisterForm();
  }
});

export const Nutshell = () => {
  getLocation();
  Promise.all(promises).then(render);
};

const CurrentUser = () => {
  const activeUserId = parseInt(sessionStorage.getItem('activeUser'));
  const users = useUsers();
  const name = users.find((u) => u.id === activeUserId);
  return name.username;
};

const render = () => {
  // Render all your UI components here
  contentTarget.innerHTML = `
    <article class="top-row">
      <div class="top-row__current-user">Current User: <b>${CurrentUser()}</b></div>
      <div class="top-row__current-weather">
        <h1>CURRENT WEATHER</h1>  
      </div>
      <div class="top-row__logout-button"><button id="logout">Log Out</button></div>
    </article>
    <main>
      <aside class="friend-list">
        <h1>FRIEND LIST</h1>
        ${FriendList()}
      </aside>
      <article>
        <section class="event-list">
          ${EventList()}
        </section>
        <section class="message-list">
          <h1>MESSAGE LIST</h1>
          <!-- MessageList() -->    
        </section>
        <section class="task-list">
          <h1>TASK LIST</h1>
          <!-- TaskList() --> 
          ${taskList()}   
        </section>
        <section class="article-list">
          ${ArticleList()}   
        </section>
      </article>
    </main>
    `;
};

eventHub.addEventListener('eventsStateChanged', () => {
  document.querySelector('.event-list').innerHTML = EventList();
});
// Listen for a state change in articles
eventHub.addEventListener(
  'articlesStateChanged',
  (event) => (document.querySelector('.article-list').innerHTML = ArticleList())
);

eventHub.addEventListener('friendsStateChanged', () => {
  document.querySelector('.friend-list').innerHTML = FriendList();
});
