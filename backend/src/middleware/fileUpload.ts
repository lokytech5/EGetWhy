import multer from 'multer';
import { InvalidFileTypeError } from '../utils/errorUtils';

const storage = multer.memoryStorage();

const fileUploads = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml'];
    console.log('Received MIME type:', file.mimetype); // Add this line for logging
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const error = new InvalidFileTypeError('Invalid file type');
      cb(error as any, false);
    }
  }
});

export default fileUploads;
