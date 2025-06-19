import multer from "multer";

// Use memory storage (buffer in RAM instead of saving to disk)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
