import { Request, Response } from "express";
import User from "../models/userModel.js";

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ message: users });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ message: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    res.status(201).json({ message: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndUpdate(req.params.id, {
        username,
        email,
        password,
      });
      res.status(200).json({ message: "User updated successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
