import jwt from "jsonwebtoken";
import "./applyEnvConfig.js";

const sign = (body, key, options) => {
  return new Promise((resolve, reject) => {
    jwt.sign(body, key, options, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const verify = (token, key) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

class JWTService {
  async generateAccessToken(body) {
    try {
      if (!ACCESS_SECRET) throw "ACCESS_SECRET not found";
      const token = await sign(body, ACCESS_SECRET, {
        expiresIn: "10m",
      });
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async verifyAccessToken(token) {
    try {
      if (!REFRESH_SECRET) throw "ACCESS_SECRET not found";
      const body = await verify(token, ACCESS_SECRET);
      return body;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async generateRefreshToken(body) {
    try {
      if (!ACCESS_SECRET) throw "REFRESH_SECRET not found";
      const token = await sign(body, REFRESH_SECRET, {
        expiresIn: "7d",
      });
      console.log("token", token);
      return token;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  async verifyRefreshToken(token) {
    try {
      if (!REFRESH_SECRET) throw "REFRESH_SECRET not found";
      const body = await verify(token, REFRESH_SECRET);
      return body;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default new JWTService();
