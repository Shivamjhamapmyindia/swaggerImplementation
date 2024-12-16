import multer from 'multer';
import path from 'path';
import fs from 'fs';
// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);  // Create uploads directory if it doesn't exist
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));  // Save files with timestamp
    }
});

// Set up file upload middleware (limit types and sizes)
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024,  // Max file size 50 MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /glb|gltf/;  // Only allow GLB and GLTF files
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Only GLB or GLTF files are allowed!');
        }
    }
});

// Export the upload middleware for use in routes
module.exports = upload;
