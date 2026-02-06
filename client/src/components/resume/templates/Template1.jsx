import React from 'react';

const Template1 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="bg-white min-h-[11in] w-[8.5in] p-8 shadow-lg text-gray-800 font-sans" id="resume-preview">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-4 mb-6">
                <h1 className="text-4xl font-bold uppercase tracking-wider text-gray-900">
                    {header?.firstName} {header?.lastName}
                </h1>
                <p className="text-xl text-gray-600 mt-1">{header?.title}</p>

                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                    {header?.email && (
                        <div className="flex items-center">
                            <span>{header.email}</span>
                        </div>
                    )}
                    {header?.phone && (
                        <div className="flex items-center">
                            <span>{header.phone}</span>
                        </div>
                    )}
                    {header?.location && (
                        <div className="flex items-center">
                            <span>{header.location}</span>
                        </div>
                    )}
                    {header?.linkedin && (
                        <div className="flex items-center">
                            <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                LinkedIn
                            </a>
                        </div>
                    )}
                    {header?.portfolio && (
                        <div className="flex items-center">
                            <a href={header.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                Portfolio
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">
                        Professional Summary
                    </h2>
                    <div
                        className="text-sm leading-relaxed text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </section>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">
                        Experience
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
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-gray-700 font-medium">{exp.company}</span>
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

            {/* Education */}
            {education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">
                        Education
                    </h2>
                    <div className="space-y-3">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{edu.school}</h3>
                                    <span className="text-sm text-gray-600">
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="text-gray-700">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                                    <span className="text-sm text-gray-500">{edu.location}</span>
                                </div>
                                {edu.description && (
                                    <div
                                        className="text-sm text-gray-700 mt-1 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: edu.description }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-800">
                                {skill.name} {skill.level && `(${skill.level})`}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">
                        Projects
                    </h2>
                    <div className="space-y-3">
                        {projects.map((project, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                                            View Project
                                        </a>
                                    )}
                                </div>
                                <div
                                    className="text-sm text-gray-700 mt-1 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                                {project.technologies && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Tech: {project.technologies}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">
                        Languages
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {languages.map((lang, index) => (
                            <span key={index} className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-800">
                                {lang.name} - {lang.proficiency}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">
                        Certifications
                    </h2>
                    <div className="space-y-2">
                        {certifications.map((cert, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                                    {cert.date && (
                                        <span className="text-sm text-gray-600">{cert.date}</span>
                                    )}
                                </div>
                                {cert.issuer && (
                                    <p className="text-sm text-gray-600">{cert.issuer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Awards */}
            {awards?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">
                        Awards
                    </h2>
                    <div className="space-y-2">
                        {awards.map((award, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{award.title}</h3>
                                    {award.date && (
                                        <span className="text-sm text-gray-600">{award.date}</span>
                                    )}
                                </div>
                                {award.awarder && (
                                    <p className="text-sm text-gray-600">{award.awarder}</p>
                                )}
                                {award.description && (
                                    <p className="text-sm text-gray-700 mt-1">{award.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Template1;
