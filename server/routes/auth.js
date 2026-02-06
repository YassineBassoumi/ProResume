import express from 'express';
import { body } from 'express-validator';
import passport from '../config/passport.js';
import { 
    signup, 
    login, 
    forgotPassword, 
    resetPassword,
    verifyEmail,
    resendVerification,
    refreshToken,
    logout,
    logoutAll,
    oauthCallback
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const signupValidation = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
];

const forgotPasswordValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
];

const resetPasswordValidation = [
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

const resendVerificationValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),
];

// Routes
router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.post('/logout-all', protect, logoutAll);
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerificationValidation, resendVerification);
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);
router.put('/reset-password/:resetToken', resetPasswordValidation, resetPassword);

// OAuth Routes
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
}));

router.get('/google/callback', 
    passport.authenticate('google', { 
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`
    }), 
    oauthCallback
);

router.get('/linkedin', passport.authenticate('linkedin', { 
    session: false 
}));

router.get('/linkedin/callback', 
    passport.authenticate('linkedin', { 
        session: false,
        failureRedirect: `${process.env.CLIENT_URL}/login?error=oauth_failed`
    }), 
    oauthCallback
);

export default router;
