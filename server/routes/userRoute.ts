import express from "express";
import {
  getUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
} from "../controller/userController.js";
import { validateCredentials } from "../middleware/userValidation.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.post("/", validateCredentials, createUser);
router.patch("/:id", validateCredentials, updateUser);

export default router;
