import React from 'react';

// Template 9: Entry Level - Ideal for first-time job seekers
const Template9 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="bg-white min-h-[11in] w-[8.5in] p-8 shadow-lg text-gray-800 font-sans" id="resume-preview">
            {/* Header with green accent */}
            <header className="bg-green-50 p-6 rounded-lg mb-6 border-2 border-green-200">
                <h1 className="text-3xl font-bold text-green-800 mb-2">
                    {header?.firstName} {header?.lastName}
                </h1>
                <p className="text-lg text-green-700 font-semibold mb-3">{header?.title}</p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                    {header?.email && (
                        <div>
                            <span className="font-semibold text-green-700">Email:</span> {header.email}
                        </div>
                    )}
                    {header?.phone && (
                        <div>
                            <span className="font-semibold text-green-700">Phone:</span> {header.phone}
                        </div>
                    )}
                    {header?.location && (
                        <div>
                            <span className="font-semibold text-green-700">Location:</span> {header.location}
                        </div>
                    )}
                    {header?.linkedin && (
                        <div>
                            <span className="font-semibold text-green-700">LinkedIn:</span>{' '}
                            <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                Profile
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Career Objective */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-2 border-green-300 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">📝</span>
                        Career Objective
                    </h2>
                    <div
                        className="text-sm leading-relaxed text-gray-700 bg-green-50 p-4 rounded-lg prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </section>
            )}

            {/* Education */}
            {education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-2 border-green-300 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">🎓</span>
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div key={index} className="bg-white border-2 border-green-200 p-4 rounded-lg">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900 text-base">{edu.degree}</h3>
                                    <span className="text-sm text-green-700 font-semibold">
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <p className="text-gray-800 font-semibold">{edu.school}</p>
                                <p className="text-sm text-gray-600">{edu.location}</p>
                                {edu.fieldOfStudy && (
                                    <p className="text-sm text-gray-700 mt-2">
                                        <span className="font-semibold">Field of Study:</span> {edu.fieldOfStudy}
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

            {/* Skills */}
            {skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-2 border-green-300 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">💡</span>
                        Skills & Competencies
                    </h2>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-3">
                            {skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <span className="text-green-600">✓</span>
                                    <span className="text-sm font-medium text-gray-800">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience (including internships, volunteer work) */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-2 border-green-300 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">💼</span>
                        Experience & Volunteer Work
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index} className="border-l-4 border-green-400 pl-4">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{exp.title}</h3>
                                    <span className="text-sm text-green-700 font-medium">
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

            {/* Projects / Coursework */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-2 border-green-300 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">🚀</span>
                        Projects & Coursework
                    </h2>
                    <div className="space-y-3">
                        {projects.map((project, index) => (
                            <div key={index} className="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline font-medium">
                                            View →
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
                                            <span key={i} className="bg-white border border-green-300 px-2 py-1 rounded text-xs text-green-700">
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

            {/* Certifications */}
            {certifications?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-2 border-green-300 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">📜</span>
                        Certifications
                    </h2>
                    <div className="grid grid-cols-1 gap-2">
                        {certifications.map((cert, index) => (
                            <div key={index} className="flex justify-between items-center bg-white border border-green-200 p-3 rounded">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                                    {cert.issuer && (
                                        <p className="text-xs text-gray-600">{cert.issuer}</p>
                                    )}
                                </div>
                                {cert.date && (
                                    <span className="text-sm text-green-700 font-medium">{cert.date}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Awards */}
            {awards?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-2 border-green-300 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">🏆</span>
                        Awards & Recognition
                    </h2>
                    <div className="space-y-2">
                        {awards.map((award, index) => (
                            <div key={index} className="flex justify-between items-start bg-green-50 p-3 rounded">
                                <div>
                                    <h3 className="font-semibold text-gray-900">{award.title}</h3>
                                    {award.awarder && (
                                        <p className="text-sm text-gray-600">{award.awarder}</p>
                                    )}
                                    {award.description && (
                                        <p className="text-sm text-gray-700 mt-1">{award.description}</p>
                                    )}
                                </div>
                                {award.date && (
                                    <span className="text-sm text-green-700 font-medium whitespace-nowrap ml-4">{award.date}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-green-800 mb-3 pb-2 border-b-2 border-green-300 flex items-center gap-2">
                        <span className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">🌍</span>
                        Languages
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {languages.map((lang, index) => (
                            <div key={index} className="bg-white border-2 border-green-200 px-4 py-2 rounded-lg">
                                <span className="font-semibold text-gray-900">{lang.name}</span>
                                <span className="text-sm text-gray-600 ml-2">({lang.proficiency})</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Template9;
