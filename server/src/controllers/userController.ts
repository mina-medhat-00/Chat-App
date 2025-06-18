import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: true, message: "Invalid id" });
    return;
  }

  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ success: true, data: user });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      res.send({ success: false, message: "Missing data" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: true, message: "Invalid id" });
    return;
  }

  try {
    const user = await User.findById(id);
    if (user) {
      const updatedData: Partial<typeof User.schema.obj> = {};
      if (username) {
        updatedData.username = username;
      }
      if (email) {
        updatedData.email = email;
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updatedData.password = hashedPassword;
      }
      await User.findByIdAndUpdate(id, updatedData);
      res
        .status(200)
        .json({ success: true, data: "User updated successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ success: true, message: "Invalid id" });
    return;
  }

  try {
    const user = await User.findById(id);
    if (user) {
      await User.findByIdAndDelete(id);
      res
        .status(200)
        .json({ success: true, message: "User deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
