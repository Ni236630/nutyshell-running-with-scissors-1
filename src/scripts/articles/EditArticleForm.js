// Ryan DeVault - Purpose: listens for the edit button within an article to be pressed and presents the user with a modal when it is

// Selectors
const eventHub = document.querySelector(".container");

eventHub.addEventListener("editArticle", event => {
    console.log("I heard someone wants to edit an article", event.detail)
})