// Ryan DeVault - Purpose: Retrieve, save and/or delete articles 
// information from the database.json file within the api folder

// Local Variables
let articles = [];

// Selectors
const eventHub = document.querySelector('.container');

// Event Dispatcher (Called when saveFriend or deleteFriend is called)
const dispatchStateChangeEvent = () => {
    const articlesStateChangedEvent = new CustomEvent('articlesStateChanged');
    eventHub.dispatchEvent(articlesStateChangedEvent);
};

// GETs articles from database.json and stores them in the local articles variable
export const getArticles = () => {
    return fetch("http://localhost:8088/articles")
        .then(response => response.json())
        .then(parsedArticles => articles = parsedArticles);
};

// Returns a copy of the array in the articles variable
export const useArticles = () => articles.slice();

// Saves a new article to the API
export const saveArticle = article => {
    return fetch('http://localhost:8088/articles', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
    })
    .then(getArticles)
    .then(dispatchStateChangeEvent);
};

export const editArticle = article => {
    return fetch(`http://localhost:8088/articles/${article.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(article)
    })
    .then(getArticles)
    .then(dispatchStateChangeEvent);
};

// Deletes an article from the API
export const deleteArticle = articleId => {
    return fetch(`http://localhost:8088/articles/${articleId}`,{
        method: "DELETE"
    })
    .then(getArticles)
    .then(dispatchStateChangeEvent);
};