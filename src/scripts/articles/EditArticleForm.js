// Ryan DeVault - Purpose: listens for the edit button within 
// an article to be pressed and presents the user with a modal when it is

// Imports
import { editArticle } from './articleDataProvider.js';

// Selectors
const eventHub = document.querySelector(".container");

// Variables
let articleId = '';
let oldTitle = '';
let oldUrl = '';
let oldSynopsis = '';

// When the user presses the "New Article button at the top of the articles list, display the diglog box
eventHub.addEventListener("editArticle", event => {
    // Store the articleId to get the DOM element and also for saving the edit later
    articleId = event.detail.articleId
    
    // Store the DOM element of the article to be edited
    let oldArticle = document.getElementById(`article-card--${articleId}`).childNodes;
    
    // Save the information from the old article
    oldTitle = oldArticle[1].innerHTML.b;
    oldUrl = oldArticle[3].childNodes[0].href;
    oldSynopsis = oldArticle[5].innerHTML;
    console.log(oldArticle[1])
    // Clear out the old article variable
    oldArticle = '';

    // When the user presses the "Edit Article button within an article that they saved, display a dialog box
    EditArticleForm();
});

// Targets the area in the DOM where the dialog box needs to be injected and then does so.
// If the user closes out the dialog box, clear out all of the related variables
const EditArticleForm = () => {
    const contentTarget = document.getElementById('editArticleFormDialog');
    contentTarget.innerHTML = '';
    contentTarget.innerHTML = render();
    contentTarget.showModal();
    document
    .getElementById('edit-article-form__close')
    .addEventListener('click', () => {
        contentTarget.close();
        articleId = '';
        oldTitle = '';
        oldUrl = '';
        oldSynopsis = '';
    });
};

// Renders the dialog box when called
const render = () => {
    return `
        <div class="edit-article-form">
            <div class="edit-article-form__top-row">
                <h1 class="edit-article-form__title">Edit Your Article</h1>
                <button id="edit-article-form__close">Close Form</button>
            </div>
            <div class="edit-article-form__form">
                <div class="edit-article-form__form-group">
                    <label for="editArticleTitle">Title: </label>  
                    <input id="editArticleTitle" type="text" autocomplete="off" value="${oldTitle}">
                </div>
                <div class="edit-article-form__form-group">
                    <label for="editArticleUrl">Url: </label>  
                    <input id="editArticleUrl" type="text" autocomplete="off" value="${oldUrl}">
                </div>
                <div class="edit-article-form__form-group">
                    <label for="editArticleSynopsis">Synopsis: </label>  
                    <textarea id="editArticleSynopsis" rows="5" cols="33">${oldSynopsis}</textarea>
                </div>
                <div class="edit-article-form__form-group">      
                    <button id="saveEditedArticle">Save Article</button>
                </div>
            </div>
        </div>
    `;
};

// When the user clicks the save button inside the dialog box, save the data inside as a new article. 
// If all fields are not filled out, display an alert
eventHub.addEventListener('click', (e) => {
  if (e.target.id === 'saveEditedArticle') {
    const contentTarget = document.getElementById('editArticleFormDialog');
    let articleTitle = document.querySelector('#editArticleTitle').value;
    let articleUrl = document.querySelector('#editArticleUrl').value;
    let articleSynopsis = document.querySelector('#editArticleSynopsis').value;
    let articleUser = parseInt(sessionStorage.getItem('activeUser'));

    if (articleTitle && articleUrl && articleSynopsis !== '') {
      const newArticle = {
        id: articleId,
        userId: articleUser,
        title: articleTitle,
        url: articleUrl,
        synopsis: articleSynopsis,
        timestamp: new Date()
      };

      editArticle(newArticle);
      articleId = '';
      articleTitle = '';
      articleUrl = '';
      articleSynopsis = '';
      articleUser = '';
      contentTarget.close();
    } else {
      window.alert('Please fill in all fields');
    };
  };
});