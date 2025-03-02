import { body } from "express-validator";

const validateCredentials = [
  body("email")
    .notEmpty()
    .withMessage("email address cannot be empty")
    .isEmail()
    .withMessage("invalid email address"),

  body("password")
    .notEmpty()
    .withMessage("password cannot be empty")
    .isStrongPassword()
    .withMessage("password too weak"),
];

export default validateCredentials;
