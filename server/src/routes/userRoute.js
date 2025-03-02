import express from "express";
import { validationResult } from "express-validator";
import validateMiddleware from "../middleware/registrationValidation.js";

const router = express.Router();
const db = [
  { email: "alice@email.com", password: "Alice!123" },
  { email: "bob2@email.com", password: "Bob!123" },
  { email: "carl@email.com", password: "Carl!123" },
];

const userController = (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };
  const errors = validationResult(req);

  db.forEach((document) => {
    if (JSON.stringify(document) === JSON.stringify(credentials)) {
      return res.status(200).json({ notice: "login successful" });
    }
  });

  if (errors.isEmpty()) {
    res.status(201).json({ notice: "registration successful" });
  } else {
    res.status(400).json({ error: errors });
  }
};

router.post("/", validateMiddleware, userController);

export default router;
