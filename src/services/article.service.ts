import Article from '~/entities/articles/article.interface'
import ArticleNotFoundException from '~/exceptions/notfoundExceptions/ArticleNotFoundExceptions'
import articleModel from '~/models/database/articles.model'

class ArticleService {
  private article = articleModel

  public createArticle = async (articleData: Article) => {
    const createdArticle = new this.article(articleData)
    const res = await createdArticle.save()
    return res
  }

  public getArticles = async () => {
    const articles = this.article.find()
    return articles
  }

  public getOneArticle = async (id: string) => {
    const article = await this.article.findById(id)
    if (!article) {
      throw new ArticleNotFoundException(id)
    }

    return article
  }

  public updateArticle = async (id: string, articleData: Article) => {
    const res = await this.article.findByIdAndUpdate(id, articleData, { new: true })
    if (!res) {
      throw new ArticleNotFoundException(id)
    }

    return res
  }

  public deleteArticle = async (id: string) => {
    const res = this.article.findByIdAndDelete(id)

    if (!res) {
      throw new ArticleNotFoundException(id)
    }

    return res
  }
}

export default ArticleService
