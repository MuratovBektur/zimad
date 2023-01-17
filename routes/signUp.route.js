import express from "express";
import { body, oneOf } from "express-validator";

import signupController from "../controllers/signUp.controller.js";

const signupRoute = express.Router();

signupRoute.post(
  "/",
  [
    oneOf([
      body("id", "id must be valid phone number").isMobilePhone(),
      body("id", "id must be valid email").isEmail(),
    ]),
    body("password", "password must be string and contain at least 5 char")
      .isString()
      .isLength({
        min: 5,
      }),
  ],
  signupController.register
);

export default signupRoute;
