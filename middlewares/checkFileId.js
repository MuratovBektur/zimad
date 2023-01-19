import db from "../models/index.js";
const { UploadedFile } = db;

export default async function (req, res, next) {
  const id = req.params.id;
  if (!id || isNaN(+id) || +id < 1) {
    return res.status(400).json({ error: "id must be positive number" });
  }
  const file = await UploadedFile.findOne({
    where: {
      id,
    },
  });
  if (!file) {
    return res.status(404).json({ error: "File not found" });
  }
  req.uploadedFileInfo = file;
  next();
}
