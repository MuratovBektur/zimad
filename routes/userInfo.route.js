import express from "express";

import userInfoController from "../controllers/userInfo.controller.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const userInfoRoute = express.Router();

userInfoRoute.get("/", isAuthorized, userInfoController.getUserInfo);

export default userInfoRoute;
