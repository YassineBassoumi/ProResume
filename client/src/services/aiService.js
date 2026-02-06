import api from './api';

// Generate professional summary
export const generateSummary = async (data) => {
    try {
        const response = await api.post('/ai/generate-summary', data);
        return response.data;
    } catch (error) {
        console.error('Generate Summary Error:', error);
        throw error;
    }
};

// Improve job description
export const improveDescription = async (data) => {
    try {
        const response = await api.post('/ai/improve-description', data);
        return response.data;
    } catch (error) {
        console.error('Improve Description Error:', error);
        throw error;
    }
};

// Generate bullet points
export const generateBulletPoints = async (data) => {
    try {
        const response = await api.post('/ai/generate-bullets', data);
        return response.data;
    } catch (error) {
        console.error('Generate Bullet Points Error:', error);
        throw error;
    }
};

// Suggest skills
export const suggestSkills = async (data) => {
    try {
        const response = await api.post('/ai/suggest-skills', data);
        return response.data;
    } catch (error) {
        console.error('Suggest Skills Error:', error);
        throw error;
    }
};

// Optimize for ATS
export const optimizeForATS = async (data) => {
    try {
        const response = await api.post('/ai/optimize-ats', data);
        return response.data;
    } catch (error) {
        console.error('Optimize ATS Error:', error);
        throw error;
    }
};

const aiService = {
    generateSummary,
    improveDescription,
    generateBulletPoints,
    suggestSkills,
    optimizeForATS
};

export default aiService;
