import { validationResult } from "express-validator";
import jwtService from "../services/jwtService.js";
import db from "../models/index.js";
import { hashPassword } from "../services/passwordService.js";

const User = db.User;

class SignUpController {
  async register(req, res) {
    try {
      // validate fields
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id, password } = req.body;

      const isUserIdBusy = await User.findOne({
        where: {
          id,
        },
      });
      if (isUserIdBusy) {
        return res.status(403).send("id is already in use");
      }
      const userFields = {
        id,
        hashedPassword: await hashPassword(password),
      };

      await User.create(userFields);

      const [accessToken, refreshToken] = await Promise.all([
        jwtService.generateAccessToken({ id }),
        jwtService.generateRefreshToken({ id }),
      ]);
      return res.status(201).json({ accessToken, refreshToken });
    } catch (e) {
      console.error("register", e);
      return res.status(500).send(e);
    }
  }
}

export default new SignUpController();
