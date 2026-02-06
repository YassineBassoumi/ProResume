import React from 'react';

const Template3 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="flex flex-col min-h-[11in] w-[8.5in] bg-white shadow-lg text-gray-800 font-sans" id="resume-preview">
            {/* Header */}
            <header className="bg-teal-600 text-white p-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-5xl font-black tracking-tight mb-2">
                            {header?.firstName} <span className="text-teal-200">{header?.lastName}</span>
                        </h1>
                        <p className="text-2xl font-light tracking-wide opacity-90">{header?.title}</p>
                    </div>
                    <div className="text-right text-sm space-y-1 opacity-90">
                        {header?.email && <div>{header.email}</div>}
                        {header?.phone && <div>{header.phone}</div>}
                        {header?.location && <div>{header.location}</div>}
                        {header?.linkedin && (
                            <div>
                                <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    LinkedIn
                                </a>
                            </div>
                        )}
                        {header?.portfolio && (
                            <div>
                                <a href={header.portfolio} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                    Portfolio
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="flex flex-1 p-8 gap-8">
                {/* Left Column */}
                <div className="w-2/3 flex flex-col gap-8">
                    {/* Summary */}
                    {summary && (
                        <section>
                            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-1">
                                About Me
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
                            <h2 className="text-xl font-bold text-teal-700 mb-4 border-b-2 border-teal-100 pb-1">
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {experience.map((exp, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-gray-900 text-lg">{exp.title}</h3>
                                            <span className="text-sm font-medium text-teal-600">
                                                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <span className="text-base font-semibold text-gray-700">{exp.company}</span>
                                            <span className="text-sm text-gray-500">{exp.location}</span>
                                        </div>
                                        <div
                                            className="text-sm text-gray-600 prose prose-sm max-w-none"
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
                            <h2 className="text-xl font-bold text-teal-700 mb-4 border-b-2 border-teal-100 pb-1">
                                Projects
                            </h2>
                            <div className="grid grid-cols-1 gap-4">
                                {projects.map((project, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-gray-900">{project.name}</h3>
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-teal-600 hover:underline font-medium">
                                                    View Project
                                                </a>
                                            )}
                                        </div>
                                        <div
                                            className="text-sm text-gray-600 mb-2 prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: project.description }}
                                        />
                                        {project.technologies && (
                                            <div className="flex flex-wrap gap-1">
                                                {project.technologies.split(',').map((tech, i) => (
                                                    <span key={i} className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-600">
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

                {/* Right Column */}
                <div className="w-1/3 flex flex-col gap-8">
                    {/* Skills */}
                    {skills?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-1">
                                Skills
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {skills.map((skill, index) => (
                                    <span key={index} className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-sm font-medium border border-teal-100">
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-1">
                                Education
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-900">{edu.school}</h3>
                                        <p className="text-sm text-gray-700 font-medium">{edu.degree}</p>
                                        <p className="text-xs text-gray-500 mb-1">{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</p>
                                        {edu.description && (
                                            <div
                                                className="text-xs text-gray-600 prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: edu.description }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Languages */}
                    {languages?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-1">
                                Languages
                            </h2>
                            <ul className="space-y-2">
                                {languages.map((lang, index) => (
                                    <li key={index} className="flex justify-between items-center text-sm border-b border-gray-100 pb-1 last:border-0">
                                        <span className="font-medium text-gray-800">{lang.name}</span>
                                        <span className="text-gray-500 text-xs">{lang.proficiency}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certifications */}
                    {certifications?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-1">
                                Certifications
                            </h2>
                            <div className="space-y-3">
                                {certifications.map((cert, index) => (
                                    <div key={index} className="bg-teal-50 p-3 rounded border border-teal-100">
                                        <h3 className="font-bold text-teal-900 text-sm">{cert.name}</h3>
                                        <p className="text-xs text-teal-700">{cert.issuer}</p>
                                        {cert.date && <p className="text-xs text-teal-600 mt-1">{cert.date}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Awards */}
                    {awards?.length > 0 && (
                        <section>
                            <h2 className="text-xl font-bold text-teal-700 mb-3 border-b-2 border-teal-100 pb-1">
                                Awards
                            </h2>
                            <div className="space-y-2">
                                {awards.map((award, index) => (
                                    <div key={index}>
                                        <h3 className="font-bold text-gray-900 text-sm">{award.title}</h3>
                                        <p className="text-xs text-gray-500">{award.awarder}</p>
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

export default Template3;
