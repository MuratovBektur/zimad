import express from "express";
import { body, oneOf } from "express-validator";

import signinController from "../controllers/signIn.controller.js";

const signinRoute = express.Router();

signinRoute.post(
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
  signinController.getAccessTokenByPassword
);

signinRoute.post(
  "/new_token",
  [
    body(
      "refreshToken",
      "refreshToken must be string and contain at least 10 char"
    )
      .isString()
      .isLength({
        min: 10,
      }),
  ],
  signinController.getAccessTokenByRefreshToken
);

export default signinRoute;
