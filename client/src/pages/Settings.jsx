import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Bell, Shield, Trash2, Save, Eye, EyeOff } from 'lucide-react';
import Header from '@/components/Header';
import { authAPI, userAPI } from '@/services/api';
import { getUser } from '@/utils/auth';

const Settings = () => {
    const navigate = useNavigate();
    const currentUser = getUser();
    const [activeTab, setActiveTab] = useState('profile');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Profile form
    const [profileData, setProfileData] = useState({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
    });

    // Password form
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    // Preferences
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        marketingEmails: false,
        resumeReminders: true,
    });

    // Load preferences on mount
    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const response = await userAPI.getPreferences();
                if (response.success) {
                    setPreferences(response.data);
                }
            } catch (error) {
                console.error('Failed to load preferences:', error);
            }
        };
        loadPreferences();
    }, []);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await userAPI.updateProfile(profileData);
            
            if (response.success) {
                // Update localStorage
                const updatedUser = { ...currentUser, ...response.data };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                
                setMessage({ type: 'success', text: response.message });
            }
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to update profile. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match!' });
            setLoading(false);
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Password must be at least 6 characters!' });
            setLoading(false);
            return;
        }

        try {
            const response = await userAPI.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });
            
            if (response.success) {
                setMessage({ type: 'success', text: response.message + ' Redirecting...' });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                
                // Logout and redirect after password change
                setTimeout(async () => {
                    await authAPI.logout();
                    navigate('/login');
                }, 2000);
            }
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to change password. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handlePreferencesUpdate = async () => {
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const response = await userAPI.updatePreferences(preferences);
            
            if (response.success) {
                setMessage({ type: 'success', text: response.message });
            }
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to update preferences. Please try again.' 
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogoutAll = async () => {
        if (!confirm('Are you sure you want to logout from all devices?')) return;

        try {
            await authAPI.logoutAll();
            navigate('/login');
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to logout from all devices.' });
        }
    };

    const handleDeleteAccount = async () => {
        const confirmation = prompt('Type "DELETE" to confirm account deletion:');
        if (confirmation !== 'DELETE') return;

        setLoading(true);
        try {
            await userAPI.deleteAccount();
            await authAPI.logout();
            navigate('/signup');
        } catch (error) {
            setMessage({ 
                type: 'error', 
                text: error.response?.data?.message || 'Failed to delete account.' 
            });
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'preferences', label: 'Preferences', icon: Bell },
        { id: 'danger', label: 'Danger Zone', icon: Shield },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
            <Header />
            
            <main className="flex-grow container mx-auto px-6 py-8 md:py-12">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
                    </div>

                    {message.text && (
                        <div className={`mb-6 px-4 py-3 rounded-md ${
                            message.type === 'success' 
                                ? 'bg-green-50 text-green-600 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                                : 'bg-red-50 text-red-600 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <nav className="space-y-1 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-sm">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => {
                                                setActiveTab(tab.id);
                                                setMessage({ type: '', text: '' });
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left transition-colors ${
                                                activeTab === tab.id
                                                    ? 'bg-primary text-white'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span className="font-medium">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Full Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                    required
                                                />
                                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                    Changing your email will require verification
                                                </p>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Save className="h-4 w-4" />
                                                {loading ? 'Saving...' : 'Save Changes'}
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Security Tab */}
                                {activeTab === 'security' && (
                                    <div className="space-y-8">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Change Password</h2>
                                            <form onSubmit={handlePasswordChange} className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Current Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPasswords.current ? 'text' : 'password'}
                                                            value={passwordData.currentPassword}
                                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                            className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                        >
                                                            {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        New Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPasswords.new ? 'text' : 'password'}
                                                            value={passwordData.newPassword}
                                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                            className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                        >
                                                            {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Confirm New Password
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPasswords.confirm ? 'text' : 'password'}
                                                            value={passwordData.confirmPassword}
                                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                            className="w-full px-4 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                                                            required
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                                        >
                                                            {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <Lock className="h-4 w-4" />
                                                    {loading ? 'Changing...' : 'Change Password'}
                                                </button>
                                            </form>
                                        </div>

                                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                Logout from all devices except this one
                                            </p>
                                            <button
                                                onClick={handleLogoutAll}
                                                className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                                            >
                                                Logout All Devices
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Preferences Tab */}
                                {activeTab === 'preferences' && (
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h2>
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive email notifications about your account</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={preferences.emailNotifications}
                                                        onChange={(e) => setPreferences({ ...preferences, emailNotifications: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 dark:text-white">Marketing Emails</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Receive emails about new features and updates</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={preferences.marketingEmails}
                                                        onChange={(e) => setPreferences({ ...preferences, marketingEmails: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="font-medium text-gray-900 dark:text-white">Resume Reminders</h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">Get reminders to update your resume</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={preferences.resumeReminders}
                                                        onChange={(e) => setPreferences({ ...preferences, resumeReminders: e.target.checked })}
                                                        className="sr-only peer"
                                                    />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                </label>
                                            </div>

                                            <button
                                                onClick={handlePreferencesUpdate}
                                                disabled={loading}
                                                className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Save className="h-4 w-4" />
                                                {loading ? 'Saving...' : 'Save Preferences'}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Danger Zone Tab */}
                                {activeTab === 'danger' && (
                                    <div>
                                        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-6">Danger Zone</h2>
                                        <div className="space-y-6">
                                            <div className="border border-red-200 dark:border-red-800 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
                                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Delete Account</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                                    Once you delete your account, there is no going back. Please be certain.
                                                </p>
                                                <button
                                                    onClick={handleDeleteAccount}
                                                    className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete Account
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Settings;
