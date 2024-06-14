import Article from '~/entities/articles/article.interface'
import { BaseResponse } from '~/type/BaseResponse'
import Controller from '~/decorator/controllerDecorator/controller.decorator'
import { Delete, Get, Patch, Post } from '~/decorator/controllerDecorator/methods.decorator'
import ArticleService from '~/services/article.service'
import { Body, Param } from '~/decorator/common/parameter.decorator'

@Controller('/api/v1/articles')
class ArticlesController {
  private articleService: ArticleService

  constructor() {
    this.articleService = new ArticleService()
  }

  @Get('')
  public getAllArticles = async () => {
    const res = await this.articleService.getArticles()

    return new BaseResponse<Article[]>(res)
  }

  @Get('/:id')
  public async getArticleById(@Param('id') id: string) {
    const res = await this.articleService.getOneArticle(id)

    return new BaseResponse<Article>(res)
  }

  @Patch('/:id')
  public async modifyArticle(@Param('id') id: string, @Body() articleData: Article) {
    const res = await this.articleService.updateArticle(id, articleData)

    return new BaseResponse<Article>(res)
  }

  @Post('')
  public async createArticle(@Body() articleData: Article) {
    const res = await this.articleService.createArticle(articleData)
    return new BaseResponse<Article>(res)
  }

  @Delete('/:id')
  public async deleteArticle(@Param('id') id: string) {
    const res = this.articleService.deleteArticle(id)
    return new BaseResponse<any>(res)
  }
}

export default ArticlesController
