import React, { useState } from 'react';
import { Sparkles, Loader2, X } from 'lucide-react';
import aiService from '@/services/aiService';

const AIAssistant = ({ type, onApply, context = {} }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setIsLoading(true);
        setError('');
        setResult('');

        try {
            let response;

            switch (type) {
                case 'summary':
                    response = await aiService.generateSummary({
                        jobTitle: context.jobTitle || '',
                        experience: context.experience || '',
                        skills: context.skills || '',
                        industry: context.industry || ''
                    });
                    break;

                case 'description':
                    response = await aiService.improveDescription({
                        description: context.description || '',
                        jobTitle: context.jobTitle || '',
                        company: context.company || ''
                    });
                    break;

                case 'bullets':
                    response = await aiService.generateBulletPoints({
                        text: context.text || '',
                        context: context.jobTitle || ''
                    });
                    break;

                case 'skills':
                    response = await aiService.suggestSkills({
                        jobTitle: context.jobTitle || '',
                        industry: context.industry || ''
                    });
                    break;

                case 'ats':
                    response = await aiService.optimizeForATS({
                        content: context.content || '',
                        jobDescription: context.jobDescription || ''
                    });
                    break;

                default:
                    throw new Error('Invalid AI assistant type');
            }

            if (response.success) {
                setResult(response.data);
            } else {
                setError(response.message || 'Failed to generate content');
            }
        } catch (err) {
            console.error('AI Generation Error:', err);
            setError(err.response?.data?.message || 'Failed to generate content. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleApply = () => {
        if (result && onApply) {
            onApply(result);
            setIsOpen(false);
            setResult('');
        }
    };

    const getButtonText = () => {
        switch (type) {
            case 'summary':
                return 'Generate Summary';
            case 'description':
                return 'Improve with AI';
            case 'bullets':
                return 'Generate Bullets';
            case 'skills':
                return 'Suggest Skills';
            case 'ats':
                return 'Optimize for ATS';
            default:
                return 'AI Assist';
        }
    };

    const getTitle = () => {
        switch (type) {
            case 'summary':
                return 'AI-Generated Professional Summary';
            case 'description':
                return 'AI-Improved Description';
            case 'bullets':
                return 'AI-Generated Bullet Points';
            case 'skills':
                return 'AI-Suggested Skills';
            case 'ats':
                return 'ATS-Optimized Content';
            default:
                return 'AI Assistant';
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-md hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
            >
                <Sparkles className="h-4 w-4" />
                {getButtonText()}
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {getTitle()}
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {!result && !isLoading && (
                                <div className="text-center py-8">
                                    <Sparkles className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Click the button below to generate AI-powered content
                                    </p>
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isLoading}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Sparkles className="h-5 w-5" />
                                        Generate Content
                                    </button>
                                </div>
                            )}

                            {isLoading && (
                                <div className="text-center py-12">
                                    <Loader2 className="h-12 w-12 text-purple-600 animate-spin mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Generating content with AI...
                                    </p>
                                </div>
                            )}

                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                                    <p className="text-red-800 dark:text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            {result && (
                                <div className="space-y-4">
                                    <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
                                        {type === 'skills' && Array.isArray(result) ? (
                                            <div className="flex flex-wrap gap-2">
                                                {result.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200 border border-purple-200 dark:border-purple-700"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <div
                                                className="prose prose-sm dark:prose-invert max-w-none text-gray-800 dark:text-gray-200"
                                                dangerouslySetInnerHTML={{ __html: result }}
                                            />
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleGenerate}
                                            disabled={isLoading}
                                            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                                        >
                                            Regenerate
                                        </button>
                                        <button
                                            onClick={handleApply}
                                            className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                                        >
                                            Apply to Resume
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAssistant;
