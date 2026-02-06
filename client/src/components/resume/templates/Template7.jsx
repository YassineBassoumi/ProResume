import React from 'react';

// Template 7: Medical Professional - Healthcare CV format
const Template7 = ({ data }) => {
    const { header, summary, experience, education, skills, projects, languages, certifications, awards } = data;

    return (
        <div className="bg-white min-h-[11in] w-[8.5in] p-8 shadow-lg text-gray-800 font-sans" id="resume-preview">
            {/* Header with teal accent */}
            <header className="border-b-4 border-teal-700 pb-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                    {header?.firstName} {header?.lastName}, MD
                </h1>
                <p className="text-xl text-teal-700 font-semibold mb-4">{header?.title}</p>

                <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-700">
                    {header?.email && (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-teal-700">Email:</span>
                            <span>{header.email}</span>
                        </div>
                    )}
                    {header?.phone && (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-teal-700">Phone:</span>
                            <span>{header.phone}</span>
                        </div>
                    )}
                    {header?.location && (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-teal-700">Location:</span>
                            <span>{header.location}</span>
                        </div>
                    )}
                    {header?.linkedin && (
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-teal-700">LinkedIn:</span>
                            <a href={header.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                                Profile
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Professional Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-teal-800 mb-3 pb-2 border-b-2 border-teal-200 uppercase tracking-wide">
                        Professional Summary
                    </h2>
                    <div
                        className="text-sm leading-relaxed text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: summary }}
                    />
                </section>
            )}

            {/* Medical Education */}
            {education?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-teal-800 mb-3 pb-2 border-b-2 border-teal-200 uppercase tracking-wide">
                        Medical Education & Training
                    </h2>
                    <div className="space-y-4">
                        {education.map((edu, index) => (
                            <div key={index} className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-700">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                                    <span className="text-sm text-teal-700 font-semibold">
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                                <p className="text-gray-800 font-semibold">{edu.school}</p>
                                <p className="text-sm text-gray-600">{edu.location}</p>
                                {edu.fieldOfStudy && (
                                    <p className="text-sm text-gray-700 mt-2">
                                        <span className="font-semibold">Specialization:</span> {edu.fieldOfStudy}
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

            {/* Board Certifications */}
            {certifications?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-teal-800 mb-3 pb-2 border-b-2 border-teal-200 uppercase tracking-wide">
                        Board Certifications & Licenses
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                        {certifications.map((cert, index) => (
                            <div key={index} className="bg-white border-2 border-teal-200 p-4 rounded-lg">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="font-bold text-gray-900">{cert.name}</h3>
                                    {cert.date && (
                                        <span className="text-sm text-teal-700 font-semibold">{cert.date}</span>
                                    )}
                                </div>
                                {cert.issuer && (
                                    <p className="text-sm text-gray-700 mt-1">
                                        <span className="font-semibold">Issuing Organization:</span> {cert.issuer}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Clinical Experience */}
            {experience?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-teal-800 mb-3 pb-2 border-b-2 border-teal-200 uppercase tracking-wide">
                        Clinical Experience
                    </h2>
                    <div className="space-y-4">
                        {experience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-gray-900 text-base">{exp.title}</h3>
                                    <span className="text-sm text-teal-700 font-semibold">
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-gray-800 font-semibold">{exp.company}</span>
                                    <span className="text-sm text-gray-600">{exp.location}</span>
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

            {/* Clinical Skills & Procedures */}
            {skills?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-teal-800 mb-3 pb-2 border-b-2 border-teal-200 uppercase tracking-wide">
                        Clinical Skills & Procedures
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {skills.map((skill, index) => (
                            <div key={index} className="flex items-start gap-2">
                                <span className="text-teal-700 mt-1">✓</span>
                                <div>
                                    <span className="text-sm font-semibold text-gray-900">{skill.name}</span>
                                    {skill.level && (
                                        <span className="text-xs text-gray-600 ml-2">({skill.level})</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Research & Publications */}
            {projects?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-teal-800 mb-3 pb-2 border-b-2 border-teal-200 uppercase tracking-wide">
                        Research & Publications
                    </h2>
                    <div className="space-y-3">
                        {projects.map((project, index) => (
                            <div key={index} className="pl-6 relative">
                                <span className="absolute left-0 top-1 text-teal-700 font-bold">{index + 1}.</span>
                                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                                <div
                                    className="text-sm text-gray-700 mt-1 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                />
                                {project.link && (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:underline mt-1 inline-block">
                                        View Publication
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Professional Memberships & Awards */}
            {awards?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-teal-800 mb-3 pb-2 border-b-2 border-teal-200 uppercase tracking-wide">
                        Professional Memberships & Awards
                    </h2>
                    <div className="space-y-2">
                        {awards.map((award, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-sm">{award.title}</h3>
                                    {award.awarder && (
                                        <p className="text-sm text-gray-700">{award.awarder}</p>
                                    )}
                                    {award.description && (
                                        <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                                    )}
                                </div>
                                {award.date && (
                                    <span className="text-sm text-teal-700 font-semibold whitespace-nowrap ml-4">{award.date}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Languages */}
            {languages?.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-lg font-bold text-teal-800 mb-3 pb-2 border-b-2 border-teal-200 uppercase tracking-wide">
                        Languages
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {languages.map((lang, index) => (
                            <div key={index} className="bg-teal-50 px-4 py-2 rounded-lg">
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

export default Template7;
