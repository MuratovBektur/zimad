import express from "express";
import { body, oneOf } from "express-validator";

import signupController from "../controllers/signup.controller.js";

const signupRoute = express.Router();

signupRoute.post(
  "/",
  [
    oneOf(
      [
        body("id", "id can't be empty").custom((id) => {
          const isNumber = !!Number(id);
          if (isNumber) return Promise.resolve;
        }),
        body("id", "id must be valid email").isEmail(),
      ],
      "id must be number or valid email"
    ),
    body("password", "password must be string and contain at least 5 char")
      .isString()
      .isLength({
        min: 5,
      }),
  ],
  signupController.register
);

export default signupRoute;
