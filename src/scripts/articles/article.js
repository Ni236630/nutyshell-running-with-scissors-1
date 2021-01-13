// Ryan DeVault - Purpose: Converts provided article object into an HTML representation and returns it.
export const ArticleConverter = (articleObject) => {
    let owner = "";
    if(articleObject.isFriend){
        owner = "friendArticle"
    } else {
        owner = "userArticle"
    };
    return `
        <div class="article-card, ${owner}" id="article-card--${articleObject.id}">
            <div class="article__title">${articleObject.title}</div>
            <div class="article__url">${articleObject.url}</div>
            <div class="article__synopsis">${articleObject.synopsis}</div>
            <button class="editArticle--${articleObject.id}">Edit Article</button>
        </div>
    `;
};