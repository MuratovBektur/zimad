import { validationResult } from "express-validator";
import jwtService from "../services/jwtService.js";
import db from "../models/index.js";
import { comparePassword } from "../services/passwordService.js";
const User = db.User;

class SignInController {
  async getAccessTokenByPassword(req, res) {
    try {
      const errors = validationResult(req);
      const { id, password } = req.body;
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findOne({
        where: {
          id,
        },
      });
      if (!user || !(await comparePassword(password, user.hashedPassword))) {
        return res.status(403).send("id or password is incorrect");
      }
      const accessToken = await jwtService.generateAccessToken({
        id,
      });

      return res.status(200).json({ accessToken });
    } catch (e) {
      console.error("getToken", e);
      return res.status(500).send(e);
    }
  }

  async getAccessTokenByRefreshToken(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { refresh_token } = req.body;
      let id;
      try {
        const tokenBody = await jwtService.verifyRefreshToken(refresh_token);
        id = tokenBody.id;
      } catch (e) {
        return res.status(403).send("token is incorrect");
      }
      const accessToken = await jwtService.generateAccessToken({ id });
      return res.status(200).json({ accessToken });
    } catch (e) {
      console.error("updateAccessToken", e);
      return res.status(500).send(e);
    }
  }
}

export default new SignInController();
