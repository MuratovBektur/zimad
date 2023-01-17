import express from "express";
import { body, oneOf } from "express-validator";

import signinController from "../controllers/signin.controller.js";

const signinRoute = express.Router();

signinRoute.post(
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
  signinController.getToken
);
signinRoute.post(
  "/new_token",
  [
    body(
      "refresh_token",
      "refresh_token must be string and contain at least 10 char"
    )
      .isString()
      .isLength({
        min: 10,
      }),
  ],
  signinController.updateAccessToken
);

export default signinRoute;
