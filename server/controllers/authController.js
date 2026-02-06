import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { sendEmail } from '../utils/sendEmail.js';

// Generate Access Token (short-lived)
const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15m', // 15 minutes
    });
};

// Generate Refresh Token (long-lived)
const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d', // 7 days
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
export const signup = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isVerified: false,
        });

        if (user) {
            // Generate verification token
            const verificationToken = user.getVerificationToken();
            await user.save({ validateBeforeSave: false });

            // Create verification url
            const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

            const message = `
                <h1>Email Verification</h1>
                <p>Welcome to ProResume! Please verify your email address by clicking the link below:</p>
                <a href="${verificationUrl}" clicktracking=off>${verificationUrl}</a>
                <p>This link will expire in 24 hours.</p>
                <p>If you didn't create an account, please ignore this email.</p>
            `;

            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Verify Your Email - ProResume',
                    message,
                });

                res.status(201).json({
                    message: 'Registration successful! Please check your email to verify your account.',
                    email: user.email,
                });
            } catch (error) {
                console.error('Email error:', error);
                // Delete user if email fails
                await User.findByIdAndDelete(user._id);
                return res.status(500).json({ message: 'Failed to send verification email. Please try again.' });
            }
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Authenticate user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check for user
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Auto-verify old users who don't have isVerified field
            if (user.isVerified === undefined || user.isVerified === null) {
                user.isVerified = true;
                await user.save();
            }

            // Check if email is verified
            if (user.isVerified === false) {
                return res.status(401).json({ 
                    message: 'Please verify your email before logging in. Check your inbox for the verification link.',
                    needsVerification: true 
                });
            }

            // Generate tokens
            const accessToken = generateAccessToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            // Save refresh token to database
            user.refreshTokens.push({ token: refreshToken });
            
            // Keep only last 5 refresh tokens (for multiple devices)
            if (user.refreshTokens.length > 5) {
                user.refreshTokens = user.refreshTokens.slice(-5);
            }
            
            await user.save();

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
                accessToken,
                refreshToken,
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No user found with that email' });
        }

        // Get reset token
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset url
        const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

        const message = `
            <h1>Password Reset Request</h1>
            <p>You requested a password reset. Please click the link below to reset your password:</p>
            <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
            <p>This link will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Password Reset Request',
                message,
            });

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error(error);
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return res.status(500).json({ message: 'Email could not be sent' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
export const resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.resetToken)
            .digest('hex');

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Set new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = async (req, res) => {
    try {
        // Get hashed token
        const verificationToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        const user = await User.findOne({
            verificationToken,
            verificationTokenExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        // Verify user
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpire = undefined;

        await user.save();

        res.status(200).json({ 
            message: 'Email verified successfully! You can now login.',
            success: true 
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Resend verification email
// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerification = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No user found with that email' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        // Generate new verification token
        const verificationToken = user.getVerificationToken();
        await user.save({ validateBeforeSave: false });

        // Create verification url
        const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

        const message = `
            <h1>Email Verification</h1>
            <p>Please verify your email address by clicking the link below:</p>
            <a href="${verificationUrl}" clicktracking=off>${verificationUrl}</a>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Verify Your Email - ProResume',
                message,
            });

            res.status(200).json({ message: 'Verification email sent successfully' });
        } catch (error) {
            console.error(error);
            user.verificationToken = undefined;
            user.verificationTokenExpire = undefined;

            await user.save({ validateBeforeSave: false });

            return res.status(500).json({ message: 'Email could not be sent' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        // Verify refresh token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }

        // Find user and check if refresh token exists
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Check if refresh token exists in user's tokens
        const tokenExists = user.refreshTokens.some(rt => rt.token === refreshToken);
        
        if (!tokenExists) {
            return res.status(401).json({ message: 'Invalid refresh token' });
        }

        // Generate new tokens
        const newAccessToken = generateAccessToken(user._id);
        const newRefreshToken = generateRefreshToken(user._id);

        // Remove old refresh token and add new one (token rotation)
        user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
        user.refreshTokens.push({ token: newRefreshToken });
        
        await user.save();

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        });
    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(200).json({ message: 'Logged out successfully' });
        }

        // Verify and decode token
        let decoded;
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        } catch (error) {
            // Token invalid or expired, but still return success
            return res.status(200).json({ message: 'Logged out successfully' });
        }

        // Remove refresh token from database
        const user = await User.findById(decoded.id);
        
        if (user) {
            user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
            await user.save();
        }

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Logout from all devices
// @route   POST /api/auth/logout-all
// @access  Private
export const logoutAll = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Clear all refresh tokens
        user.refreshTokens = [];
        await user.save();

        res.status(200).json({ message: 'Logged out from all devices successfully' });
    } catch (error) {
        console.error('Logout all error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    OAuth callback handler
// @route   GET /api/auth/google/callback, /api/auth/linkedin/callback
// @access  Public
export const oauthCallback = async (req, res) => {
    try {
        const user = req.user;

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Save refresh token to database
        user.refreshTokens.push({ token: refreshToken });
        
        // Keep only last 5 refresh tokens
        if (user.refreshTokens.length > 5) {
            user.refreshTokens = user.refreshTokens.slice(-5);
        }
        
        await user.save();

        // Redirect to frontend with tokens
        const redirectUrl = `${process.env.CLIENT_URL}/oauth-callback?accessToken=${accessToken}&refreshToken=${refreshToken}&userId=${user._id}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`;
        
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('OAuth callback error:', error);
        res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);
    }
};
