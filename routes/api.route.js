import express from "express";

import signinRouter from "./signin.route.js";
import signupRouter from "./signup.route.js";

const apiRouter = express.Router();

apiRouter.use("/signin", signinRouter);
apiRouter.use("/signup", signupRouter);

export default apiRouter;
