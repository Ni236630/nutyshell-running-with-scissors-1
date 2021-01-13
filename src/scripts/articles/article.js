// Ryan DeVault - Purpose: Converts provided article object into an HTML representation and returns it.
export const ArticleConverter = (articleObject) => {
    let owner = "";
    if(articleObject.isFriend){
        owner = "friend"
    } else {
        owner = "self"
    }
    return `
        <div class="article--${articleObject.id}--${owner}">
            <div class="article__title">
                ${articleObject.title}
            </div>
            <div class="article__url">
                ${articleObject.url}
            </div>
            </div class="article__synopsis">
                ${articleObject.synopsis}
            </div>
            <button class="editArticle--${articleObject.Id}">
                Edit Article
            </button>
        </div>
    `
}