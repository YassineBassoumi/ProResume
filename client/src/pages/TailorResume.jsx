import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { aiAPI, resumeAPI } from '../services/api';
import { AlertCircle, CheckCircle, Sparkles, FileText, Briefcase, Wand2 } from 'lucide-react';

export default function TailorResume() {
    const navigate = useNavigate();
    const [resumeContent, setResumeContent] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedResume, setSelectedResume] = useState(null);
    const [resumes, setResumes] = useState([]);
    const [loadingResumes, setLoadingResumes] = useState(false);
    const [applyingKeywords, setApplyingKeywords] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const loadResumes = async () => {
        try {
            setLoadingResumes(true);
            const response = await resumeAPI.getAll();
            setResumes(response.data || []);
        } catch (err) {
            console.error('Error loading resumes:', err);
        } finally {
            setLoadingResumes(false);
        }
    };

    const handleLoadResume = async (resumeId) => {
        try {
            const response = await resumeAPI.getById(resumeId);
            const resume = response.data;
            setSelectedResume(resume);
            
            // Convert resume to text format
            let content = '';
            
            // Header/Personal Info
            if (resume.header) {
                const { firstName, lastName, title, email, phone, location, linkedin, portfolio } = resume.header;
                if (firstName || lastName) {
                    content += `${firstName} ${lastName}\n`;
                }
                if (title) content += `${title}\n`;
                if (email || phone) {
                    content += `${email}${email && phone ? ' | ' : ''}${phone}\n`;
                }
                if (location) content += `${location}\n`;
                if (linkedin) content += `LinkedIn: ${linkedin}\n`;
                if (portfolio) content += `Portfolio: ${portfolio}\n`;
                content += '\n';
            }
            
            // Summary
            if (resume.summary) {
                content += `PROFESSIONAL SUMMARY\n${resume.summary}\n\n`;
            }
            
            // Experience
            if (resume.experience?.length > 0) {
                content += `WORK EXPERIENCE\n`;
                resume.experience.forEach(exp => {
                    content += `${exp.position || 'Position'} at ${exp.company || 'Company'}\n`;
                    if (exp.location) content += `${exp.location}\n`;
                    content += `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}\n`;
                    if (exp.description) content += `${exp.description}\n`;
                    content += '\n';
                });
            }
            
            // Projects
            if (resume.projects?.length > 0) {
                content += `PROJECTS\n`;
                resume.projects.forEach(proj => {
                    content += `${proj.name || 'Project'}\n`;
                    if (proj.description) content += `${proj.description}\n`;
                    if (proj.technologies) content += `Technologies: ${proj.technologies}\n`;
                    if (proj.link) content += `Link: ${proj.link}\n`;
                    content += '\n';
                });
            }
            
            // Education
            if (resume.education?.length > 0) {
                content += `EDUCATION\n`;
                resume.education.forEach(edu => {
                    content += `${edu.degree || 'Degree'}${edu.field ? ' in ' + edu.field : ''}\n`;
                    content += `${edu.institution || 'Institution'}`;
                    if (edu.location) content += `, ${edu.location}`;
                    content += '\n';
                    content += `${edu.startDate || ''} - ${edu.current ? 'Present' : edu.endDate || ''}\n`;
                    if (edu.description) content += `${edu.description}\n`;
                    content += '\n';
                });
            }
            
            // Skills
            if (resume.skills?.length > 0) {
                content += `SKILLS\n`;
                const skillsList = resume.skills.map(skill => 
                    typeof skill === 'string' ? skill : `${skill.name}${skill.level ? ' (' + skill.level + ')' : ''}`
                ).join(', ');
                content += `${skillsList}\n\n`;
            }
            
            // Certifications
            if (resume.certifications?.length > 0) {
                content += `CERTIFICATIONS\n`;
                resume.certifications.forEach(cert => {
                    content += `${cert.name || 'Certification'}`;
                    if (cert.issuer) content += ` - ${cert.issuer}`;
                    if (cert.date) content += ` (${cert.date})`;
                    content += '\n';
                    if (cert.link) content += `Link: ${cert.link}\n`;
                    content += '\n';
                });
            }
            
            // Languages
            if (resume.languages?.length > 0) {
                content += `LANGUAGES\n`;
                const langList = resume.languages.map(lang => 
                    `${lang.name}${lang.proficiency ? ' (' + lang.proficiency + ')' : ''}`
                ).join(', ');
                content += `${langList}\n\n`;
            }
            
            // Awards
            if (resume.awards?.length > 0) {
                content += `AWARDS & HONORS\n`;
                resume.awards.forEach(award => {
                    content += `${award.title || 'Award'}`;
                    if (award.issuer) content += ` - ${award.issuer}`;
                    if (award.date) content += ` (${award.date})`;
                    content += '\n';
                    if (award.description) content += `${award.description}\n`;
                    content += '\n';
                });
            }
            
            setResumeContent(content.trim());
        } catch (err) {
            setError('Failed to load resume');
            console.error('Error loading resume:', err);
        }
    };

    const handleAnalyze = async () => {
        if (!resumeContent.trim() || !jobDescription.trim()) {
            setError('Please provide both resume content and job description');
            return;
        }

        setLoading(true);
        setError('');
        setAnalysis(null);
        setSuccessMessage('');

        try {
            const response = await aiAPI.tailorToJob(resumeContent, jobDescription);
            setAnalysis(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to analyze resume');
        } finally {
            setLoading(false);
        }
    };

    const handleApplyKeywords = async () => {
        if (!selectedResume || !analysis?.missingKeywords?.length) {
            setError('No resume selected or no missing keywords to apply');
            return;
        }

        setApplyingKeywords(true);
        setError('');
        setSuccessMessage('');

        try {
            // Get current resume data
            const response = await resumeAPI.getById(selectedResume._id);
            const currentResume = response.data;

            // Get existing skills
            let existingSkills = currentResume.skills || [];
            
            // Convert skills to array of strings if they're objects
            const existingSkillNames = existingSkills.map(skill => 
                typeof skill === 'string' ? skill : skill.name
            );

            // Filter out keywords that already exist (case-insensitive)
            const newKeywords = analysis.missingKeywords.filter(keyword => 
                !existingSkillNames.some(skill => 
                    skill.toLowerCase() === keyword.toLowerCase()
                )
            );

            if (newKeywords.length === 0) {
                setSuccessMessage('All missing keywords are already in your skills!');
                setApplyingKeywords(false);
                return;
            }

            // Add new keywords to skills
            const updatedSkills = [
                ...existingSkills,
                ...newKeywords.map(keyword => ({
                    name: keyword,
                    level: 'Intermediate' // Default level
                }))
            ];

            // Update the resume
            await resumeAPI.update(selectedResume._id, {
                ...currentResume,
                skills: updatedSkills
            });

            setSuccessMessage(`Successfully added ${newKeywords.length} missing keyword(s) to your resume! Re-analyzing...`);
            
            // Wait a moment for database to update
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Reload the resume to get updated content
            const updatedResponse = await resumeAPI.getById(selectedResume._id);
            const updatedResume = updatedResponse.data;
            
            // Convert updated resume to text format
            let updatedContent = '';
            
            // Header
            if (updatedResume.header) {
                const { firstName, lastName, title, email, phone, location, linkedin, portfolio } = updatedResume.header;
                if (firstName || lastName) updatedContent += `${firstName} ${lastName}\n`;
                if (title) updatedContent += `${title}\n`;
                if (email || phone) updatedContent += `${email}${email && phone ? ' | ' : ''}${phone}\n`;
                if (location) updatedContent += `${location}\n`;
                if (linkedin) updatedContent += `LinkedIn: ${linkedin}\n`;
                if (portfolio) updatedContent += `Portfolio: ${portfolio}\n`;
                updatedContent += '\n';
            }
            
            if (updatedResume.summary) updatedContent += `PROFESSIONAL SUMMARY\n${updatedResume.summary}\n\n`;
            
            if (updatedResume.experience?.length > 0) {
                updatedContent += `WORK EXPERIENCE\n`;
                updatedResume.experience.forEach(exp => {
                    updatedContent += `${exp.position || 'Position'} at ${exp.company || 'Company'}\n`;
                    if (exp.location) updatedContent += `${exp.location}\n`;
                    updatedContent += `${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''}\n`;
                    if (exp.description) updatedContent += `${exp.description}\n`;
                    updatedContent += '\n';
                });
            }
            
            if (updatedResume.projects?.length > 0) {
                updatedContent += `PROJECTS\n`;
                updatedResume.projects.forEach(proj => {
                    updatedContent += `${proj.name || 'Project'}\n`;
                    if (proj.description) updatedContent += `${proj.description}\n`;
                    if (proj.technologies) updatedContent += `Technologies: ${proj.technologies}\n`;
                    updatedContent += '\n';
                });
            }
            
            if (updatedResume.education?.length > 0) {
                updatedContent += `EDUCATION\n`;
                updatedResume.education.forEach(edu => {
                    updatedContent += `${edu.degree || 'Degree'}${edu.field ? ' in ' + edu.field : ''}\n`;
                    updatedContent += `${edu.institution || 'Institution'}${edu.location ? ', ' + edu.location : ''}\n`;
                    updatedContent += `${edu.startDate || ''} - ${edu.current ? 'Present' : edu.endDate || ''}\n`;
                    updatedContent += '\n';
                });
            }
            
            if (updatedResume.skills?.length > 0) {
                updatedContent += `SKILLS\n`;
                const skillsList = updatedResume.skills.map(skill => 
                    typeof skill === 'string' ? skill : `${skill.name}${skill.level ? ' (' + skill.level + ')' : ''}`
                ).join(', ');
                updatedContent += `${skillsList}\n\n`;
            }
            
            if (updatedResume.certifications?.length > 0) {
                updatedContent += `CERTIFICATIONS\n`;
                updatedResume.certifications.forEach(cert => {
                    updatedContent += `${cert.name || 'Certification'}${cert.issuer ? ' - ' + cert.issuer : ''}${cert.date ? ' (' + cert.date + ')' : ''}\n`;
                    updatedContent += '\n';
                });
            }
            
            if (updatedResume.languages?.length > 0) {
                updatedContent += `LANGUAGES\n`;
                const langList = updatedResume.languages.map(lang => 
                    `${lang.name}${lang.proficiency ? ' (' + lang.proficiency + ')' : ''}`
                ).join(', ');
                updatedContent += `${langList}\n\n`;
            }
            
            if (updatedResume.awards?.length > 0) {
                updatedContent += `AWARDS & HONORS\n`;
                updatedResume.awards.forEach(award => {
                    updatedContent += `${award.title || 'Award'}${award.issuer ? ' - ' + award.issuer : ''}${award.date ? ' (' + award.date + ')' : ''}\n`;
                    updatedContent += '\n';
                });
            }
            
            setResumeContent(updatedContent.trim());
            
            // Automatically re-analyze with the updated resume
            if (jobDescription.trim()) {
                setLoading(true);
                try {
                    const analysisResponse = await aiAPI.tailorToJob(updatedContent.trim(), jobDescription);
                    const oldScore = analysis.matchScore;
                    const newScore = analysisResponse.data.matchScore;
                    setAnalysis(analysisResponse.data);
                    
                    if (newScore > oldScore) {
                        setSuccessMessage(`Successfully added ${newKeywords.length} keyword(s)! Your match score improved from ${oldScore}% to ${newScore}%! 🎉`);
                    } else if (newScore === oldScore) {
                        setSuccessMessage(`Added ${newKeywords.length} keyword(s) to skills. To improve your score further, add these keywords to your work experience descriptions too!`);
                    } else {
                        setSuccessMessage(`Added ${newKeywords.length} keyword(s) to skills. Note: The AI looks for keywords in context (work experience, projects), not just in the skills list. Edit your resume to add examples of using these technologies.`);
                    }
                } catch (err) {
                    setSuccessMessage(`Successfully added ${newKeywords.length} keyword(s)! Click "Analyze Resume" to see your new score.`);
                } finally {
                    setLoading(false);
                }
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Failed to apply keywords to resume');
        } finally {
            setApplyingKeywords(false);
        }
    };

    const handleEditResume = () => {
        if (selectedResume) {
            navigate(`/resume-builder?id=${selectedResume._id}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                        <Sparkles className="w-8 h-8 text-indigo-600" />
                        Tailor Resume to Job
                    </h1>
                    <p className="text-gray-600">
                        Analyze your resume against a job description and discover missing keywords
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-red-800">{error}</p>
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <p className="text-green-800">{successMessage}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {/* Resume Input */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-indigo-600" />
                                Your Resume
                            </h2>
                            <button
                                onClick={loadResumes}
                                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                            >
                                Load from saved
                            </button>
                        </div>

                        {loadingResumes && (
                            <div className="mb-4 text-sm text-gray-600">Loading resumes...</div>
                        )}

                        {resumes.length > 0 && !loadingResumes && (
                            <select
                                onChange={(e) => handleLoadResume(e.target.value)}
                                className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">Select a resume...</option>
                                {resumes.map((resume) => (
                                    <option key={resume._id} value={resume._id}>
                                        {resume.title || 'Untitled Resume'}
                                    </option>
                                ))}
                            </select>
                        )}

                        <textarea
                            value={resumeContent}
                            onChange={(e) => setResumeContent(e.target.value)}
                            placeholder="Paste your resume content here or load from saved resumes..."
                            className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Job Description Input */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-indigo-600" />
                            Job Description
                        </h2>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => setJobDescription(e.target.value)}
                            placeholder="Paste the job description here..."
                            className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        />
                    </div>
                </div>

                {/* Analyze Button */}
                <div className="text-center mb-8">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium transition-colors flex items-center gap-2 mx-auto"
                    >
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Analyze Resume
                            </>
                        )}
                    </button>
                </div>

                {/* Analysis Results */}
                {analysis && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
                            {selectedResume && analysis.missingKeywords?.length > 0 && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleApplyKeywords}
                                        disabled={applyingKeywords}
                                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center gap-2"
                                    >
                                        {applyingKeywords ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Applying...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="w-4 h-4" />
                                                Apply Missing Keywords
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={handleEditResume}
                                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center gap-2"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Edit Resume
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Match Score */}
                        <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-lg font-semibold text-gray-900">Match Score</span>
                                <span className="text-3xl font-bold text-indigo-600">{analysis.matchScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${analysis.matchScore}%` }}
                                />
                            </div>
                        </div>

                        {/* Summary */}
                        {analysis.summary && (
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
                                <p className="text-gray-700">{analysis.summary}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Missing Keywords */}
                            <div className="p-4 bg-red-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    Missing Keywords ({analysis.missingKeywords?.length || 0})
                                </h3>
                                {selectedResume && analysis.missingKeywords?.length > 0 && (
                                    <div className="mb-3">
                                        <p className="text-sm text-gray-600 mb-2">
                                            Click "Apply Missing Keywords" to automatically add these to your resume's skills section.
                                        </p>
                                        <p className="text-xs text-gray-500 italic">
                                            Note: For best results, also mention these keywords in your work experience and project descriptions to show practical usage.
                                        </p>
                                    </div>
                                )}
                                <div className="flex flex-wrap gap-2">
                                    {analysis.missingKeywords?.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Present Keywords */}
                            <div className="p-4 bg-green-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                    Present Keywords ({analysis.presentKeywords?.length || 0})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {analysis.presentKeywords?.map((keyword, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Suggestions */}
                        {analysis.suggestions && analysis.suggestions.length > 0 && (
                            <div className="p-4 bg-yellow-50 rounded-lg">
                                <h3 className="font-semibold text-gray-900 mb-3">Suggestions for Improvement</h3>
                                <ul className="space-y-2">
                                    {analysis.suggestions.map((suggestion, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <span className="text-yellow-600 font-bold">•</span>
                                            <span className="text-gray-700">{suggestion}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                                    <p className="text-sm text-blue-800">
                                        <strong>💡 Pro Tip:</strong> Adding keywords to your skills is a good start, but also mention them in your work experience and project descriptions to show real-world usage. This significantly improves your match score!
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
