import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display" style={{ fontFamily: 'Inter, "Noto Sans", sans-serif' }}>
            <main className="flex flex-col">
                <div className="relative w-full bg-cover bg-center bg-no-repeat text-white" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxM-Tq9bk2l0z3FcEAfoxUtIdDpnqLFVfsQFCQJzOypoQfwN9w2V3yrrSP0IgCYGN61h5TLno9B7poH6OPX5P41-h7vzOrthvbocgEztr2Q_7J5_yB5j19bp5pM9ZCKKoSboWo2-bgopyDmXXRnxV29I3uJx8Sp4tREwPQc9QuZyjYd4Af3hGoLuf4cyxZf_dqS17enDC_-DMFJ4SD79SzAeT747NcEVy0nC4rQDGFTzJ270D6uEyn_sYE1nxQy_XGaceQWuErCNf6")' }}>
                    <div className="absolute inset-0 bg-slate-900 bg-opacity-60"></div>
                    <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                        <header className="flex items-center justify-between py-5">
                            <div className="flex items-center gap-4">
                                <div className="size-6">
                                    <img src="/logo.svg" alt="ProResume Logo" />
                                </div>
                                <h2 className="text-lg font-bold tracking-[-0.015em] text-white">ProResume</h2>
                            </div>
                            <div className="hidden items-center gap-9 md:flex">
                                <a className="text-sm font-medium text-white hover:text-gray-200 transition-colors" href="#">Features</a>
                                <a className="text-sm font-medium text-white hover:text-gray-200 transition-colors" href="#">Templates</a>
                                <a className="text-sm font-medium text-white hover:text-gray-200 transition-colors" href="#">Pricing</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 border border-white bg-transparent text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-white/10 transition-colors"
                                >
                                    <span className="truncate">Sign In</span>
                                </button>
                                <button
                                    onClick={() => navigate('/signup')}
                                    className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-blue-600 transition-colors"
                                >
                                    <span className="truncate">Sign Up</span>
                                </button>
                            </div>
                        </header>
                        <div className="flex flex-col items-center gap-6 py-24 text-center sm:py-32">
                            <div className="flex max-w-3xl flex-col gap-2">
                                <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-white sm:text-5xl md:text-6xl">
                                    Craft Your Professional Story. Land Your Dream Job.
                                </h1>
                                <h2 className="text-base font-normal leading-normal text-slate-200 sm:text-lg">
                                    Our builder helps you create standout resumes in minutes with AI assistance and professional templates.
                                </h2>
                            </div>
                            <button
                                onClick={() => navigate('/signup')}
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-base font-bold leading-normal tracking-[0.015em] text-white hover:bg-blue-600 transition-colors"
                            >
                                <span className="truncate">Create Your Resume Now</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="layout-container flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center px-4 py-5 md:px-10 lg:px-20 xl:px-40">
                        <div className="layout-content-container flex max-w-[960px] flex-1 flex-col">
                            <div className="flex flex-col gap-10 py-10 pt-16 @container">
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <h2 className="text-slate-900 dark:text-slate-50 tracking-light max-w-[720px] text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                                        Everything You Need to Succeed
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 max-w-[720px] text-base font-normal leading-normal">
                                        Our platform is packed with features designed to make resume building simple, fast, and effective.
                                    </p>
                                </div>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 p-0">
                                    <div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#cfd7e7] bg-background-light p-4 dark:border-background-dark/50 dark:bg-background-dark">
                                        <div className="text-2xl text-primary">
                                            <span className="material-symbols-outlined">auto_awesome</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-200">AI Writing Assistant</h3>
                                            <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">Get AI-powered suggestions to enhance your resume's impact and clarity.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#cfd7e7] bg-background-light p-4 dark:border-background-dark/50 dark:bg-background-dark">
                                        <div className="text-2xl text-primary">
                                            <span className="material-symbols-outlined">grid_view</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-200">Designer-Made Templates</h3>
                                            <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">Choose from a wide variety of professional templates tailored for your industry.</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#cfd7e7] bg-background-light p-4 dark:border-background-dark/50 dark:bg-background-dark">
                                        <div className="text-2xl text-primary">
                                            <span className="material-symbols-outlined">download</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-slate-200">Instant PDF Downloads</h3>
                                            <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">Export your resume in a high-quality PDF format, ready to be sent to employers.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="px-4 pb-3 pt-5 text-center text-[22px] font-bold leading-tight tracking-[-0.015em] text-slate-900 dark:text-slate-50">Find the Perfect Look for Your Career</h2>
                                <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    <div className="flex items-stretch gap-4 p-4">
                                        <div className="flex h-full min-w-60 flex-1 flex-col gap-4 rounded-lg">
                                            <div className="flex w-full flex-col rounded-lg border border-slate-200 bg-cover bg-center bg-no-repeat aspect-[3/4] dark:border-slate-800" data-alt="A modern resume template with a clean layout and two columns." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAj_sKfiWHrFxVl3vjl-hvOXcCeCFrGpvpSc2N3ehuk9L7nhnDsmJmwGfCsR8DH3tnLNJ5Qn_Jc4POO2DAvfPBw3DfmRJFQJuoYSQvlvQtmbbD-u2iSQI13r3hCtrYBmuj3NdSak4a_8r8hPtQvQhwvd5Oh548qEsvcpdensNhVxG5HxmhhMsrSauWO06DqkZ55TurWoH2ucMJ-t4Tg2O4A5y8j6JUoXfR8ChRdFKx50t3VI8rYL6I9K-axz7odfP5fosKWLY5xw01N")' }}></div>
                                            <div>
                                                <p className="text-base font-medium leading-normal text-slate-900 dark:text-slate-200">Modern</p>
                                                <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">Clean & stylish</p>
                                            </div>
                                        </div>
                                        <div className="flex h-full min-w-60 flex-1 flex-col gap-4 rounded-lg">
                                            <div className="flex w-full flex-col rounded-lg border border-slate-200 bg-cover bg-center bg-no-repeat aspect-[3/4] dark:border-slate-800" data-alt="A professional resume template with a classic, single-column design." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbUJMLgNz6dFzuEcNk06rjEdSbwv9_7hbV2SEaTMfZfh7pkuJx2jNMY6sDJNw1DnCRXX7eclIhzz1JmAAVhZc-SAfrvp54I6F3ddpQUOUNFC_eIWblcn1YJ7v85Ws2tUlp7DMzLzMR_brPzBK5eMa6-XJhG9yr3Axb-vO8P3xxiOjADbJYyVApbla-eqfPekyaDGkeUpSFj7O9ivm6QsT92sDmxNQZepa7ZCEyzQnByYo_pqG2-M29JFOx-ob13hE3FsZAXsNXaWKM")' }}></div>
                                            <div>
                                                <p className="text-base font-medium leading-normal text-slate-900 dark:text-slate-200">Professional</p>
                                                <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">Timeless & elegant</p>
                                            </div>
                                        </div>
                                        <div className="flex h-full min-w-60 flex-1 flex-col gap-4 rounded-lg">
                                            <div className="flex w-full flex-col rounded-lg border border-slate-200 bg-cover bg-center bg-no-repeat aspect-[3/4] dark:border-slate-800" data-alt="A creative resume template with bold colors and a unique layout." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDuOCJ6_LxLWl5ahHQHpaWHx4IRlN0kSug9Jv7qWbNR60NYYxRg3SOhpnCXMbclAkD-AzDEILzuM3bO6Y-z5inXh81nM3GI2Un5zqC_Pl0RUUNTM4rAuS712L7dQfQcwZYy-qoXvoMIgIRLxcLwKNFKkmqDb_hfkFKcCTmnJaLw3QbHI0w_4pKZ0QZ3hl6Ma3Mx89e_9Sjc-lTHGIdHKR29Be8nsWUXZtn8V2khWT_yOL7ojkUVGmYWKgM-YUzv-Fdc9OtT1NWaVSPs")' }}></div>
                                            <div>
                                                <p className="text-base font-medium leading-normal text-slate-900 dark:text-slate-200">Creative</p>
                                                <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">Bold & unique</p>
                                            </div>
                                        </div>
                                        <div className="flex h-full min-w-60 flex-1 flex-col gap-4 rounded-lg">
                                            <div className="flex w-full flex-col rounded-lg border border-slate-200 bg-cover bg-center bg-no-repeat aspect-[3/4] dark:border-slate-800" data-alt="An academic CV template with a structured and formal design." style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB62PUO_BlCmOagtUQgKppXc_SRUSL2HZsC_scC_uiojhHcJI_2G6BYSXRIZSCfauPoVqyy85FeJmNBh5H9cbRir4B4WFqSV-Dt08rT-dJFwEKdSrNktkWeFyPxSxfOgMy1RmI1sY5Yi81mOCI5LCf-5G9P6Pwfu7W7ah3qYYSZEa4qdjU8G7MzjCaUYoLbjFidxABCUh9sQPEqDdwF_tdY_686JCVMKYhTACszDyX9ICX2swW7GDLHFpS3rQ7G7gfl7FZKuL1DfNOg")' }}></div>
                                            <div>
                                                <p className="text-base font-medium leading-normal text-slate-900 dark:text-slate-200">Academic</p>
                                                <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">Structured & formal</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-10 px-4 py-10">
                                <div className="flex flex-col items-center gap-4 text-center">
                                    <h2 className="max-w-[720px] text-[32px] font-bold leading-tight tracking-[-0.033em] text-slate-900 dark:text-slate-50">Trusted by Professionals</h2>
                                </div>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-background-dark/50 dark:bg-background-dark/50">
                                        <p className="text-base font-normal text-slate-600 dark:text-slate-300">"This resume builder is a game-changer. The AI suggestions helped me highlight my skills perfectly, and I landed three interviews in the first week!"</p>
                                        <div className="flex items-center gap-3">
                                            <img className="h-10 w-10 rounded-full object-cover" data-alt="Portrait of Sarah Johnson" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8BBiJO9N9vEtjgzB-n2QQgHha4ibSCSmBD1vqKUNdDzADvn1j5qFLDxQgXrCwkCamWYThXrD5XHYt3QI-EaKtXwJkd8QHQCNG_N7jmrz1k8hItlKxSHfQ-cXwnEHBZVzNU3QBJvGHaNURQ9UdILe-vqThLmWjUD0A2RGgjX7z1f2cZDamKf8oiif4MBWl8LMx3wJOt00W6c_u-RyMUPEVsUViY_wp1F1HoH7Ktuhs7DqUJ7PUfwBfeGxvahnb-hnztqlmr8Ztbfqg" />
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-200">Sarah Johnson</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Marketing Manager</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-background-dark/50 dark:bg-background-dark/50">
                                        <p className="text-base font-normal text-slate-600 dark:text-slate-300">"I'm not a designer, so the professional templates were a lifesaver. My new resume looks incredible, and it only took me 20 minutes to create."</p>
                                        <div className="flex items-center gap-3">
                                            <img className="h-10 w-10 rounded-full object-cover" data-alt="Portrait of Michael Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwfMmDZcRyJ7SSlU5gq-gt5zS1fook5PCbi2cqpUgCqgJJPs3JG8ot5siAztzXlTlPqS2w979LcELq9Kaf1uLZoJj6Yoq40L4JHoT5JSCxx3b-d-SwgG8sqnv7_S3NYAzC-JyMLNaD9NFeAio5OnlQwf7V-jy6EuvZo3YnAOKE_ChRea3ogEQ5RUih083RFmxn4pl3nc4I6W8ZEnPR_u5_HZ6nbPZ235j48-6Ea9imh8LnICuca2XHBBWESD9glVag6JxLJx5TvWb9" />
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-200">Michael Chen</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">Software Engineer</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 dark:border-background-dark/50 dark:bg-background-dark/50">
                                        <p className="text-base font-normal text-slate-600 dark:text-slate-300">"The ability to quickly download a PDF and customize templates for different job applications is fantastic. Highly recommend this tool."</p>
                                        <div className="flex items-center gap-3">
                                            <img className="h-10 w-10 rounded-full object-cover" data-alt="Portrait of Emily Rodriguez" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAztdMul7vHTBW4hQijLMIb4U5MM7C2hsOPdgrgQof6Bot6OUKjvCpvaKJvNQZVPKyLOME5tMkXyu0RtQG97e07srEVVHzmPOXoicjho_CDygINu9sOzgxTQbg3TyjdUfh3BH7MGv5OGNRrJPFx6068eggRRG0vosyC2T_UHb1hkPgFICUCZ9I2Ld-oYHp2AJv6uQNi-yY4vWo3_BaSu3KhpYMPieqcfV_uXgonwWFPB_eTw7FsCNoWUm41l6__ZtWo9OqcTokRXufd" />
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-slate-200">Emily Rodriguez</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">UX Designer</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <footer className="mt-20 border-t border-slate-200 px-4 py-10 dark:border-background-dark/50">
                                <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                                    <div className="flex items-center gap-4">
                                        <div className="size-6">
                                            <img src="/logo.svg" alt="ProResume Logo" />
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400">© 2024 ProResume. All rights reserved.</p>
                                    </div>
                                    <div className="flex gap-6">
                                        <a className="text-sm text-slate-600 hover:text-primary dark:text-slate-400" href="#">About</a>
                                        <a className="text-sm text-slate-600 hover:text-primary dark:text-slate-400" href="#">Contact</a>
                                        <a className="text-sm text-slate-600 hover:text-primary dark:text-slate-400" href="#">Privacy Policy</a>
                                        <a className="text-sm text-slate-600 hover:text-primary dark:text-slate-400" href="#">Terms of Service</a>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;
