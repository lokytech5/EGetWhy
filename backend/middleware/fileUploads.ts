
import multer = require("multer");
import { InvalidFileTypeError } from "../lib/errorUtils";

const storage = multer.memoryStorage();

const fileUploads = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];
    console.log('Received MIME type:', file.mimetype);
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new InvalidFileTypeError('Invalid file type');
      cb(error as any, false);
    }
  }
});

export default fileUploads;