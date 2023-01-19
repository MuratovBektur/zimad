import db from "../models/index.js";
import jwtService from "../services/jwtService.js";
const { User, RevokedToken } = db;

export default async function (req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({ error: "Token can't be empty" });
  }
  try {
    const [tokenBody, revokedToken] = await Promise.all([
      jwtService.verifyAccessToken(token),
      RevokedToken.findOne({
        where: {
          token,
        },
      }),
    ]);
    if (revokedToken) throw "";
    const id = tokenBody.id;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) throw "";
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    return res.status(403).send("Token is incorrect");
  }
}
