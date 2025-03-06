import { body } from "express-validator";

const validateCredentials = [
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isStrongPassword(),
];

export default validateCredentials;
