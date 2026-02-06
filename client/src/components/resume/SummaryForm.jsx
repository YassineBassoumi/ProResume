import AIAssistant from './AIAssistant';

const SummaryForm = ({ data, onChange, resumeData }) => {
    const handleChange = (e) => {
        onChange('summary', e.target.value);
    };

    const handleAIApply = (generatedContent) => {
        onChange('summary', generatedContent);
    };

    const characterCount = (data || '').length;

    // Extract context for AI
    const aiContext = {
        jobTitle: resumeData?.header?.title || '',
        skills: resumeData?.skills?.map(s => s.name).join(', ') || '',
        experience: resumeData?.experience?.[0]?.title || ''
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Professional Summary
                </label>
                <AIAssistant
                    type="summary"
                    context={aiContext}
                    onApply={handleAIApply}
                />
            </div>
            <textarea
                className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-[#0d121b] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#cfd7e7] dark:border-gray-600 bg-background-light dark:bg-gray-800 focus:border-primary min-h-[160px] placeholder:text-[#4c669a] p-[15px] text-base font-normal leading-normal"
                placeholder="e.g. Results-driven Senior Software Engineer with 8+ years of experience in developing scalable web applications..."
                value={data || ''}
                onChange={handleChange}
            />
            <p className="text-right text-xs text-[#4c669a] dark:text-gray-400">
                {characterCount} / 300 characters (suggested limit)
            </p>
        </div>
    );
};

export default SummaryForm;

