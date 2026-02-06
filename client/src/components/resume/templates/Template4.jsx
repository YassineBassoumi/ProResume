import React from 'react';

// Template 4: Tech Stack - Modern tech-focused design
const Template4 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="bg-white min-h-[11in] w-[8.5in] p-8 shadow-lg text-gray-800 font-sans" id="resume-preview">
            {/* Header with left border accent */}
            <header className="border-l-4 border-blue-600 pl-6 pb-6 mb-6">
                <h1 className="text-4xl font-bold text-gray-900">
                    {header?.firstName} {header?.lastName}
                </h1>
                <p className="text-xl text-blue-600 mt-2 font-medium">{header?.title}</p>

                <div className="flex flex-wrap gap-3 mt-4 text-sm text-gray-600">
                    {header?.email && <span>{header.email}</span>}
                    {header?.phone && <span>|</span>}
                    {header?.phone && <span>{header.phone}</span>}
                    {header?.location && <span>|</span>}
                    {header?.location && <span>{header.location}</span>}
                </div>
                
                <div className="flex flex-wrap gap-3 mt-2 text-sm">
                    {header?.linkedin && (
                        <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            LinkedIn
                        </a>
                    )}
                    {header?.portfolio && (
                        <a href={header.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            GitHub/Portfolio
                        </a>
                    )}
                </div>
            </header>

            {/* Two Column Layout */}
            <div className="flex gap-8">
                {/* Main Content - Left Column */}
                <div className="w-2/3 space-y-6">
                    {/* Summary */}
                    {summary && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
                                PROFESSIONAL SUMMARY
                            </h2>
                            <div
                                className="text-sm leading-relaxed text-gray-700 prose prose-sm max-w-none"
                                dangerouslySetInnerHTML={{ __html: summary }}
                            />
                        </section>
                    )}

                    {/* Experience */}
                    {experience?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
                                EXPERIENCE
                            </h2>
                            <div className="space-y-4">
                                {experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
                                            <span className="text-sm text-gray-600 font-medium">
                                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="text-gray-700 font-semibold">{exp.company}</span>
                                            <span className="text-sm text-gray-500">{exp.location}</span>
                                        </div>
                                        <div
                                            className="text-sm text-gray-700 prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: exp.description }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
                                PROJECTS
                            </h2>
                            <div className="space-y-4">
                                {projects.map((project, index) => (
                                    <div key={index} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-gray-900">{project.name}</h3>
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline font-medium">
                                                    View Project →
                                                </a>
                                            )}
                                        </div>
                                        <div
                                            className="text-sm text-gray-700 mb-2 prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: project.description }}
                                        />
                                        {project.technologies && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {project.technologies.split(',').map((tech, i) => (
                                                    <span key={i} className="bg-white border border-blue-200 px-2 py-1 rounded text-xs text-blue-700 font-medium">
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sidebar - Right Column */}
                <div className="w-1/3 space-y-6">
                    {/* Technical Skills */}
                    {skills?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
                                TECHNICAL SKILLS
                            </h2>
                            <div className="space-y-2">
                                {skills.map((skill, index) => (
                                    <div key={index} className="bg-blue-50 px-3 py-2 rounded">
                                        <div className="font-semibold text-gray-900 text-sm">{skill.name}</div>
                                        {skill.level && (
                                            <div className="text-xs text-blue-600 mt-1">{skill.level}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
                                EDUCATION
                            </h2>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-900 text-sm">{edu.school}</h3>
                                        <p className="text-sm text-gray-700 font-medium">{edu.degree}</p>
                                        {edu.fieldOfStudy && (
                                            <p className="text-sm text-gray-600">{edu.fieldOfStudy}</p>
                                        )}
                                        <p className="text-xs text-gray-500 mt-1">
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
                                CERTIFICATIONS
                            </h2>
                            <div className="space-y-2">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="bg-blue-50 p-3 rounded">
                                        <h3 className="font-bold text-gray-900 text-sm">{cert.name}</h3>
                                        {cert.issuer && (
                                            <p className="text-xs text-gray-600 mt-1">{cert.issuer}</p>
                                        )}
                                        {cert.date && (
                                            <p className="text-xs text-blue-600 mt-1">{cert.date}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
                                LANGUAGES
                            </h2>
                            <div className="space-y-2">
                                {languages.map((lang, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-gray-800">{lang.name}</span>
                                        <span className="text-gray-600">{lang.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Awards */}
                    {awards?.length > 0 && (
                        <section>
                            <h2 className="text-lg font-bold text-blue-600 mb-3 pb-2 border-b-2 border-blue-600">
                                AWARDS
                            </h2>
                            <div className="space-y-2">
                                {awards.map((award, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-900 text-sm">{award.title}</h3>
                                        {award.awarder && (
                                            <p className="text-xs text-gray-600">{award.awarder}</p>
                                        )}
                                        {award.date && (
                                            <p className="text-xs text-blue-600">{award.date}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Template4;
