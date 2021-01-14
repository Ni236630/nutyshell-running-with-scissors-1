// Ryan DeVault - Purpose: listens for the new button within 
// an article to be pressed and presents the user with a modal when it is

// Imports
import { saveArticle } from './articleDataProvider.js';

// Selectors
const eventHub = document.querySelector(".container");

eventHub.addEventListener("addArticle", event => {
    console.log("I heard someone wants to add a new article for user #:", event.detail.userId)
    NewArticleForm();
});

const NewArticleForm = () => {
    const contentTarget = document.getElementById('newArticleFormDialog');
    contentTarget.innerHTML = '';
    contentTarget.innerHTML = render();
    contentTarget.showModal();
    document
    .getElementById('new-article-form__close')
    .addEventListener('click', () => {
        let articleTitle = document.querySelector('#newArticleTitle').value;
        let articleUrl = document.querySelector('#newArticleUrl').value;
        let articleSynopsis = document.querySelector('#newArticleSynopsis').value;
        let articleUser = parseInt(sessionStorage.getItem('activeUser'));
        contentTarget.close();
        articleTitle = '';
        articleUrl = '';
        articleSynopsis = '';
        articleUser = '';
    });
};

const render = () => {
    return `
        <div class="new-article-form">
            <div class="new-article-form__top-row">
                <h1 class="new-article-form__title">Create a New Article</h1>
                <button id="new-article-form__close">Close Form</button>
            </div>
            <div class="new-article-form__form">
                <div class="new-article-form__form-group">
                    <label for="newArticleTitle">Title: </label>  
                    <input id="newArticleTitle" type="text" autocomplete="off">
                </div>
                <div class="new-article-form__form-group">
                    <label for="newArticleUrl">Url: </label>  
                    <input id="newArticleUrl" type="text" autocomplete="off">
                </div>
                <div class="new-article-form__form-group">
                    <label for="newArticleSynopsis">Synopsis: </label>  
                    <textarea id="newArticleSynopsis" rows="5" cols="33"></textarea>
                </div>
                <div class="new-article-form__form-group">      
                    <button id="saveNewArticle">Save New Article</button>
                </div>
            </div>
        </div>
    `;
};

eventHub.addEventListener('click', (e) => {
  if (e.target.id === 'saveNewArticle') {
    const contentTarget = document.getElementById('newArticleFormDialog');
    let articleTitle = document.querySelector('#newArticleTitle').value;
    let articleUrl = document.querySelector('#newArticleUrl').value;
    let articleSynopsis = document.querySelector('#newArticleSynopsis').value;
    let articleUser = parseInt(sessionStorage.getItem('activeUser'));

    if (articleTitle && articleUrl && articleSynopsis !== '') {
      const newArticle = {
        userId: articleUser,
        title: articleTitle,
        url: articleUrl,
        synopsis: articleSynopsis
      };

      saveArticle(newArticle);
      articleTitle = '';
      articleUrl = '';
      articleSynopsis = '';
      articleUser = '';
      contentTarget.close();
    } else {
      window.alert('Please fill in all fields');
    }
  }
});
