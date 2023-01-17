import express from "express";

import userInfoController from "../controllers/userInfo.controller.js";
import isAuthorized from "../services/isAuthorized.js";

const signinRoute = express.Router();

signinRoute.get("/", isAuthorized, userInfoController.getUserInfo);

export default signinRoute;
