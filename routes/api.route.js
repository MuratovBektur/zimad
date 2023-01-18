import express from "express";

import signinRouter from "./signIn.route.js";
import signupRouter from "./signUp.route.js";
import userInfo from "./userInfo.route.js";
import logoutRoute from "./logout.route.js";

const apiRouter = express.Router();

apiRouter.use("/signin", signinRouter);
apiRouter.use("/signup", signupRouter);
apiRouter.use("/info", userInfo);
apiRouter.use("/logout", logoutRoute);

export default apiRouter;
