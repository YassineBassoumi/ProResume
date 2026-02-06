import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Trash2, Plus } from 'lucide-react';

const EducationForm = ({ data, onChange }) => {
    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleAdd = () => {
        onChange([
            ...data,
            {
                degree: '',
                school: '',
                location: '',
                startDate: '',
                endDate: '',
                fieldOfStudy: '',
                gpa: '',
                description: '',
            },
        ]);
    };

    const handleRemove = (index) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            {data.map((edu, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4 relative">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={() => handleRemove(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                        <div className="space-y-2">
                            <Label>Degree / Qualification</Label>
                            <Input
                                value={edu.degree}
                                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                                placeholder="Bachelor of Science"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>School / University</Label>
                            <Input
                                value={edu.school}
                                onChange={(e) => handleChange(index, 'school', e.target.value)}
                                placeholder="University Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={edu.location}
                                onChange={(e) => handleChange(index, 'location', e.target.value)}
                                placeholder="City, State"
                            />
                        </div>
                        <div className="space-y-2 flex items-end gap-2">
                            <div className="flex-1 space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                    type="month"
                                    value={edu.startDate}
                                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label>End Date</Label>
                                <Input
                                    type="month"
                                    value={edu.endDate}
                                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Field of Study</Label>
                            <Input
                                value={edu.fieldOfStudy}
                                onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
                                placeholder="Computer Science"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>GPA (Optional)</Label>
                            <Input
                                value={edu.gpa}
                                onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                                placeholder="3.8"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>Description</Label>
                            <ReactQuill
                                theme="snow"
                                value={edu.description}
                                onChange={(value) => handleChange(index, 'description', value)}
                                className="bg-white dark:bg-gray-900"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <Button onClick={handleAdd} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
        </div>
    );
};

export default EducationForm;
