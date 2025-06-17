import { body } from "express-validator";

export const validateCredentials = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isStrongPassword(),
];
