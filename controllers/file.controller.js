import fs from "node:fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import db from "../models/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { UploadedFile } = db;
const uploadDir = path.join(__dirname, "../uploads/");

class FileController {
  async upload(req, res) {
    const t = await db.sequelize.transaction();
    try {
      const uploadedFileInfo = req.uploadedFileInfo;
      let fileData = req.file;
      let filename = req.filename;
      if (!fileData) {
        throw "";
      }

      const extensions = fileData.originalname.split(".").pop();
      const fileFields = {
        filename,
        originalname: fileData.originalname,
        extensions,
        mimetype: fileData.mimetype,
        size: fileData.size,
      };
      const uploadedFileInfoId = uploadedFileInfo.id;
      if (uploadedFileInfoId) {
        fileFields.id = uploadedFileInfoId;
      }
      await UploadedFile.create(fileFields);
      await t.commit();
      if (uploadedFileInfoId) {
        return res.status(200).json({ msg: "File updated" });
      }
      return res.status(200).json({ msg: "File downloaded" });
    } catch (e) {
      await t.rollback();
      await fs.unlink(uploadDir + req.filename);
      return res.status(500).json({ msg: "File upload error" });
    }
  }

  async list(req, res) {
    const page = req.query?.page || 1;
    const limit = req.query?.limit || 10;
    const offset = (page - 1) * limit;

    const fileList = await UploadedFile.findAll({
      offset,
      limit,
    });
    return res.status(200).json({ fileList });
  }

  async delete(req, res, next) {
    const t = await db.sequelize.transaction();
    try {
      const file = req.uploadedFileInfo;
      const id = file.id;
      await UploadedFile.destroy({
        where: {
          id,
        },
      });
      await fs.unlink(uploadDir + file.filename);
      await t.commit();
      if (req.file) {
        return next();
      }
      return res.status(200).send({
        msg: "Succesfull removed file",
      });
    } catch (e) {
      await t.rollback();
      console.error(e);
      res.status(500).send({
        msg: "Could not delete the file. " + e,
      });
    }
  }

  async getFileInfo(req, res) {
    const file = req.uploadedFileInfo;
    return res.status(200).send({
      file,
    });
  }

  async download(req, res) {
    try {
      const file = req.uploadedFileInfo;
      return res.download(uploadDir + file.filename, file.originalname);
    } catch (e) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  }
}

export default new FileController();
