import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: [true, 'Please provide a resume title'],
            trim: true,
            default: 'My Resume',
        },
        header: {
            firstName: { type: String, trim: true, default: '' },
            lastName: { type: String, trim: true, default: '' },
            title: { type: String, trim: true, default: '' },
            email: { type: String, trim: true, default: '' },
            phone: { type: String, trim: true, default: '' },
            location: { type: String, trim: true, default: '' },
            linkedin: { type: String, trim: true, default: '' },
            portfolio: { type: String, trim: true, default: '' },
        },
        summary: {
            type: String,
            default: '',
        },
        experience: {
            type: [
                {
                    company: String,
                    position: String,
                    location: String,
                    startDate: String,
                    endDate: String,
                    current: Boolean,
                    description: String,
                }
            ],
            default: [],
        },
        education: {
            type: [
                {
                    institution: String,
                    degree: String,
                    field: String,
                    location: String,
                    startDate: String,
                    endDate: String,
                    current: Boolean,
                    description: String,
                }
            ],
            default: [],
        },
        skills: {
            type: [
                {
                    name: String,
                    level: String,
                }
            ],
            default: [],
        },
        projects: {
            type: [
                {
                    name: String,
                    description: String,
                    technologies: String,
                    link: String,
                    startDate: String,
                    endDate: String,
                }
            ],
            default: [],
        },
        languages: {
            type: [
                {
                    name: String,
                    proficiency: String,
                }
            ],
            default: [],
        },
        certifications: {
            type: [
                {
                    name: String,
                    issuer: String,
                    date: String,
                    link: String,
                }
            ],
            default: [],
        },
        awards: {
            type: [
                {
                    title: String,
                    issuer: String,
                    date: String,
                    description: String,
                }
            ],
            default: [],
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
resumeSchema.index({ userId: 1, createdAt: -1 });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;
