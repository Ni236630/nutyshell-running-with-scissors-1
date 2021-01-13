const eventHub = document.querySelector('.container');

const promises = [];

export const Nutshell = () => {
    // Render all your UI components here
    eventHub.innerHTML = `<h1>Nutshell</h1>`
}

const newArticle = {
    useId: 1,
    url: "https://www.sciencenews.org/",
    title: "Mice may catch each other's pain.",
    synopsis: "Yo, these mice can feel each others pain, obviously."
};
import { getArticles, useArticles, saveArticle, deleteArticle } from "./articles/articleDataProvider.js";
saveArticle(newArticle)
.then(getArticles)
.then(() => {
    let articles = useArticles();
    console.log("articles",articles)
    const lastArticle = articles.length
    deleteArticle(lastArticle)
})