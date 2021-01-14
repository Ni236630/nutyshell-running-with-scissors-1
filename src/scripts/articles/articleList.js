// Ryan DeVault - Purpose: list the articles saved by the current user and also by the current user's friends.
// Also, listen for the add, edit or delete buttons for the articles to be pressed

// Imports
import { useArticles} from "./articleDataProvider.js";
import { useFriends } from "../friends/friendDataProvider.js";
import { useUsers } from "../users/userDataProvider.js";
import { ArticleConverter } from "./Article.js";
import "./NewArticleForm.js";
import "./EditArticleForm.js";
import "./DeleteArticleForm.js";


// Local Variables
let allArticles = [];
let allRelationships = [];
let currentUser = "";
let allUsers = [];

// Selectors
const eventHub = document.querySelector(".container");

// Event Listeners
eventHub.addEventListener('click', event => {
    const button = event.target.id.split("--")[0];
    const identity = event.target.id.split("--")[1];
    // If the user clicked on the "New Article" button, send out a custom event for that
    if(button === "newArticle"){
        const addArticle = new CustomEvent("addArticle", {
            detail: {
                userId: identity
            }
        });
        eventHub.dispatchEvent(addArticle);

        // If the user clicked on the "Edit Article" button, send out a custom event for that
    } else if(button === "editArticle"){
        const editArticle = new CustomEvent("editArticle", {
            detail: {
                articleId: identity
            }
        });
        eventHub.dispatchEvent(editArticle);
    } else if(button === "deleteArticle"){
        const deleteArticle = new CustomEvent("deleteArticle", {
            detail: {
                articleId: identity
            }
        });
        eventHub.dispatchEvent(deleteArticle);
    };
});

// Main Function
export const ArticleList = () => {
    // Stores all of the articles and relationships(friends) from the database.json file
    allArticles = useArticles();
    allRelationships = useFriends();

    // Stores the userId of the current user and converts its type to integer
    currentUser = parseInt(sessionStorage.getItem('activeUser')); 

    // ------------------- CURRENT USER ARTICLE(S) -------------------
    // Saves articles that belong to the current user
    let userArticlesRaw = allArticles.filter(article => 
        article.userId === currentUser);

    // Attach isFriend property on each article and set to false
    let userArticlesFinal = userArticlesRaw.map(article => {
        article.isFriend = false;
        return article;
    });

    // ---------------------- FRIENDS' ARTICLES ----------------------
    // Stores the relationship objects from the friends Table that have the current user's Id as the userId
    let userFriends = allRelationships.filter(relationship => 
        relationship.userId === currentUser);

    // Saves articles that belong to the current user's friends
    let friendsArticlesRaw = allArticles.filter(article => 
        userFriends.find(relationship => 
            relationship.friendId === article.userId));

    // Attach isFriend property on each article and set to true, then add the user's name
    allUsers = useUsers();
    let friendsArticlesFinal = friendsArticlesRaw.map(article => {
        article.isFriend = true;
        article.friendObject = allUsers.find(user => user.id === article.userId);
        return article;
    });

    // -------------------- ALL RELEVANT ARTICLES --------------------
    // Combine the user's articles with the articles that their friend(s) saved.
    let relevantArticles = [...userArticlesFinal, ...friendsArticlesFinal];

    // ---------------- HTML CONVERSION & TRANSMISSION ----------------
    return `
    <div class="article-list__top-row">
        <button id="newArticle--${currentUser}">New Article</button>
    </div>
    <dialog id="newArticleFormDialog"></dialog>
    <div class="article-list__articles">
        ${relevantArticles.map(article => ArticleConverter(article)).join("")}
    </div>
    `;
};