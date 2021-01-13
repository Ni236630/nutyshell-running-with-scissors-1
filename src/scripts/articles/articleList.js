// Ryan DeVault - Purpose: list the articles saved by the current user and also by the current user's friends 

// Imports
import { getArticles, useArticles} from "./articleDataProvider.js";
import { getFriends, useFriends } from "../friends/friendDataProvider.js";
import { articleConverter } from "./Article.js";

// Selectors
const articleLocation = document.querySelector('.article-list');

// local variables
let allArticles = [];
let allRelationships = [];
let currentUser = "";

export const articleList = () => {
    getArticles()
    .then(getFriends)
    .then(() => {
        // Stores all of the articles and relationships(friends) from the database.json file
        allArticles = useArticles();
        allRelationships = useFriends();

        // Stores the userId of the current user and converts its type to integer
        currentUser = parseInt(sessionStorage.getItem('activeUser')); 

        // ------------------- CURRENT USER ARTICLE(S) -------------------
        // Saves articles that belong to the current user
        let userArticles = allArticles.filter(article => 
            article.userId === currentUser);

        // ---------------------- FRIENDS' ARTICLES ----------------------
        // Stores the relationship objects from the friends Table that have the current user's Id as the userId
        let userFriends = allRelationships.filter(relationship => 
            relationship.userId === currentUser);

        // Saves articles that belong to the current user's friends
        let friendArticles = allArticles.filter(article => 
            userFriends.find(relationship => 
                relationship.friendId === article.userId));
    })
}