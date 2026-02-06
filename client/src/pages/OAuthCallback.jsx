import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const accessToken = searchParams.get('accessToken');
        const refreshToken = searchParams.get('refreshToken');
        const userId = searchParams.get('userId');
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const error = searchParams.get('error');

        if (error) {
            navigate('/login?error=oauth_failed');
            return;
        }

        if (accessToken && refreshToken && userId) {
            // Store tokens and user info
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify({
                _id: userId,
                name: decodeURIComponent(name),
                email: decodeURIComponent(email),
            }));

            // Redirect to dashboard
            navigate('/dashboard');
        } else {
            navigate('/login?error=oauth_failed');
        }
    }, [searchParams, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="text-center">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Completing sign in...</p>
            </div>
        </div>
    );
};

export default OAuthCallback;
