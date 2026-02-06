import mongoose from 'mongoose';
import crypto from 'crypto';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please provide an email'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email',
            ],
        },
        password: {
            type: String,
            required: function() {
                return !this.googleId && !this.linkedinId;
            },
            minlength: 6,
        },
        googleId: {
            type: String,
            sparse: true,
        },
        linkedinId: {
            type: String,
            sparse: true,
        },
        avatar: {
            type: String,
        },
        provider: {
            type: String,
            enum: ['local', 'google', 'linkedin'],
            default: 'local',
        },
        isVerified: {
            type: Boolean,
            default: function() {
                return this.provider !== 'local';
            },
        },
        verificationToken: String,
        verificationTokenExpire: Date,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        refreshTokens: [{
            token: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now,
                expires: 7 * 24 * 60 * 60 // 7 days in seconds
            }
        }],
        preferences: {
            emailNotifications: {
                type: Boolean,
                default: true
            },
            marketingEmails: {
                type: Boolean,
                default: false
            },
            resumeReminders: {
                type: Boolean,
                default: true
            }
        },
    },
    {
        timestamps: true,
    }
);

// Generate and hash email verification token
userSchema.methods.getVerificationToken = function () {
    // Generate token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to verificationToken field
    this.verificationToken = crypto
        .createHash('sha256')
        .update(verificationToken)
        .digest('hex');

    // Set expire (24 hours)
    this.verificationTokenExpire = Date.now() + 24 * 60 * 60 * 1000;

    return verificationToken;
};

// Generate and hash password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set expire (10 minutes)
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    return resetToken;
};

const User = mongoose.model('User', userSchema);

export default User;
