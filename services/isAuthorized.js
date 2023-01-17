import db from "../models/index.js";
import jwtService from "./jwtService.js";
const User = db.User;

export default async function isAuthorized(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: "Token can't be empty" });
  }
  try {
    const { id } = await jwtService.verifyAccessToken(token);
    const user = await User.findOne({
      where: {
        id,
      },
    });
    req.user = user;
    next();
  } catch (e) {
    return res.status(403).send("Token is incorrect");
  }
}
