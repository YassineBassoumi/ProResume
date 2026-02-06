import FormSection from './FormSection';
import HeaderForm from './HeaderForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import ProjectsForm from './ProjectsForm';
import LanguagesForm from './LanguagesForm';
import CertificationsForm from './CertificationsForm';
import AwardsForm from './AwardsForm';

const ResumeForm = ({ resumeData = {}, onChange }) => {

    const handleHeaderChange = (field, value) => {
        onChange('header', { ...resumeData.header, [field]: value });
    };

    const handleSectionChange = (section, value) => {
        onChange(section, value);
    };

    // Safety check
    if (!resumeData || !resumeData.header) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <FormSection title="Header" isOpen={true}>
                <HeaderForm data={resumeData.header} onChange={handleHeaderChange} />
            </FormSection>

            <FormSection title="Professional Summary">
                <SummaryForm data={resumeData.summary} onChange={(field, value) => handleSectionChange('summary', value)} />
            </FormSection>

            <FormSection title="Experience">
                <ExperienceForm data={resumeData.experience} onChange={(value) => handleSectionChange('experience', value)} />
            </FormSection>

            <FormSection title="Education">
                <EducationForm data={resumeData.education} onChange={(value) => handleSectionChange('education', value)} />
            </FormSection>

            <FormSection title="Skills">
                <SkillsForm data={resumeData.skills} onChange={(value) => handleSectionChange('skills', value)} />
            </FormSection>

            <FormSection title="Projects">
                <ProjectsForm data={resumeData.projects} onChange={(value) => handleSectionChange('projects', value)} />
            </FormSection>

            <FormSection title="Languages">
                <LanguagesForm data={resumeData.languages} onChange={(value) => handleSectionChange('languages', value)} />
            </FormSection>

            <FormSection title="Certifications">
                <CertificationsForm data={resumeData.certifications} onChange={(value) => handleSectionChange('certifications', value)} />
            </FormSection>

            <FormSection title="Awards">
                <AwardsForm data={resumeData.awards} onChange={(value) => handleSectionChange('awards', value)} />
            </FormSection>
        </div>
    );
};

export default ResumeForm;
