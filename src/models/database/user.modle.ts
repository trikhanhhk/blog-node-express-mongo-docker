import * as mongoose from 'mongoose'
import { SexEnum } from '~/constants/enum'
import User from '~/entities/users/user.interface'

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    displayName: String,
    email: String,
    password: String,
    refreshToken: String,
    sex: {
      type: Number,
      enum: SexEnum,
      default: 0
    }
  },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password
        delete ret.refreshToken
      }
    }
  }
)

const userModel = mongoose.model<User & mongoose.Document>('user', userSchema)

export default userModel
