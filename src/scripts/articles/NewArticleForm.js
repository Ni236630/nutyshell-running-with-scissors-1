// Ryan DeVault - Purpose: listens for the new button within an article to be pressed and presents the user with a modal when it is

// Selectors
const eventHub = document.querySelector(".container");

eventHub.addEventListener("addArticle", event => {
    console.log("I heard someone wants to add a new article", event.detail)
})