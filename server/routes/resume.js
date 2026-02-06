import express from 'express';
import {
    createResume,
    getResumes,
    getResumeById,
    updateResume,
    deleteResume,
} from '../controllers/resumeController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Routes
router.route('/')
    .get(getResumes)
    .post(createResume);

router.route('/:id')
    .get(getResumeById)
    .put(updateResume)
    .delete(deleteResume);

export default router;
