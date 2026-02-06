import Resume from '../models/Resume.js';

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
export const createResume = async (req, res) => {
    try {
        const resumeData = {
            ...req.body,
            userId: req.userId,
        };

        const resume = await Resume.create(resumeData);

        res.status(201).json({
            success: true,
            data: resume,
        });
    } catch (error) {
        console.error('Error creating resume:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating resume',
            error: error.message,
        });
    }
};

// @desc    Get all resumes for authenticated user
// @route   GET /api/resumes
// @access  Private
export const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.userId })
            .sort({ updatedAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: resumes.length,
            data: resumes,
        });
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching resumes',
            error: error.message,
        });
    }
};

// @desc    Get single resume by ID
// @route   GET /api/resumes/:id
// @access  Private
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found',
            });
        }

        res.status(200).json({
            success: true,
            data: resume,
        });
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching resume',
            error: error.message,
        });
    }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
export const updateResume = async (req, res) => {
    try {
        let resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found',
            });
        }

        resume = await Resume.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            data: resume,
        });
    } catch (error) {
        console.error('Error updating resume:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating resume',
            error: error.message,
        });
    }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
export const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.userId,
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Resume not found',
            });
        }

        await Resume.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Resume deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting resume',
            error: error.message,
        });
    }
};
