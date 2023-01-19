import express from "express";
import multer from "multer";

import fileController from "../controllers/file.controller.js";
import isAuthorized from "../middlewares/isAuthorized.js";
import checkFileId from "../middlewares/checkFileId.js";

const fileRoute = express.Router();

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    function getRandomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }

    function getUniqueNumber() {
      return (
        String(Date.now()) +
        getRandomInteger(1, 100) *
          getRandomInteger(1, 100) *
          getRandomInteger(1, 100)
      );
    }
    const name = `${getUniqueNumber()}_${file.originalname}`;
    req.filename = name;
    cb(null, name);
  },
});

const storageMiddleware = multer({ storage: storageConfig }).single("file");

fileRoute.use(isAuthorized);
fileRoute.post("/upload", storageMiddleware, fileController.upload);
fileRoute.get("/list", fileController.list);
fileRoute.delete("/delete/:id", checkFileId, fileController.delete);
fileRoute.get("/:id", checkFileId, fileController.getFileInfo);
fileRoute.get("/download/:id", checkFileId, fileController.download);
fileRoute.put(
  "/update/:id",
  [storageMiddleware, checkFileId, fileController.delete],
  fileController.upload
);

export default fileRoute;
