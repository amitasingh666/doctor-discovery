import multer from 'multer';
import path from 'path';

const diskConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads/');
  },

  filename: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const uniqueName = `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;

    callback(null, uniqueName);
  }
});


const securityCheck = (req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: diskConfig,
  fileFilter: securityCheck
});

export default upload;