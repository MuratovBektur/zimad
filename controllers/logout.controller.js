import db from "../models/index.js";
const RevokedToken = db.RevokedToken;

class LogoutController {
  async logout(req, res) {
    const { authorization: accessToken, refreshtoken: refreshToken } =
      req.headers;
    if (!accessToken || !refreshToken) {
      return res.status(400).json({ error: "Tokens can't be empty" });
    }
    await Promise.all([
      await RevokedToken.create({
        token: accessToken,
      }),
      await RevokedToken.create({
        token: refreshToken,
      }),
    ]);
    return res.status(200).json({ status: 1 });
  }
}

export default new LogoutController();
