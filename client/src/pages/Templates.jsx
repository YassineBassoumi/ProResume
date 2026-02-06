import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FileText, ArrowLeft, Check, Palette, Briefcase, Code, GraduationCap, Building2 } from 'lucide-react';
import TemplateThumbnail from '@/components/resume/TemplateThumbnail';

const Templates = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        {
            id: 'all',
            name: 'All Templates',
            icon: Palette,
            description: 'Browse all available templates'
        },
        {
            id: 'creative',
            name: 'Creative / Design',
            icon: Palette,
            description: 'For Graphic Designers, Architects, Artists',
            style: 'Colorful, unique fonts, space for photo/logo, non-standard layouts'
        },
        {
            id: 'corporate',
            name: 'Corporate / Professional',
            icon: Briefcase,
            description: 'For Accountants, Lawyers, Managers, Admins',
            style: 'Conservative, black & white, standard serif fonts, very structured'
        },
        {
            id: 'tech',
            name: 'Tech / Engineering',
            icon: Code,
            description: 'For Developers, Engineers, Data Scientists',
            style: 'Clean, modern, emphasizes Skills and Projects sections'
        },
        {
            id: 'academic',
            name: 'Academic / Medical',
            icon: GraduationCap,
            description: 'For Professors, Doctors, Researchers',
            style: 'Text-heavy, simple list format, focuses on Publications and Education'
        },
        {
            id: 'entry',
            name: 'Entry-Level / Student',
            icon: GraduationCap,
            description: 'For Students and Recent Graduates',
            style: 'Focuses on Education and Soft Skills, larger fonts'
        }
    ];

    const templates = [
        // Corporate / Professional
        {
            id: 'template1',
            name: 'Modern Professional',
            description: 'Clean and contemporary design with centered headers',
            features: ['Centered layout', 'Professional aesthetics', 'Easy to read'],
            category: 'corporate',
            popular: true
        },
        {
            id: 'template2',
            name: 'Executive Sidebar',
            description: 'Sidebar layout with dark accent colors',
            features: ['Sidebar design', 'Dark accents', 'Classic style'],
            category: 'corporate'
        },
        
        // Creative / Design
        {
            id: 'template3',
            name: 'Creative Teal',
            description: 'Bold teal header with two-column layout',
            features: ['Bold teal header', 'Two-column design', 'Project showcase'],
            category: 'creative',
            popular: true
        },
        
        // Tech / Engineering
        {
            id: 'template4',
            name: 'Tech Stack',
            description: 'Modern tech-focused design emphasizing skills',
            features: ['Skills highlight', 'Projects section', 'Clean modern look'],
            category: 'tech',
            popular: true
        },
        {
            id: 'template5',
            name: 'Developer Pro',
            description: 'Terminal-inspired minimalist design',
            features: ['Terminal style', 'Code-friendly', 'Monospace fonts'],
            category: 'tech'
        },
        
        // Academic / Medical
        {
            id: 'template6',
            name: 'Academic CV',
            description: 'Traditional CV format for academic positions',
            features: ['Publications section', 'Research focus', 'Multi-page support'],
            category: 'academic'
        },
        {
            id: 'template7',
            name: 'Medical Professional',
            description: 'Structured format for healthcare professionals',
            features: ['Certifications focus', 'Clinical experience', 'Professional layout'],
            category: 'academic',
            popular: true
        },
        
        // Entry-Level / Student
        {
            id: 'template8',
            name: 'Student Fresh',
            description: 'Perfect for students and recent graduates',
            features: ['Education highlight', 'Soft skills focus', 'Clean layout'],
            category: 'entry',
            popular: true
        },
        {
            id: 'template9',
            name: 'Entry Level',
            description: 'Ideal for first-time job seekers',
            features: ['Coursework section', 'Volunteer work', 'Skills emphasis'],
            category: 'entry'
        }
    ];

    const filteredTemplates = selectedCategory === 'all' 
        ? templates 
        : templates.filter(t => t.category === selectedCategory);

    const handleSelectTemplate = (templateId, comingSoon) => {
        if (comingSoon) {
            return; // Do nothing for coming soon templates
        }
        navigate(`/resume-builder?template=${templateId}`);
    };

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200 font-display">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        </button>
                        <div className="flex items-center gap-2">
                            <FileText className="text-primary h-6 w-6" />
                            <span className="text-lg font-bold text-gray-800 dark:text-white">ProResume</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-6 py-8 md:py-12">
                <div className="max-w-7xl mx-auto">
                    {/* Page Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Choose Your Template
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Select a template based on your industry and career level.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-10">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Filter by Industry
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((category) => {
                                const Icon = category.icon;
                                const isActive = selectedCategory === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                                            isActive
                                                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <Icon className={`h-6 w-6 flex-shrink-0 ${
                                                isActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
                                            }`} />
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-semibold mb-1 ${
                                                    isActive 
                                                        ? 'text-primary' 
                                                        : 'text-gray-900 dark:text-white'
                                                }`}>
                                                    {category.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {category.description}
                                                </p>
                                                {category.style && (
                                                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 italic">
                                                        {category.style}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-gray-600 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredTemplates.length}</span> template{filteredTemplates.length !== 1 ? 's' : ''}
                            {selectedCategory !== 'all' && (
                                <span> in <span className="font-semibold text-primary">
                                    {categories.find(c => c.id === selectedCategory)?.name}
                                </span></span>
                            )}
                        </p>
                    </div>

                    {/* Templates Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTemplates.map((template) => (
                            <div
                                key={template.id}
                                className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all duration-300 overflow-hidden border-2 border-gray-200 dark:border-gray-700 ${
                                    template.comingSoon 
                                        ? 'opacity-75' 
                                        : 'hover:shadow-xl hover:border-primary dark:hover:border-primary'
                                }`}
                            >
                                {/* Popular Badge */}
                                {template.popular && !template.comingSoon && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Popular
                                        </span>
                                    </div>
                                )}

                                {/* Coming Soon Badge */}
                                {template.comingSoon && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Coming Soon
                                        </span>
                                    </div>
                                )}

                                {/* Template Preview */}
                                {template.comingSoon ? (
                                    <div className="w-full h-64 bg-gray-100 dark:bg-gray-900 p-4 rounded-t-xl flex items-center justify-center">
                                        <div className="text-center">
                                            <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                            <p className="text-sm text-gray-500 dark:text-gray-500 italic">
                                                Preview coming soon
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <TemplateThumbnail templateId={template.id} />
                                )}

                                {/* Template Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {template.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        {template.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2 mb-6">
                                        {template.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Select Button */}
                                    <button
                                        onClick={() => handleSelectTemplate(template.id, template.comingSoon)}
                                        disabled={template.comingSoon}
                                        className={`w-full py-3 px-4 font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 ${
                                            template.comingSoon
                                                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
                                                : 'bg-primary text-white hover:bg-blue-600'
                                        }`}
                                    >
                                        {template.comingSoon ? 'Coming Soon' : 'Use This Template'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredTemplates.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                No templates found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Try selecting a different category
                            </p>
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                View All Templates
                            </button>
                        </div>
                    )}

                    {/* Bottom CTA */}
                    {filteredTemplates.length > 0 && (
                        <div className="mt-16 text-center">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                Not sure which template to choose?
                            </p>
                            <button
                                onClick={() => handleSelectTemplate('template1')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                                Start with Most Popular
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Templates;
