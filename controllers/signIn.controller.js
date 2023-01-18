import { validationResult } from "express-validator";
import jwtService from "../services/jwtService.js";
import db from "../models/index.js";
import { comparePassword } from "../services/passwordService.js";
const { User, RevokedToken } = db;

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

      const { refreshToken } = req.body;
      let id;
      try {
        const [tokenBody, revokedToken] = await Promise.all([
          jwtService.verifyRefreshToken(refreshToken),
          RevokedToken.findOne({
            token: refreshToken,
          }),
        ]);

        if (revokedToken) throw "";
        id = tokenBody.id;
        const user = await User.findOne({
          where: {
            id,
          },
        });
        if (!user) {
          throw "";
        }
      } catch (e) {
        console.error(e);
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
