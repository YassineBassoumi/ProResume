import React from 'react';

// Template 8: Student Fresh - Perfect for students and recent graduates
const Template8 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="bg-white min-h-[11in] w-[8.5in] p-8 shadow-lg text-gray-800 font-sans" id="resume-preview">
            {/* Header - Centered with indigo accent */}
            <header className="text-center mb-8 pb-6 border-b-4 border-indigo-500">
                <h1 className="text-4xl font-bold text-indigo-700 mb-2">
                    {header?.firstName} {header?.lastName}
                </h1>
                <p className="text-xl text-gray-700 mb-4">{header?.title}</p>

                <div className="flex justify-center flex-wrap gap-3 text-sm text-gray-600">
                    {header?.email && <span>{header.email}</span>}
                    {header?.phone && <span>•</span>}
                    {header?.phone && <span>{header.phone}</span>}
                    {header?.location && <span>•</span>}
                    {header?.location && <span>{header.location}</span>}
                </div>
                
                {(header?.linkedin || header?.portfolio) && (
                    <div className="flex justify-center gap-4 mt-2 text-sm">
                        {header?.linkedin && (
                            <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">
                                LinkedIn
                            </a>
                        )}
                        {header?.portfolio && (
                            <a href={header.portfolio} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline font-medium">
                                Portfolio
                            </a>
                        )}
                    </div>
                )}
            </header>

            {/* Objective / Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
                        Objective
                    </h2>
                    <div
                        className="text-sm leading-relaxed text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </section>
            )}

            {/* Education - Prominent for students */}
            {education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div key={index} className="bg-indigo-50 p-5 rounded-lg border-l-4 border-indigo-600">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-bold text-gray-900 text-lg">{edu.degree}</h3>
                                    <span className="text-sm text-indigo-700 font-semibold">
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <p className="text-gray-800 font-semibold text-base">{edu.school}</p>
                                <p className="text-sm text-gray-600">{edu.location}</p>
                                {edu.fieldOfStudy && (
                                    <p className="text-sm text-gray-700 mt-2">
                                        <span className="font-semibold">Major:</span> {edu.fieldOfStudy}
                                    </p>
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

            {/* Skills - Highlighted for students */}
            {skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <span key={index} className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium border border-indigo-200">
                                {skill.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects - Important for students */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
                        Projects
                    </h2>
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div key={index} className="border-l-4 border-indigo-300 pl-4">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline font-medium">
                                            View Project
                                        </a>
                                    )}
                                </div>
                                <div
                                    className="text-sm text-gray-700 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                                {project.technologies && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.technologies.split(',').map((tech, i) => (
                                            <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
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

            {/* Experience */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
                        Experience
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                    <span className="text-sm text-indigo-700 font-medium">
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

            {/* Certifications */}
            {certifications?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
                        Certifications
                    </h2>
                    <div className="space-y-2">
                        {certifications.map((cert, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                                    {cert.issuer && (
                                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                                    )}
                                </div>
                                {cert.date && (
                                    <span className="text-sm text-indigo-700 font-medium">{cert.date}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Awards & Achievements */}
            {awards?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
                        Awards & Achievements
                    </h2>
                    <div className="space-y-2">
                        {awards.map((award, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <span className="text-indigo-600 mt-1">★</span>
                                <div className="flex-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-semibold text-gray-900">{award.title}</h3>
                                        {award.date && (
                                            <span className="text-sm text-indigo-700 font-medium">{award.date}</span>
                                        )}
                                    </div>
                                    {award.awarder && (
                                        <p className="text-sm text-gray-600">{award.awarder}</p>
                                    )}
                                    {award.description && (
                                        <p className="text-sm text-gray-700 mt-1">{award.description}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold text-indigo-700 mb-3 pb-2 border-b-2 border-indigo-200">
                        Languages
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {languages.map((lang, index) => (
                            <div key={index} className="bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200">
                                <span className="font-semibold text-gray-900">{lang.name}</span>
                                <span className="text-sm text-gray-600 ml-2">- {lang.proficiency}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Template8;
