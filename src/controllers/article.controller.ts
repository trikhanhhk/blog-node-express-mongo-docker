import { NextFunction, Request, Response, Router } from 'express'
import Article from '~/entities/articles/article.interface'
import { CreateArticleDto } from '~/entities/articles/createArticle.dto'
import HttpException from '~/exceptions/HttpException'
import ArticleNotFoundException from '~/exceptions/notfoundExceptions/ArticleNotFoundExceptions'
import validationMiddleware from '~/middlewares/validation.middlewares'
import articleModel from '~/models/database/articles.model'
import { BaseResponse } from '~/type/BaseResponse'
import Controller from './controller.interface'
import authMiddleware from '~/middlewares/auth.middlewares'

class ArticlesController implements Controller {
  public path = '/articles'
  public router = Router()
  private article = articleModel

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, validationMiddleware(CreateArticleDto), this.getAllArticles)
    this.router.get(`${this.path}/:id`, this.getArticleById)
    this.router
      .all(`${this.path}/*`, authMiddleware as any)
      .patch(`${this.path}/:id`, validationMiddleware(CreateArticleDto, true), this.modifyArticle)
      .delete(`${this.path}/:id`, this.deleteArticle)
      .post(this.path, this.createArticle)
  }

  private getAllArticles = async (request: Request, response: Response, next: NextFunction) => {
    const res = await this.article.find()

    if (!res) {
      return next(new HttpException(404, 'No any article record'))
    }

    response.send(new BaseResponse<Article[]>(res))
  }

  private getArticleById = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id
    const res = await this.article.findById(id)

    if (!res) {
      return next(new ArticleNotFoundException(id))
    }

    response.send(new BaseResponse<Article>(res))
  }

  private modifyArticle = async (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id
    const articleData: Article = request.body

    const res = await this.article.findByIdAndUpdate(id, articleData, { new: true })
    if (!res) {
      return next(new ArticleNotFoundException(id))
    }

    response.send(new BaseResponse<Article>(res))
  }

  private createArticle = async (request: Request, response: Response, next: NextFunction) => {
    const articleData: Article = request.body
    const createdArticle = new this.article(articleData)
    const res = await createdArticle.save()
    response.send(new BaseResponse<Article>(res))
  }

  private deleteArticle = (request: Request, response: Response, next: NextFunction) => {
    const id = request.params.id
    const res = this.article.findByIdAndDelete(id)

    if (!res) {
      return next(new ArticleNotFoundException(id))
    }

    response.send(new BaseResponse<any>(res))
  }
}

export default ArticlesController
