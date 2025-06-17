import { Request, Response } from "express";
import { validationResult } from "express-validator";
import User from "../model/userModel.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json({ result: users });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ result: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.status(201).json({ result: user });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    User.findByIdAndUpdate(req.body);
    res.status(200).json({ result: "User updated successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    User.findByIdAndDelete(req.params.id);
    res.status(200).json({ result: "User deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
