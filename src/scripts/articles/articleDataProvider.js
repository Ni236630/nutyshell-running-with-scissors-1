// Ryan DeVault - Purpose: Retrieve, save and/or delete articles information from the database.json file within the api folder

// Local Variables
let articles = [];

// Selectors
const eventHub = document.querySelector('.container');

// Event Dispatcher
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

// Saves new articles to the API
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

// Deletes articles from the API
export const deleteArticle = articleId => {
    return fetch(`http://localhost:8088/articles/${articleId}`,{
        method: "DELETE"
    })
    .then(getArticles);
};