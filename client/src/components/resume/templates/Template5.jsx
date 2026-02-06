import React from 'react';

// Template 5: Developer Pro - Minimalist terminal-inspired design
const Template5 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="bg-gray-50 min-h-[11in] w-[8.5in] p-8 shadow-lg text-gray-800 font-mono" id="resume-preview">
            {/* Terminal-style Header */}
            <header className="bg-gray-900 text-green-400 p-6 rounded-lg mb-6 font-mono">
                <div className="text-xs text-gray-500 mb-2">$ whoami</div>
                <h1 className="text-3xl font-bold mb-2">
                    {header?.firstName}_{header?.lastName}
                </h1>
                <p className="text-lg text-green-300 mb-4">// {header?.title}</p>

                <div className="text-sm text-gray-400 space-y-1">
                    {header?.email && <div>📧 {header.email}</div>}
                    {header?.phone && <div>📱 {header.phone}</div>}
                    {header?.location && <div>📍 {header.location}</div>}
                    {header?.linkedin && (
                        <div>
                            🔗 <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                                LinkedIn
                            </a>
                        </div>
                    )}
                    {header?.portfolio && (
                        <div>
                            💻 <a href={header.portfolio} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
                                {header.portfolio.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 font-mono">
                        <span className="text-green-600">$</span> cat about_me.txt
                    </h2>
                    <div className="bg-white p-4 rounded-lg border-l-4 border-green-600">
                        <div
                            className="text-sm leading-relaxed text-gray-700 prose prose-sm max-w-none font-sans"
                            dangerouslySetInnerHTML={{ __html: summary }}
                        />
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 font-mono">
                        <span className="text-green-600">$</span> ls skills/
                    </h2>
                    <div className="bg-white p-4 rounded-lg">
                        <div className="grid grid-cols-3 gap-3">
                            {skills.map((skill, index) => (
                                <div key={index} className="bg-gray-900 text-green-400 px-3 py-2 rounded font-mono text-sm">
                                    <div className="font-bold">{skill.name}</div>
                                    {skill.level && (
                                        <div className="text-xs text-gray-500 mt-1">{skill.level}</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 font-mono">
                        <span className="text-green-600">$</span> cat experience.log
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border-l-4 border-gray-900">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-bold text-gray-900 font-mono">{exp.title}</h3>
                                    <span className="text-sm text-green-600 font-mono">
                                        [{exp.startDate} - {exp.current ? 'Present' : exp.endDate}]
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-gray-700 font-semibold font-sans">{exp.company}</span>
                                    <span className="text-sm text-gray-500 font-sans">{exp.location}</span>
                                </div>
                                <div
                                    className="text-sm text-gray-700 prose prose-sm max-w-none font-sans"
                                    dangerouslySetInnerHTML={{ __html: exp.description }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 font-mono">
                        <span className="text-green-600">$</span> git log --projects
                    </h2>
                    <div className="space-y-4">
                        {projects.map((project, index) => (
                            <div key={index} className="bg-white p-4 rounded-lg border border-gray-300">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="font-bold text-gray-900 font-mono text-green-600">{project.name}</h3>
                                    {project.link && (
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-green-600 hover:underline font-mono">
                                            [view repo]
                                        </a>
                                    )}
                                </div>
                                <div
                                    className="text-sm text-gray-700 mb-2 prose prose-sm max-w-none font-sans"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                                {project.technologies && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.technologies.split(',').map((tech, i) => (
                                            <span key={i} className="bg-gray-900 text-green-400 px-2 py-1 rounded text-xs font-mono">
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

            {/* Education */}
            {education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 font-mono">
                        <span className="text-green-600">$</span> cat education.md
                    </h2>
                    <div className="bg-white p-4 rounded-lg space-y-3">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <h3 className="font-bold text-gray-900 font-sans">{edu.school}</h3>
                                <p className="text-sm text-gray-700 font-sans">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                                <p className="text-xs text-green-600 font-mono">
                                    [{edu.startDate} - {edu.current ? 'Present' : edu.endDate}]
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 font-mono">
                        <span className="text-green-600">$</span> ls certifications/
                    </h2>
                    <div className="bg-white p-4 rounded-lg space-y-2">
                        {certifications.map((cert, index) => (
                            <div key={index} className="border-b border-gray-200 pb-2 last:border-0">
                                <h3 className="font-bold text-gray-900 text-sm font-sans">{cert.name}</h3>
                                <p className="text-xs text-gray-600 font-sans">{cert.issuer}</p>
                                {cert.date && (
                                    <p className="text-xs text-green-600 font-mono">{cert.date}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Footer */}
            <div className="mt-8 text-center text-xs text-gray-500 font-mono">
                <span className="text-green-600">$</span> echo "Thanks for reviewing my resume!"
            </div>
        </div>
    );
};

export default Template5;
