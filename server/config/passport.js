import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import User from '../models/User.js';

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findOne({ googleId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists with same email
                user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // Link Google account to existing user
                    user.googleId = profile.id;
                    user.avatar = profile.photos[0]?.value;
                    user.isVerified = true;
                    await user.save();
                    return done(null, user);
                }

                // Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    googleId: profile.id,
                    avatar: profile.photos[0]?.value,
                    provider: 'google',
                    isVerified: true,
                });

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

// LinkedIn OAuth Strategy
passport.use(
    new LinkedInStrategy(
        {
            clientID: process.env.LINKEDIN_CLIENT_ID,
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
            callbackURL: '/api/auth/linkedin/callback',
            scope: ['r_emailaddress', 'r_liteprofile'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user already exists
                let user = await User.findOne({ linkedinId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Check if user exists with same email
                user = await User.findOne({ email: profile.emails[0].value });

                if (user) {
                    // Link LinkedIn account to existing user
                    user.linkedinId = profile.id;
                    user.avatar = profile.photos[0]?.value;
                    user.isVerified = true;
                    await user.save();
                    return done(null, user);
                }

                // Create new user
                user = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    linkedinId: profile.id,
                    avatar: profile.photos[0]?.value,
                    provider: 'linkedin',
                    isVerified: true,
                });

                done(null, user);
            } catch (error) {
                done(error, null);
            }
        }
    )
);

export default passport;
