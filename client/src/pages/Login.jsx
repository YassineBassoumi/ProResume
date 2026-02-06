import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '@/services/api';
import ThemeToggle from '@/components/ThemeToggle';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authAPI.login(formData);
            navigate('/dashboard');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.msg ||
                'Login failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden p-4 md:p-6 font-display">
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>
            <div className="layout-container flex h-full grow flex-col items-center justify-center w-full max-w-md">
                <div className="flex w-full flex-col gap-8">
                    <header className="flex flex-col items-center justify-center whitespace-nowrap text-center">
                        <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                            <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z" fill="currentColor"></path>
                                <path clipRule="evenodd" d="M10.4485 13.8519C10.4749 13.9271 10.6203 14.246 11.379 14.7361C12.298 15.3298 13.7492 15.9145 15.6717 16.3735C18.0007 16.9296 20.8712 17.2655 24 17.2655C27.1288 17.2655 29.9993 16.9296 32.3283 16.3735C34.2508 15.9145 35.702 15.3298 36.621 14.7361C37.3796 14.246 37.5251 13.9271 37.5515 13.8519C37.5287 13.7876 37.4333 13.5973 37.0635 13.2931C36.5266 12.8516 35.6288 12.3647 34.343 11.9175C31.79 11.0295 28.1333 10.4437 24 10.4437C19.8667 10.4437 16.2099 11.0295 13.657 11.9175C12.3712 12.3647 11.4734 12.8516 10.9365 13.2931C10.5667 13.5973 10.4713 13.7876 10.4485 13.8519ZM37.5563 18.7877C36.3176 19.3925 34.8502 19.8839 33.2571 20.2642C30.5836 20.9025 27.3973 21.2655 24 21.2655C20.6027 21.2655 17.4164 20.9025 14.7429 20.2642C13.1498 19.8839 11.6824 19.3925 10.4436 18.7877V34.1275C10.4515 34.1545 10.5427 34.4867 11.379 35.027C12.298 35.6207 13.7492 36.2054 15.6717 36.6644C18.0007 37.2205 20.8712 37.5564 24 37.5564C27.1288 37.5564 29.9993 37.2205 32.3283 36.6644C34.2508 36.2054 35.702 35.6207 36.621 35.027C37.4573 34.4867 37.5485 34.1546 37.5563 34.1275V18.7877ZM41.5563 13.8546V34.1455C41.5563 36.1078 40.158 37.5042 38.7915 38.3869C37.3498 39.3182 35.4192 40.0389 33.2571 40.5551C30.5836 41.1934 27.3973 41.5564 24 41.5564C20.6027 41.5564 17.4164 41.1934 14.7429 40.5551C12.5808 40.0389 10.6502 39.3182 9.20848 38.3869C7.84205 37.5042 6.44365 36.1078 6.44365 34.1455L6.44365 13.8546C6.44365 12.2684 7.37223 11.0454 8.39581 10.2036C9.43325 9.3505 10.8137 8.67141 12.343 8.13948C15.4203 7.06909 19.5418 6.44366 24 6.44366C28.4582 6.44366 32.5797 7.06909 35.657 8.13948C37.1863 8.67141 38.5667 9.3505 39.6042 10.2036C40.6278 11.0454 41.5563 12.2684 41.5563 13.8546Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">ProResume</h2>
                        </div>
                    </header>
                    <div className="flex w-full flex-col gap-8 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-background-dark/50 md:p-8">
                        <div className="flex flex-col gap-2 text-center">
                            <p className="text-2xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white md:text-3xl">Sign In</p>
                            <p className="text-base font-normal leading-normal text-gray-500 dark:text-gray-400">Enter your credentials to access your account.</p>
                        </div>

                        {error && (
                            <div className="px-4 py-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                            <label className="flex flex-col">
                                <p className="pb-2 text-sm font-medium leading-normal text-gray-900 dark:text-gray-200">Email Address</p>
                                <div className="relative flex w-full items-center">
                                    <span className="material-symbols-outlined absolute left-3 text-lg text-gray-400">mail</span>
                                    <input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 pl-10 text-base font-normal leading-normal text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </label>
                            <div className="flex flex-col gap-2">
                                <label className="flex flex-col">
                                    <p className="pb-2 text-sm font-medium leading-normal text-gray-900 dark:text-gray-200">Password</p>
                                    <div className="relative flex w-full items-center">
                                        <span className="material-symbols-outlined absolute left-3 text-lg text-gray-400">lock</span>
                                        <input
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="form-input h-12 w-full flex-1 resize-none overflow-hidden rounded-lg border border-gray-300 bg-white p-3 pl-10 pr-10 text-base font-normal leading-normal text-gray-900 placeholder-gray-400 focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                                            placeholder="Enter your password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label="Toggle password visibility"
                                            className="absolute right-3 text-gray-500 dark:text-gray-400"
                                        >
                                            <span className="material-symbols-outlined text-lg">
                                                {showPassword ? 'visibility' : 'visibility_off'}
                                            </span>
                                        </button>
                                    </div>
                                </label>
                                <Link className="text-right text-sm font-medium leading-normal text-primary hover:underline" to="/forgot-password">Forgot Password?</Link>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                            >
                                {loading ? 'Signing in...' : 'Sign In'}
                            </button>
                        </form>
                        <div className="flex w-full items-center gap-4">
                            <hr className="w-full border-t border-gray-200 dark:border-gray-700" />
                            <p className="flex-shrink-0 text-sm font-normal text-gray-500 dark:text-gray-400">OR</p>
                            <hr className="w-full border-t border-gray-200 dark:border-gray-700" />
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <button 
                                type="button"
                                onClick={() => window.location.href = 'http://localhost:5001/api/auth/google'}
                                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:focus:ring-offset-background-dark"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_3034_903)"><path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.84375H12.24V14.4831H18.7328C18.452 16.0354 17.5884 17.338 16.323 18.2223V21.0421H20.19C22.4608 19.011 23.766 15.9322 23.766 12.2764Z" fill="#4285F4"></path><path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1901 21.0421L16.3231 18.2223C15.2059 18.9354 13.8665 19.3564 12.2401 19.3564C9.12653 19.3564 6.45221 17.1399 5.37219 14.2964L1.37207 14.2964V17.2112C3.33333 21.0952 7.43336 24.0008 12.2401 24.0008Z" fill="#34A853"></path><path d="M5.37219 14.2956C5.13781 13.5825 5 12.81 5 11.9992C5 11.1884 5.13781 10.4159 5.37219 9.70281V6.78809L1.37207 6.78809C0.503417 8.54922 0 10.218 0 11.9992C0 13.7804 0.503417 15.4492 1.37207 17.2104L5.37219 14.2956Z" fill="#FBBC05"></path><path d="M12.2401 4.64205C13.9634 4.64205 15.6002 5.24445 16.8533 6.44909L20.2659 3.0365C18.2059 1.15659 15.4766 0 12.2401 0C7.43336 0 3.33333 2.90562 1.37207 6.7896L5.37219 9.70438C6.45221 6.86086 9.12653 4.64205 12.2401 4.64205Z" fill="#EA4335"></path></g><defs><clipPath id="clip0_3034_903"><rect fill="white" height="24" width="24"></rect></clipPath></defs></svg>
                                <span>Sign in with Google</span>
                            </button>
                            <button 
                                type="button"
                                onClick={() => window.location.href = 'http://localhost:5001/api/auth/linkedin'}
                                className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:focus:ring-offset-background-dark"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452H24V13.26C24 9.39 23.018 6.31 18.397 6.31C16.142 6.31 14.614 7.502 13.945 8.657H13.85V6.657H10.166V20.452H13.97V14.12C13.97 12.43 14.295 10.79 16.388 10.79C18.448 10.79 18.483 12.72 18.483 14.27V20.452H20.447Z" fill="#0A66C2"></path><path d="M0.395996 6.65701H4.19999V20.452H0.395996V6.65701Z" fill="#0A66C2"></path><path d="M2.298 0C1.028 0 0 1.028 0 2.298C0 3.568 1.028 4.596 2.298 4.596C3.568 4.596 4.596 3.568 4.596 2.298C4.596 1.028 3.568 0 2.298 0Z" fill="#0A66C2"></path></svg>
                                <span>Sign in with LinkedIn</span>
                            </button>
                        </div>
                        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                            Don't have an account?{' '}
                            <Link className="font-medium text-primary hover:underline" to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
