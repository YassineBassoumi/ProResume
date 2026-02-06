import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authAPI } from '@/services/api';

const VerificationPending = () => {
    const location = useLocation();
    const email = location.state?.email || '';
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleResendEmail = async () => {
        setLoading(true);
        setError('');
        setMessage('');

        try {
            await authAPI.resendVerification({ email });
            setMessage('Verification email sent! Please check your inbox.');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to resend email. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden p-4 md:p-6 font-display">
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
                        <div className="flex flex-col gap-4 text-center items-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <span className="material-symbols-outlined text-4xl text-primary">mail</span>
                            </div>
                            <p className="text-2xl font-black leading-tight tracking-[-0.033em] text-gray-900 dark:text-white">Verify Your Email</p>
                            <p className="text-base font-normal leading-normal text-gray-500 dark:text-gray-400">
                                We've sent a verification email to <strong>{email}</strong>. Please check your inbox and click the verification link to activate your account.
                            </p>

                            {message && (
                                <div className="px-4 py-3 rounded-md bg-green-50 text-green-600 text-sm border border-green-200 w-full">
                                    {message}
                                </div>
                            )}

                            {error && (
                                <div className="px-4 py-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200 w-full">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-col gap-3 w-full">
                                <button
                                    onClick={handleResendEmail}
                                    disabled={loading}
                                    className="flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Resend Verification Email'}
                                </button>
                                <Link 
                                    to="/login"
                                    className="flex h-12 w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-6 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300/50 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700/50"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationPending;
