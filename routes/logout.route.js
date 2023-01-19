import express from "express";

import logoutController from "../controllers/logout.controller.js";
import isAuthorized from "../middlewares/isAuthorized.js";

const logoutRoute = express.Router();

logoutRoute.get("/", isAuthorized, logoutController.logout);

export default logoutRoute;
