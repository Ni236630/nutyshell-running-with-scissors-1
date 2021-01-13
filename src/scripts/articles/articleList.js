// Ryan DeVault - Purpose: list the articles saved by the current user and also by the current user's friends 

// Imports
import { getArticles, useArticles} from "./articleDataProvider.js";
import { getFriends, useFriends } from "../friends/friendDataProvider.js";
import { ArticleConverter } from "./Article.js";


// local variables
let allArticles = [];
let allRelationships = [];
let currentUser = "";

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

    // Attach isFriends property on each article and set to false
    let userArticlesFinal = userArticlesRaw.map(article => {
        article.isFriend = false
        return article
    })

    // ---------------------- FRIENDS' ARTICLES ----------------------
    // Stores the relationship objects from the friends Table that have the current user's Id as the userId
    let userFriends = allRelationships.filter(relationship => 
        relationship.userId === currentUser);

    // Saves articles that belong to the current user's friends
    let friendArticlesRaw = allArticles.filter(article => 
        userFriends.find(relationship => 
            relationship.friendId === article.userId));

    // Attach isFriends property on each article and set to true
    let friendsArticlesFinal = friendArticlesRaw.map(article => {
        article.isFriend = true
        return article
    })

    // -------------------- ALL RELEVANT ARTICLES --------------------
    // Combine the user's articles with the articles that their friend(s) saved.
    let relevantArticles = [...userArticlesFinal, ...friendsArticlesFinal]

    // ---------------- HTML CONVERSION & TRANSMISSION ----------------
    return relevantArticles.map(article => ArticleConverter(article)).join("");
};