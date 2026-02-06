import { useNavigate } from 'react-router-dom';
import { FileText, LogOut } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { authAPI } from '@/services/api';

const Header = ({ showLogout = true }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authAPI.logout();
        navigate('/login');
    };

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <FileText className="text-primary h-6 w-6" />
                    <span className="text-lg font-bold text-gray-800 dark:text-white">ProResume</span>
                </div>
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {showLogout && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
