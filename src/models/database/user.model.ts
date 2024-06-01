import { Schema, model, Document } from 'mongoose'

interface IUser extends Document {
  name: string
  email: string
  password: string
  sex: 0|1|2
  address: string
  avatar: string
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  sex: {
    type: Number,
    required: false
  },

  address: {
    type: String
  },

  avatar: {
    type: String
  }
})

const User = model<IUser>('User', userSchema)

export default User
