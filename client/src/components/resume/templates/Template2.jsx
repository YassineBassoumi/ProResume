import React from 'react';

const Template2 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="flex min-h-[11in] w-[8.5in] bg-white shadow-lg text-gray-800 font-sans" id="resume-preview">
            {/* Sidebar */}
            <aside className="w-1/3 bg-slate-800 text-white p-6 flex flex-col gap-6">
                {/* Contact Info */}
                <div>
                    <h2 className="text-lg font-bold uppercase border-b border-slate-600 pb-2 mb-3 text-slate-100">
                        Contact
                    </h2>
                    <div className="flex flex-col gap-3 text-sm text-slate-300">
                        {header?.email && (
                            <div className="break-all">
                                <span className="block font-semibold text-slate-400 text-xs">Email</span>
                                {header.email}
                            </div>
                        )}
                        {header?.phone && (
                            <div>
                                <span className="block font-semibold text-slate-400 text-xs">Phone</span>
                                {header.phone}
                            </div>
                        )}
                        {header?.location && (
                            <div>
                                <span className="block font-semibold text-slate-400 text-xs">Location</span>
                                {header.location}
                            </div>
                        )}
                        {header?.linkedin && (
                            <div>
                                <span className="block font-semibold text-slate-400 text-xs">LinkedIn</span>
                                <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                                    {header.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
                                </a>
                            </div>
                        )}
                        {header?.portfolio && (
                            <div>
                                <span className="block font-semibold text-slate-400 text-xs">Portfolio</span>
                                <a href={header.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                                    {header.portfolio.replace(/^https?:\/\/(www\.)?/, '')}
                                </a>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills */}
                {skills?.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold uppercase border-b border-slate-600 pb-2 mb-3 text-slate-100">
                            Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-slate-700 px-2 py-1 rounded text-xs text-slate-200">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {languages?.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold uppercase border-b border-slate-600 pb-2 mb-3 text-slate-100">
                            Languages
                        </h2>
                        <div className="flex flex-col gap-2">
                            {languages.map((lang, index) => (
                                <div key={index} className="flex justify-between items-baseline text-sm">
                                    <span className="font-medium text-slate-200">{lang.name}</span>
                                    <span className="text-xs text-slate-400">{lang.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Awards (Sidebar) */}
                {awards?.length > 0 && (
                    <div>
                        <h2 className="text-lg font-bold uppercase border-b border-slate-600 pb-2 mb-3 text-slate-100">
                            Awards
                        </h2>
                        <div className="flex flex-col gap-3">
                            {awards.map((award, index) => (
                                <div key={index} className="text-sm">
                                    <div className="font-bold text-slate-200">{award.title}</div>
                                    <div className="text-xs text-slate-400">{award.awarder}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content */}
            <main className="w-2/3 p-8 flex flex-col gap-6">
                {/* Header */}
                <header className="border-b-2 border-slate-800 pb-6">
                    <h1 className="text-4xl font-bold uppercase tracking-wider text-slate-900 leading-tight">
                        {header?.firstName} <span className="text-slate-600">{header?.lastName}</span>
                    </h1>
                    <p className="text-xl text-slate-500 mt-2 font-medium tracking-wide">{header?.title}</p>
                </header>

                {/* Summary */}
                {summary && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                            <span className="w-8 h-1 bg-slate-800 inline-block"></span>
                            Profile
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
                        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-slate-800 inline-block"></span>
                            Experience
                        </h2>
                        <div className="space-y-5">
                            {experience.map((exp, index) => (
                                <div key={index} className="relative pl-4 border-l-2 border-slate-200">
                                    <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-slate-900 text-base">{exp.title}</h3>
                                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="text-sm font-semibold text-slate-700">{exp.company}</span>
                                        <span className="text-xs text-slate-500 italic">{exp.location}</span>
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

                {/* Education */}
                {education?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-slate-800 inline-block"></span>
                            Education
                        </h2>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-slate-900">{edu.school}</h3>
                                        <span className="text-xs font-semibold text-slate-500">
                                            {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm text-slate-700 font-medium">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                                        <span className="text-xs text-slate-500">{edu.location}</span>
                                    </div>
                                    {edu.description && (
                                        <div
                                            className="text-sm text-gray-600 mt-1 prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: edu.description }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-slate-800 inline-block"></span>
                            Projects
                        </h2>
                        <div className="space-y-4">
                            {projects.map((project, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-slate-900">{project.name}</h3>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                                View Project
                                            </a>
                                        )}
                                    </div>
                                    <div
                                        className="text-sm text-gray-600 mt-1 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: project.description }}
                                    />
                                    {project.technologies && (
                                        <p className="text-xs text-slate-500 mt-1 font-mono bg-slate-50 inline-block px-1 rounded">
                                            {project.technologies}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications (Main) */}
                {certifications?.length > 0 && (
                    <section>
                        <h2 className="text-lg font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
                            <span className="w-8 h-1 bg-slate-800 inline-block"></span>
                            Certifications
                        </h2>
                        <div className="space-y-2">
                            {certifications.map((cert, index) => (
                                <div key={index} className="flex justify-between items-baseline border-b border-slate-100 pb-2 last:border-0">
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-sm">{cert.name}</h3>
                                        <p className="text-xs text-slate-600">{cert.issuer}</p>
                                    </div>
                                    {cert.date && (
                                        <span className="text-xs text-slate-500">{cert.date}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Template2;
