import axios from 'axios';

const API_URL = '/api/auth';

// Create axios instance
const api = axios.create({
    baseURL: '/api',
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const { accessToken } = await authAPI.refreshToken();
                
                // Update the authorization header
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout user
                authAPI.logout();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    signup: async (userData) => {
        const response = await axios.post(`${API_URL}/signup`, userData);
        // Don't store token on signup - user needs to verify email first
        return response.data;
    },

    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/login`, credentials);
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            localStorage.setItem('user', JSON.stringify({
                _id: response.data._id,
                name: response.data.name,
                email: response.data.email,
                isVerified: response.data.isVerified
            }));
        }
        return response.data;
    },

    logout: async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            await axios.post(`${API_URL}/logout`, { refreshToken });
        } catch (error) {
            console.error('Logout error:', error);
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    logoutAll: async () => {
        try {
            await api.post('/auth/logout-all');
        } catch (error) {
            console.error('Logout all error:', error);
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    refreshToken: async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }
        const response = await axios.post(`${API_URL}/refresh-token`, { refreshToken });
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
        }
        return response.data;
    },

    verifyEmail: async (token) => {
        const response = await axios.get(`${API_URL}/verify-email/${token}`);
        return response.data;
    },

    resendVerification: async (email) => {
        const response = await axios.post(`${API_URL}/resend-verification`, email);
        return response.data;
    },

    forgotPassword: async (email) => {
        const response = await axios.post(`${API_URL}/forgot-password`, email);
        return response.data;
    },

    resetPassword: async (token, passwordData) => {
        const response = await axios.put(`${API_URL}/reset-password/${token}`, passwordData);
        return response.data;
    },
};

// User API
export const userAPI = {
    getProfile: async () => {
        const response = await api.get('/user/profile');
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await api.put('/user/profile', profileData);
        return response.data;
    },

    changePassword: async (passwordData) => {
        const response = await api.put('/user/change-password', passwordData);
        return response.data;
    },

    getPreferences: async () => {
        const response = await api.get('/user/preferences');
        return response.data;
    },

    updatePreferences: async (preferences) => {
        const response = await api.put('/user/preferences', preferences);
        return response.data;
    },

    deleteAccount: async () => {
        const response = await api.delete('/user/account');
        return response.data;
    },
};

// Resume API
export const resumeAPI = {
    // Create new resume
    create: async (resumeData) => {
        const response = await api.post('/resumes', resumeData);
        return response.data;
    },

    // Get all resumes for current user
    getAll: async () => {
        const response = await api.get('/resumes');
        return response.data;
    },

    // Get single resume by ID
    getById: async (id) => {
        const response = await api.get(`/resumes/${id}`);
        return response.data;
    },

    // Update resume
    update: async (id, resumeData) => {
        const response = await api.put(`/resumes/${id}`, resumeData);
        return response.data;
    },

    // Delete resume
    delete: async (id) => {
        const response = await api.delete(`/resumes/${id}`);
        return response.data;
    },
};

// AI API
export const aiAPI = {
    // Tailor resume to job description
    tailorToJob: async (resumeContent, jobDescription) => {
        const response = await api.post('/ai/tailor-to-job', {
            resumeContent,
            jobDescription
        });
        return response.data;
    },

    // Generate summary
    generateSummary: async (data) => {
        const response = await api.post('/ai/generate-summary', data);
        return response.data;
    },

    // Improve description
    improveDescription: async (data) => {
        const response = await api.post('/ai/improve-description', data);
        return response.data;
    },

    // Generate bullet points
    generateBulletPoints: async (data) => {
        const response = await api.post('/ai/generate-bullets', data);
        return response.data;
    },

    // Suggest skills
    suggestSkills: async (data) => {
        const response = await api.post('/ai/suggest-skills', data);
        return response.data;
    },

    // Optimize for ATS
    optimizeForATS: async (data) => {
        const response = await api.post('/ai/optimize-ats', data);
        return response.data;
    },
};

export default api;
