import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { resumeAPI } from '@/services/api';
import HeaderForm from '@/components/resume/HeaderForm';
import SummaryForm from '@/components/resume/SummaryForm';
import ExperienceForm from '@/components/resume/ExperienceForm';
import EducationForm from '@/components/resume/EducationForm';
import SkillsForm from '@/components/resume/SkillsForm';
import ProjectsForm from '@/components/resume/ProjectsForm';
import LanguagesForm from '@/components/resume/LanguagesForm';
import CertificationsForm from '@/components/resume/CertificationsForm';
import AwardsForm from '@/components/resume/AwardsForm';
import ResumePreview from '@/components/resume/ResumePreview';

const ResumeBuilder = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const resumeId = searchParams.get('id');

    const resumeRef = useRef(null);
    const autoSaveTimerRef = useRef(null);

    const [activeTab, setActiveTab] = useState('contact');
    const [isDownloading, setIsDownloading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [saveError, setSaveError] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(
        searchParams.get('template') || 'template1'
    );
    const [resumeData, setResumeData] = useState({
        header: {
            firstName: '',
            lastName: '',
            title: '',
            email: '',
            phone: '',
            location: '',
            linkedin: '',
            portfolio: '',
        },
        summary: '',
        experience: [],
        education: [],
        skills: [],
        projects: [],
        languages: [],
        certifications: [],
        awards: [],
    });

    const handleResumeChange = (section, value) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: value,
        }));
        // Trigger auto-save after data change
        scheduleAutoSave();
    };

    const handleHeaderChange = (field, value) => {
        setResumeData((prev) => ({
            ...prev,
            header: { ...prev.header, [field]: value }
        }));
        // Trigger auto-save after data change
        scheduleAutoSave();
    };

    // Auto-save functionality - debounced to every 30 seconds
    const scheduleAutoSave = () => {
        // Clear existing timer
        if (autoSaveTimerRef.current) {
            clearTimeout(autoSaveTimerRef.current);
        }

        // Set new timer for 30 seconds
        autoSaveTimerRef.current = setTimeout(() => {
            if (resumeId) {
                handleSaveResume(true); // Auto-save
            }
        }, 30000); // 30 seconds
    };

    // Load existing resume on mount if editing
    useEffect(() => {
        const loadResume = async () => {
            if (resumeId) {
                try {
                    const response = await resumeAPI.getById(resumeId);
                    if (response.success) {
                        setResumeData(response.data);
                        setLastSaved(new Date(response.data.updatedAt));
                    }
                } catch (error) {
                    console.error('Error loading resume:', error);
                    setSaveError('Failed to load resume');
                }
            }
        };
        loadResume();

        // Cleanup timer on unmount
        return () => {
            if (autoSaveTimerRef.current) {
                clearTimeout(autoSaveTimerRef.current);
            }
        };
    }, [resumeId]);

    // Save resume function
    const handleSaveResume = async (isAutoSave = false) => {
        setIsSaving(true);
        setSaveError(null);

        try {
            let response;

            if (resumeId) {
                // Update existing resume
                response = await resumeAPI.update(resumeId, resumeData);
            } else {
                // Create new resume
                // Generate default title from name or use "My Resume"
                const title = resumeData.header.firstName
                    ? `${resumeData.header.firstName} ${resumeData.header.lastName || ''} Resume`.trim()
                    : 'My Resume';

                response = await resumeAPI.create({
                    ...resumeData,
                    title,
                });

                // Update URL with new resume ID without reloading
                if (response.success && response.data._id) {
                    window.history.replaceState(null, '', `/resume-builder?id=${response.data._id}`);
                }
            }

            if (response.success) {
                setLastSaved(new Date());
                if (!isAutoSave) {
                    // Show success message for manual saves
                    setTimeout(() => setSaveError(null), 3000);
                }
            }
        } catch (error) {
            console.error('Error saving resume:', error);
            setSaveError(error.response?.data?.message || 'Failed to save resume');
        } finally {
            setIsSaving(false);
        }
    };

    const tabs = [
        { id: 'contact', label: 'Contact Info', icon: 'person' },
        { id: 'experience', label: 'Experience', icon: 'work' },
        { id: 'education', label: 'Education', icon: 'school' },
        { id: 'skills', label: 'Skills', icon: 'psychology' },
        { id: 'more', label: 'More', icon: 'add' },
    ];

    const handleDownloadPDF = async () => {
        if (!resumeRef.current) {
            alert('Resume preview not found. Please try again.');
            return;
        }

        setIsDownloading(true);

        try {
            // Generate filename from user's name or use default
            const firstName = resumeData.header.firstName || 'resume';
            const lastName = resumeData.header.lastName || '';
            const filename = `${firstName}${lastName ? '_' + lastName : ''}_resume.pdf`;

            // Configure PDF options
            const options = {
                margin: 0,
                filename: filename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    letterRendering: true,
                    scrollY: 0,
                    scrollX: 0
                },
                jsPDF: {
                    unit: 'in',
                    format: 'letter',
                    orientation: 'portrait'
                }
            };

            // Generate and download PDF
            await html2pdf().set(options).from(resumeRef.current).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="sticky top-0 z-20 flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7ebf3] dark:border-gray-700 px-4 sm:px-6 lg:px-10 py-3 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
                <div className="flex items-center gap-4 text-[#0d121b] dark:text-white">
                    <div className="size-6 text-primary cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-[#0d121b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Resume Builder</h2>
                </div>
                <div className="flex items-center gap-2">
                    {/* Last Saved Indicator */}
                    {lastSaved && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                            Last saved: {lastSaved.toLocaleTimeString()}
                        </span>
                    )}

                    {/* Save Error */}
                    {saveError && (
                        <span className="text-sm text-red-500 hidden sm:block">
                            {saveError}
                        </span>
                    )}

                    {/* Save Button */}
                    <button
                        onClick={() => handleSaveResume(false)}
                        disabled={isSaving}
                        className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 text-sm font-medium leading-normal hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed gap-2">
                        {isSaving && (
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span className="material-symbols-outlined text-base">save</span>
                        <span className="truncate">{isSaving ? 'Saving...' : 'Save'}</span>
                    </button>

                    {/* Download PDF Button */}
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed gap-2"
                    >
                        {isDownloading && (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span className="material-symbols-outlined text-base">download</span>
                        <span className="truncate">{isDownloading ? 'Downloading...' : 'Download PDF'}</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 flex-row">
                {/* Left Panel - Form */}
                <div className="w-1/2 overflow-y-auto p-4 sm:p-6 lg:p-10">
                    {/* Tabs Navigation */}
                    <div className="border-b border-solid border-[#e7ebf3] dark:border-gray-700 mb-6">
                        <nav aria-label="Tabs" className="flex -mb-px overflow-x-auto">
                            {tabs.map((tab) => (
                                <a
                                    key={tab.id}
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveTab(tab.id);
                                    }}
                                    className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition-colors ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-[#4c669a] dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300'
                                        }`}
                                >
                                    <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Form Sections */}
                    <div className="space-y-8">
                        {activeTab === 'contact' && (
                            <>
                                <section>
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                        <div className="flex flex-col">
                                            <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em] min-w-72">Contact Information</h2>
                                            <p className="text-[#4c669a] dark:text-gray-400 text-sm font-normal">Add your personal and contact details.</p>
                                        </div>
                                    </div>
                                    <HeaderForm data={resumeData.header} onChange={handleHeaderChange} />
                                </section>

                                <section>
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                        <div className="flex flex-col">
                                            <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em] min-w-72">Professional Summary</h2>
                                            <p className="text-[#4c669a] dark:text-gray-400 text-sm font-normal">Write a brief summary of your career achievements and goals.</p>
                                        </div>
                                    </div>
                                    <SummaryForm 
                                        data={resumeData.summary} 
                                        onChange={(field, value) => handleResumeChange('summary', value)}
                                        resumeData={resumeData}
                                    />
                                </section>
                            </>
                        )}

                        {activeTab === 'experience' && (
                            <section>
                                <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                    <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em]">Work Experience</h2>
                                </div>
                                <ExperienceForm data={resumeData.experience} onChange={(value) => handleResumeChange('experience', value)} />
                            </section>
                        )}

                        {activeTab === 'education' && (
                            <section>
                                <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                    <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em]">Education</h2>
                                </div>
                                <EducationForm data={resumeData.education} onChange={(value) => handleResumeChange('education', value)} />
                            </section>
                        )}

                        {activeTab === 'skills' && (
                            <section>
                                <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                    <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em]">Skills</h2>
                                </div>
                                <SkillsForm data={resumeData.skills} onChange={(value) => handleResumeChange('skills', value)} />
                            </section>
                        )}

                        {activeTab === 'more' && (
                            <div className="flex flex-col gap-8">
                                <section>
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                        <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em]">Projects</h2>
                                    </div>
                                    <ProjectsForm data={resumeData.projects} onChange={(value) => handleResumeChange('projects', value)} />
                                </section>

                                <section>
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                        <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em]">Languages</h2>
                                    </div>
                                    <LanguagesForm data={resumeData.languages} onChange={(value) => handleResumeChange('languages', value)} />
                                </section>

                                <section>
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                        <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em]">Certifications</h2>
                                    </div>
                                    <CertificationsForm data={resumeData.certifications} onChange={(value) => handleResumeChange('certifications', value)} />
                                </section>

                                <section>
                                    <div className="flex flex-wrap justify-between gap-3 pb-4 border-b border-[#e7ebf3] dark:border-gray-700 mb-6">
                                        <h2 className="text-[#0d121b] dark:text-white text-3xl font-bold leading-tight tracking-[-0.03em]">Awards</h2>
                                    </div>
                                    <AwardsForm data={resumeData.awards} onChange={(value) => handleResumeChange('awards', value)} />
                                </section>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Preview */}
                <div className="w-1/2 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto bg-background-light dark:bg-background-dark p-4 sm:p-6 lg:p-10 border-l border-[#e7ebf3] dark:border-gray-700">
                    <ResumePreview ref={resumeRef} data={resumeData} template={selectedTemplate} />
                </div>
            </main>
        </div>
    );
};

export default ResumeBuilder;
