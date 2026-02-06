import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -refreshTokens');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            success: true,
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
            }
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateProfile = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if email is being changed and if it's already taken
        if (email !== user.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            // If email changed, require re-verification
            user.isVerified = false;
            // TODO: Send verification email
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();

        res.json({
            success: true,
            message: email !== user.email 
                ? 'Profile updated. Please verify your new email address.' 
                : 'Profile updated successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
            }
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Change password
// @route   PUT /api/user/change-password
// @access  Private
export const changePassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear all refresh tokens (logout from all devices)
        user.refreshTokens = [];

        await user.save();

        res.json({
            success: true,
            message: 'Password changed successfully. Please login again.'
        });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update user preferences
// @route   PUT /api/user/preferences
// @access  Private
export const updatePreferences = async (req, res) => {
    try {
        const { emailNotifications, marketingEmails, resumeReminders } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update preferences
        user.preferences = {
            emailNotifications: emailNotifications !== undefined ? emailNotifications : user.preferences?.emailNotifications ?? true,
            marketingEmails: marketingEmails !== undefined ? marketingEmails : user.preferences?.marketingEmails ?? false,
            resumeReminders: resumeReminders !== undefined ? resumeReminders : user.preferences?.resumeReminders ?? true,
        };

        await user.save();

        res.json({
            success: true,
            message: 'Preferences updated successfully',
            data: user.preferences
        });
    } catch (error) {
        console.error('Update preferences error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get user preferences
// @route   GET /api/user/preferences
// @access  Private
export const getPreferences = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            success: true,
            data: user.preferences || {
                emailNotifications: true,
                marketingEmails: false,
                resumeReminders: true,
            }
        });
    } catch (error) {
        console.error('Get preferences error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Delete user account
// @route   DELETE /api/user/account
// @access  Private
export const deleteAccount = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // TODO: Delete all user's resumes
        // await Resume.deleteMany({ userId: req.userId });

        // Delete user
        await User.findByIdAndDelete(req.userId);

        res.json({
            success: true,
            message: 'Account deleted successfully'
        });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
