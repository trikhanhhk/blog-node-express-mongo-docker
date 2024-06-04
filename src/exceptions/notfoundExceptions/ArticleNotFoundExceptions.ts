import HttpException from '../HttpException'

class ArticleNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Article with id ${id} not found`)
  }
}

export default ArticleNotFoundException
