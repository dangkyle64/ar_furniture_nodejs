import express from 'express';
import multer from 'multer';
import { postUploadVideoController } from '../controllers/uploadVideoController.js';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', upload.single('video'), postUploadVideoController);

export default router;