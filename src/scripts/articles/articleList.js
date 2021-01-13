// Ryan DeVault - Purpose: uses the functions in 

// Imports
import { getArticles, useArticles} from "./articleDataProvider.js";
import { articleConverter } from "./article.js";

// local variables
let articles = [];

export const articleList = () => {
    getArticles()
    .then(() => {
        articles = useArticles();
    })
}
