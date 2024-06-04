import * as mongoose from 'mongoose'
import Article from '~/entities/articles/article.interface'

const articleSchema = new mongoose.Schema({
  author: String,
  content: String,
  title: String
})

const articleModel = mongoose.model<Article & mongoose.Document>('article', articleSchema)

export default articleModel
