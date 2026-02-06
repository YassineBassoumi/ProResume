import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '@/services/api';
import ThemeToggle from '@/components/ThemeToggle';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
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

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            const { confirmPassword, ...signupData } = formData;
            const response = await authAPI.signup(signupData);
            // Redirect to verification pending page
            navigate('/verification-pending', { state: { email: formData.email } });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.msg ||
                'Signup failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display">
            <div className="absolute top-4 right-4 z-10">
                <ThemeToggle />
            </div>
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col w-full flex-1">
                        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                            {/* Left Pane */}
                            <div className="relative hidden lg:flex flex-col items-center justify-center p-12 bg-gray-100 dark:bg-gray-900/50">
                                <div className="absolute top-8 left-8 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary text-3xl">description</span>
                                    <p className="text-xl font-bold text-gray-800 dark:text-white">ProResume</p>
                                </div>
                                <div className="flex flex-col max-w-md w-full gap-8">
                                    <div
                                        className="w-full aspect-[4/3] rounded-xl bg-cover bg-center"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD8xIzjA3Qqkk8UtDPFb7Aq0WdrvgrGm_tNYBBRXHWv27qDrBwsUUXcoUvFsCqsrTNzZCU7uSrpNlfSmIFmOm4H2vQ20wHaRVdG8ZQpfj9zgIQPyo6GQMvIPb6M0eQtwupfeARFmFEYL0J2AaqqviSsNWAjGjqoV4DXg-lPzXtsmGSqspdfgOoccWYg24TcITgD5QiLMkL9whx2LXNBZvkjVIPv08NeH9FCbIa8haolaEg51PbfhCSCHHV-soeyOpUzmqsc752V1PWD")' }}
                                    ></div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-gray-900 dark:text-gray-100 tracking-tight text-[32px] font-bold leading-tight text-left">Craft Your Professional Story.</h1>
                                        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">Build a standout resume in minutes and land your dream job.</p>
                                    </div>
                                </div>
                            </div>
                            {/* Right Pane */}
                            <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-background-light dark:bg-background-dark">
                                <div className="flex w-full max-w-md flex-col gap-8">
                                    <div className="flex flex-col gap-2 text-center lg:text-left">
                                        <p className="text-gray-900 dark:text-gray-100 text-4xl font-black leading-tight tracking-[-0.033em]">Get Started for Free</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">Create your account to start building your professional resume.</p>
                                    </div>

                                    {error && (
                                        <div className="px-4 py-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                        <label className="flex flex-col w-full">
                                            <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">Full Name</p>
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark focus:border-primary dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </label>
                                        <label className="flex flex-col w-full">
                                            <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">Email</p>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark focus:border-primary dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </label>
                                        <div className="relative">
                                            <label className="flex flex-col w-full">
                                                <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">Password</p>
                                                <input
                                                    name="password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark focus:border-primary dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] pr-10 text-base font-normal leading-normal"
                                                    placeholder="Enter your password"
                                                    required
                                                />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label="Toggle password visibility"
                                                className="absolute right-3 top-[calc(50%+2px)] text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                            >
                                                <span className="material-symbols-outlined text-xl">
                                                    {showPassword ? 'visibility' : 'visibility_off'}
                                                </span>
                                            </button>
                                        </div>
                                        <label className="flex flex-col w-full">
                                            <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">Confirm Password</p>
                                            <input
                                                name="confirmPassword"
                                                type="password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-300 dark:border-gray-700 bg-white dark:bg-background-dark focus:border-primary dark:focus:border-primary h-12 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
                                                placeholder="Confirm your password"
                                                required
                                            />
                                        </label>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex items-center justify-center h-12 px-6 rounded-lg bg-primary text-white text-base font-medium transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
                                        >
                                            {loading ? 'Creating Account...' : 'Create Account'}
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
                                            <span>Sign up with Google</span>
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => window.location.href = 'http://localhost:5001/api/auth/linkedin'}
                                            className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50 dark:focus:ring-offset-background-dark"
                                        >
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452H24V13.26C24 9.39 23.018 6.31 18.397 6.31C16.142 6.31 14.614 7.502 13.945 8.657H13.85V6.657H10.166V20.452H13.97V14.12C13.97 12.43 14.295 10.79 16.388 10.79C18.448 10.79 18.483 12.72 18.483 14.27V20.452H20.447Z" fill="#0A66C2"></path><path d="M0.395996 6.65701H4.19999V20.452H0.395996V6.65701Z" fill="#0A66C2"></path><path d="M2.298 0C1.028 0 0 1.028 0 2.298C0 3.568 1.028 4.596 2.298 4.596C3.568 4.596 4.596 3.568 4.596 2.298C4.596 1.028 3.568 0 2.298 0Z" fill="#0A66C2"></path></svg>
                                            <span>Sign up with LinkedIn</span>
                                        </button>
                                    </div>
                                    <p className="text-center text-gray-600 dark:text-gray-400">
                                        Already have an account? <Link className="font-medium text-primary hover:underline" to="/login">Sign In</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
