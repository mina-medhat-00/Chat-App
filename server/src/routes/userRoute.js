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
    if (credentials.email === document.email) {
      if (credentials.password === document.password) {
        return res.status(200).json({ message: "login successful" });
      } else {
        return res.status(401).json({ error: "incorrect password" });
      }
    }
  });

  if (errors.isEmpty()) {
    res.status(201).json({ message: "registration successful" });
  } else {
    res.status(400).json({ error: "invalid email or password" });
  }
};

router.post("/", validateMiddleware, userController);

export default router;
