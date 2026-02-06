import React from 'react';

// Template 6: Academic CV - Traditional academic curriculum vitae
const Template6 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="bg-white min-h-[11in] w-[8.5in] p-10 shadow-lg text-gray-900 font-serif" id="resume-preview">
            {/* Header - Centered Academic Style */}
            <header className="text-center border-b-2 border-gray-400 pb-6 mb-6">
                <h1 className="text-3xl font-bold mb-2">
                    {header?.firstName} {header?.lastName}
                </h1>
                <p className="text-lg text-gray-700 mb-3">{header?.title}</p>
                
                <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-center gap-3 flex-wrap">
                        {header?.email && <span>{header.email}</span>}
                        {header?.phone && <span>•</span>}
                        {header?.phone && <span>{header.phone}</span>}
                    </div>
                    <div className="flex justify-center gap-3 flex-wrap">
                        {header?.location && <span>{header.location}</span>}
                        {header?.linkedin && <span>•</span>}
                        {header?.linkedin && (
                            <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                                LinkedIn Profile
                            </a>
                        )}
                    </div>
                </div>
            </header>

            {/* Research Interests / Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Research Interests
                    </h2>
                    <div
                        className="text-sm leading-relaxed text-gray-800 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                    <span className="text-sm text-gray-600">
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <p className="text-gray-800 italic">{edu.school}, {edu.location}</p>
                                {edu.fieldOfStudy && (
                                    <p className="text-sm text-gray-700 mt-1">Field of Study: {edu.fieldOfStudy}</p>
                                )}
                                {edu.description && (
                                    <div
                                        className="text-sm text-gray-700 mt-2 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: edu.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Academic Experience / Professional Appointments */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Professional Appointments
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                    <span className="text-sm text-gray-600">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <p className="text-gray-800 italic">{exp.company}, {exp.location}</p>
                                <div
                                    className="text-sm text-gray-700 mt-2 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: exp.description }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Publications (using Projects section) */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Publications
                    </h2>
                    <div className="space-y-3">
                        {projects.map((project, index) => (
                            <div key={index} className="pl-6 relative">
                                <span className="absolute left-0 top-1 text-gray-600">{index + 1}.</span>
                                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                                <div
                                    className="text-sm text-gray-700 mt-1 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-700 hover:underline mt-1 inline-block">
                                        [View Publication]
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Research Skills / Technical Skills */}
            {skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Research Skills & Expertise
                    </h2>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                        {skills.map((skill, index) => (
                            <div key={index} className="text-sm text-gray-800">
                                • {skill.name} {skill.level && `(${skill.level})`}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications & Professional Development */}
            {certifications?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Certifications & Professional Development
                    </h2>
                    <div className="space-y-2">
                        {certifications.map((cert, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                                    {cert.date && (
                                        <span className="text-sm text-gray-600">{cert.date}</span>
                                    )}
                                </div>
                                {cert.issuer && (
                                    <p className="text-sm text-gray-700 italic">{cert.issuer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Honors & Awards */}
            {awards?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Honors & Awards
                    </h2>
                    <div className="space-y-2">
                        {awards.map((award, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-semibold text-gray-900 text-sm">{award.title}</h3>
                                    {award.date && (
                                        <span className="text-sm text-gray-600">{award.date}</span>
                                    )}
                                </div>
                                {award.awarder && (
                                    <p className="text-sm text-gray-700 italic">{award.awarder}</p>
                                )}
                                {award.description && (
                                    <p className="text-sm text-gray-700 mt-1">{award.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
                        Languages
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {languages.map((lang, index) => (
                            <span key={index} className="text-sm text-gray-800">
                                {lang.name} ({lang.proficiency})
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-gray-300 text-center text-xs text-gray-500">
                <p>Curriculum Vitae - {header?.firstName} {header?.lastName}</p>
            </div>
        </div>
    );
};

export default Template6;
