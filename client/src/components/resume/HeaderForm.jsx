const HeaderForm = ({ data, onChange }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
            <label className="flex flex-col">
                <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">First Name</p>
                <input
                    id="firstName"
                    name="firstName"
                    value={data.firstName || ''}
                    onChange={handleChange}
                    placeholder="e.g. Jane"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                />
            </label>
            <label className="flex flex-col">
                <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Last Name</p>
                <input
                    id="lastName"
                    name="lastName"
                    value={data.lastName || ''}
                    onChange={handleChange}
                    placeholder="e.g. Doe"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                />
            </label>
            <label className="flex flex-col md:col-span-2">
                <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Professional Title</p>
                <input
                    id="title"
                    name="title"
                    value={data.title || ''}
                    onChange={handleChange}
                    placeholder="e.g. Senior Software Engineer"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                />
            </label>
            <label className="flex flex-col">
                <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Email Address</p>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email || ''}
                    onChange={handleChange}
                    placeholder="e.g. jane.doe@email.com"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                />
            </label>
            <label className="flex flex-col">
                <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Phone Number</p>
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={data.phone || ''}
                    onChange={handleChange}
                    placeholder="e.g. +1 234 567 890"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                />
            </label>
            <label className="flex flex-col md:col-span-2">
                <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Location</p>
                <input
                    id="location"
                    name="location"
                    value={data.location || ''}
                    onChange={handleChange}
                    placeholder="e.g. San Francisco, CA"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                />
            </label>
            <label className="flex flex-col">
                <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">LinkedIn URL</p>
                <input
                    id="linkedin"
                    name="linkedin"
                    value={data.linkedin || ''}
                    onChange={handleChange}
                    placeholder="e.g. linkedin.com/in/janedoe"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                />
            </label>
            <label className="flex flex-col">
                <p className="text-[#0d121b] dark:text-gray-200 text-sm font-medium leading-normal pb-2">Portfolio / GitHub URL</p>
                <input
                    id="portfolio"
                    name="portfolio"
                    value={data.portfolio || ''}
                    onChange={handleChange}
                    placeholder="e.g. github.com/janedoe"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary h-12 placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                />
            </label>
        </div>
    );
};

export default HeaderForm;

