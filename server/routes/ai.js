import express from 'express';
import {
    generateSummary,
    improveDescription,
    generateBulletPoints,
    suggestSkills,
    optimizeForATS,
    tailorToJob
} from '../controllers/aiController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All AI routes require authentication
router.use(protect);

// @route   POST /api/ai/generate-summary
// @desc    Generate professional summary
// @access  Private
router.post('/generate-summary', generateSummary);

// @route   POST /api/ai/improve-description
// @desc    Improve job description
// @access  Private
router.post('/improve-description', improveDescription);

// @route   POST /api/ai/generate-bullets
// @desc    Generate bullet points from text
// @access  Private
router.post('/generate-bullets', generateBulletPoints);

// @route   POST /api/ai/suggest-skills
// @desc    Suggest skills based on job title
// @access  Private
router.post('/suggest-skills', suggestSkills);

// @route   POST /api/ai/optimize-ats
// @desc    Optimize content for ATS
// @access  Private
router.post('/optimize-ats', optimizeForATS);

// @route   POST /api/ai/tailor-to-job
// @desc    Tailor resume to job description
// @access  Private
router.post('/tailor-to-job', tailorToJob);

export default router;
