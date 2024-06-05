import { Request } from 'express'
import Article from '~/entities/articles/article.interface'
import { BaseResponse } from '~/type/BaseResponse'
import Controller from '~/decorator/controllerDecorator/controller.decorator'
import { Delete, Get, Patch, Post } from '~/decorator/controllerDecorator/methods.decorator'
import ArticleService from '~/services/article.service'

// @Controller('/api/v1/articles')
class ArticlesController {
  private articleService: ArticleService

  constructor() {
    this.articleService = new ArticleService()
  }

  // @Get('')
  public getAllArticles = async (request: Request) => {
    const res = await this.articleService.getArticles()

    return new BaseResponse<Article[]>(res)
  }

  // @Get('/:id')
  public getArticleById = async (request: Request) => {
    const id = request.params.id
    const res = await this.articleService.getOneArticle(id)

    return new BaseResponse<Article>(res)
  }

  // @Patch('/:id')
  public modifyArticle = async (request: Request) => {
    const id = request.params.id
    const articleData: Article = request.body

    const res = await this.articleService.updateArticle(id, articleData)

    return new BaseResponse<Article>(res)
  }

  // @Post('')
  public createArticle = async (request: Request) => {
    const articleData: Article = request.body
    const res = await this.articleService.createArticle(articleData)
    return new BaseResponse<Article>(res)
  }

  // @Delete('/:id')
  public deleteArticle = (request: Request) => {
    const id = request.params.id
    const res = this.articleService.deleteArticle(id)

    return new BaseResponse<any>(res)
  }
}

export default ArticlesController
