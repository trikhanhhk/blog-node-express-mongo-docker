import { Request, Response } from 'express';
import User from 'src/models/database/user.model';

// Tạo mới User
export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, email, password } = req.body
    const newUser = new User({ name, email, password })
    await newUser.save()
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating user', error });
  }
}

// Lấy danh sách tất cả Users
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching users', error });
  }
}

// Lấy thông tin User theo ID
export const getUserById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching user', error });
  }
}

// Cập nhật thông tin User theo ID
export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const { name, email, password } = req.body
    const user = await User.findByIdAndUpdate(id, { name, email, password }, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating user', error });
  }
}

// Xóa User theo ID
export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting user', error })
  }
}
