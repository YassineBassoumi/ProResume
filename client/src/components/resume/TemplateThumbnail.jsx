import React from 'react';

const TemplateThumbnail = ({ templateId }) => {
    // Sample data for thumbnails
    const sampleData = {
        header: {
            firstName: 'SARAH',
            lastName: 'ANDERSON',
            title: 'Senior Product Manager',
            email: 'sarah.anderson@email.com',
            phone: '+1 555 123 4567',
            location: 'San Francisco, CA'
        }
    };

    // Template-specific renders - exact miniature versions matching actual templates
    const renderTemplate = () => {
        switch (templateId) {
            case 'template1':
                return (
                    <div className="w-full h-full bg-white p-2 text-gray-800 overflow-hidden" style={{ fontSize: '3px', lineHeight: '1.2' }}>
                        <div className="border-b border-gray-800 pb-1 mb-1.5">
                            <div className="font-bold uppercase tracking-wider text-gray-900" style={{ fontSize: '5px' }}>
                                {sampleData.header.firstName} {sampleData.header.lastName}
                            </div>
                            <div className="text-gray-600 mt-0.5" style={{ fontSize: '3.5px' }}>{sampleData.header.title}</div>
                            <div className="flex flex-wrap gap-1 mt-1 text-gray-600" style={{ fontSize: '2px' }}>
                                <span>{sampleData.header.email}</span>
                                <span>{sampleData.header.phone}</span>
                                <span>{sampleData.header.location}</span>
                            </div>
                        </div>
                        <div className="mb-1.5">
                            <div className="font-bold uppercase border-b border-gray-300 mb-0.5 pb-0.5 text-gray-800" style={{ fontSize: '3px' }}>
                                Professional Summary
                            </div>
                            <div className="text-gray-700" style={{ fontSize: '2px', lineHeight: '1.3' }}>
                                Innovative Senior Product Manager with 8+ years of experience driving product strategy and development.
                            </div>
                        </div>
                        <div className="mb-1.5">
                            <div className="font-bold uppercase border-b border-gray-300 mb-0.5 pb-0.5 text-gray-800" style={{ fontSize: '3px' }}>
                                Experience
                            </div>
                            <div className="mb-1">
                                <div className="flex justify-between items-baseline">
                                    <div className="font-bold text-gray-900" style={{ fontSize: '2.5px' }}>Senior Product Manager</div>
                                    <div className="text-gray-600" style={{ fontSize: '2px' }}>2020 - Present</div>
                                </div>
                                <div className="text-gray-700 font-medium" style={{ fontSize: '2px' }}>TechVision Inc</div>
                            </div>
                        </div>
                        <div className="mb-1">
                            <div className="font-bold uppercase border-b border-gray-300 mb-0.5 pb-0.5 text-gray-800" style={{ fontSize: '3px' }}>
                                Education
                            </div>
                            <div className="font-bold text-gray-900" style={{ fontSize: '2.5px' }}>MBA</div>
                        </div>
                        <div>
                            <div className="font-bold uppercase border-b border-gray-300 mb-0.5 pb-0.5 text-gray-800" style={{ fontSize: '3px' }}>
                                Skills
                            </div>
                            <div className="flex flex-wrap gap-0.5">
                                {['Product Mgmt', 'Strategy'].map((skill, i) => (
                                    <span key={i} className="bg-gray-100 px-0.5 py-0.5 rounded text-gray-800" style={{ fontSize: '2px' }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 'template2':
                return (
                    <div className="flex w-full h-full bg-white overflow-hidden">
                        <div className="w-1/3 bg-slate-800 text-white p-1.5 flex flex-col gap-1.5" style={{ fontSize: '2px' }}>
                            <div>
                                <div className="font-bold uppercase border-b border-slate-600 pb-0.5 mb-0.5 text-slate-100" style={{ fontSize: '3px' }}>
                                    Contact
                                </div>
                                <div className="flex flex-col gap-0.5 text-slate-300" style={{ fontSize: '2px' }}>
                                    <div>
                                        <div className="font-semibold text-slate-400" style={{ fontSize: '1.5px' }}>Email</div>
                                        <div className="break-all">{sampleData.header.email}</div>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-slate-400" style={{ fontSize: '1.5px' }}>Phone</div>
                                        {sampleData.header.phone}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="font-bold uppercase border-b border-slate-600 pb-0.5 mb-0.5 text-slate-100" style={{ fontSize: '3px' }}>
                                    Skills
                                </div>
                                <div className="flex flex-wrap gap-0.5">
                                    {['Product', 'Strategy'].map((skill, i) => (
                                        <span key={i} className="bg-slate-700 px-0.5 py-0.5 rounded text-slate-200" style={{ fontSize: '1.5px' }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-2/3 p-1.5 flex flex-col gap-1.5">
                            <div className="border-b-2 border-slate-800 pb-1">
                                <div className="font-bold uppercase tracking-wider text-slate-900" style={{ fontSize: '5px', lineHeight: '1.1' }}>
                                    {sampleData.header.firstName} <span className="text-slate-600">{sampleData.header.lastName}</span>
                                </div>
                                <div className="text-slate-500 mt-0.5 font-medium tracking-wide" style={{ fontSize: '3px' }}>{sampleData.header.title}</div>
                            </div>
                            <div>
                                <div className="font-bold uppercase tracking-wider text-slate-800 mb-0.5 flex items-center gap-0.5" style={{ fontSize: '3px' }}>
                                    <span className="w-1.5 bg-slate-800 inline-block" style={{ height: '0.5px' }}></span>
                                    Profile
                                </div>
                                <div className="text-gray-700" style={{ fontSize: '2px', lineHeight: '1.3' }}>
                                    Innovative Senior Product Manager with 8+ years of experience.
                                </div>
                            </div>
                            <div>
                                <div className="font-bold uppercase tracking-wider text-slate-800 mb-0.5 flex items-center gap-0.5" style={{ fontSize: '3px' }}>
                                    <span className="w-1.5 bg-slate-800 inline-block" style={{ height: '0.5px' }}></span>
                                    Experience
                                </div>
                                <div className="relative pl-1 border-l border-slate-200">
                                    <div className="absolute -left-px top-0.5 w-0.5 h-0.5 rounded-full bg-slate-400"></div>
                                    <div className="font-bold text-slate-900" style={{ fontSize: '2.5px' }}>Senior Product Manager</div>
                                    <div className="font-semibold text-slate-700" style={{ fontSize: '2px' }}>TechVision Inc</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'template3':
                return (
                    <div className="flex flex-col w-full h-full bg-white overflow-hidden">
                        <div className="bg-teal-600 text-white p-1.5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="font-black tracking-tight" style={{ fontSize: '6px', lineHeight: '1.1' }}>
                                        {sampleData.header.firstName} <span className="text-teal-200">{sampleData.header.lastName}</span>
                                    </div>
                                    <div className="font-light tracking-wide opacity-90 mt-0.5" style={{ fontSize: '3px' }}>{sampleData.header.title}</div>
                                </div>
                                <div className="text-right space-y-0.5 opacity-90" style={{ fontSize: '1.5px' }}>
                                    <div>{sampleData.header.email}</div>
                                    <div>{sampleData.header.phone}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 p-1.5 gap-1.5">
                            <div className="w-2/3 flex flex-col gap-1.5">
                                <div>
                                    <div className="font-bold text-teal-700 mb-0.5 border-b border-teal-100 pb-0.5" style={{ fontSize: '3px' }}>
                                        About Me
                                    </div>
                                    <div className="text-gray-700" style={{ fontSize: '2px', lineHeight: '1.3' }}>
                                        Innovative Senior Product Manager with 8+ years of experience.
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-teal-700 mb-0.5 border-b border-teal-100 pb-0.5" style={{ fontSize: '3px' }}>
                                        Experience
                                    </div>
                                    <div className="font-bold text-gray-900" style={{ fontSize: '3px' }}>Senior Product Manager</div>
                                    <div className="font-semibold text-gray-700" style={{ fontSize: '2.5px' }}>TechVision Inc</div>
                                </div>
                                <div>
                                    <div className="font-bold text-teal-700 mb-0.5 border-b border-teal-100 pb-0.5" style={{ fontSize: '3px' }}>
                                        Projects
                                    </div>
                                    <div className="bg-gray-50 p-1 rounded border border-gray-100">
                                        <div className="font-bold text-gray-900" style={{ fontSize: '2.5px' }}>Mobile App Redesign</div>
                                        <div className="flex flex-wrap gap-0.5 mt-0.5">
                                            {['React', 'Firebase'].map((tech, i) => (
                                                <span key={i} className="bg-white border border-gray-200 px-0.5 py-0.5 rounded text-gray-600" style={{ fontSize: '1.5px' }}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 flex flex-col gap-1.5">
                                <div>
                                    <div className="font-bold text-teal-700 mb-0.5 border-b border-teal-100 pb-0.5" style={{ fontSize: '3px' }}>
                                        Skills
                                    </div>
                                    <div className="flex flex-wrap gap-0.5">
                                        {['Product', 'Strategy'].map((skill, i) => (
                                            <span key={i} className="bg-teal-50 text-teal-800 px-0.5 py-0.5 rounded-full font-medium border border-teal-100" style={{ fontSize: '2px' }}>
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-teal-700 mb-0.5 border-b border-teal-100 pb-0.5" style={{ fontSize: '3px' }}>
                                        Education
                                    </div>
                                    <div className="font-bold text-gray-900" style={{ fontSize: '2.5px' }}>Stanford</div>
                                    <div className="text-gray-700 font-medium" style={{ fontSize: '2px' }}>MBA</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="w-full h-full bg-white flex items-center justify-center text-gray-400">
                        <div className="text-center">
                            <div style={{ fontSize: '8px' }} className="font-bold">Resume</div>
                            <div style={{ fontSize: '4px' }}>Template Preview</div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-64 bg-gray-100 dark:bg-gray-900 p-4 rounded-t-xl flex items-center justify-center">
            <div className="w-40 h-52 transform hover:scale-105 transition-transform duration-200 shadow-lg">
                {renderTemplate()}
            </div>
        </div>
    );
};

export default TemplateThumbnail;
