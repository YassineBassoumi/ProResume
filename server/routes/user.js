import express from 'express';
import { body } from 'express-validator';
import {
    getProfile,
    updateProfile,
    changePassword,
    updatePreferences,
    getPreferences,
    deleteAccount
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const updateProfileValidation = [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
];

const changePasswordValidation = [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters'),
];

// Routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfileValidation, updateProfile);
router.put('/change-password', protect, changePasswordValidation, changePassword);
router.get('/preferences', protect, getPreferences);
router.put('/preferences', protect, updatePreferences);
router.delete('/account', protect, deleteAccount);

export default router;
