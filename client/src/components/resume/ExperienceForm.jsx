import { useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus } from 'lucide-react';
import AIAssistant from './AIAssistant';

const ExperienceForm = ({ data, onChange }) => {
    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleAdd = () => {
        onChange([
            ...data,
            {
                title: '',
                company: '',
                location: '',
                startDate: '',
                endDate: '',
                current: false,
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
            {data.map((exp, index) => (
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
                            <Label>Job Title</Label>
                            <Input
                                value={exp.title}
                                onChange={(e) => handleChange(index, 'title', e.target.value)}
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Company Name</Label>
                            <Input
                                value={exp.company}
                                onChange={(e) => handleChange(index, 'company', e.target.value)}
                                placeholder="Tech Corp"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <Input
                                value={exp.location}
                                onChange={(e) => handleChange(index, 'location', e.target.value)}
                                placeholder="City, State"
                            />
                        </div>
                        <div className="space-y-2 flex items-end gap-2">
                            <div className="flex-1 space-y-2">
                                <Label>Start Date</Label>
                                <Input
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-2">
                                <Label>End Date</Label>
                                <Input
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                                    disabled={exp.current}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 flex items-center space-x-2">
                            <Checkbox
                                id={`current-${index}`}
                                checked={exp.current}
                                onCheckedChange={(checked) => handleChange(index, 'current', checked)}
                            />
                            <Label htmlFor={`current-${index}`}>I currently work here</Label>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Description</Label>
                                <AIAssistant
                                    type="description"
                                    context={{
                                        description: exp.description,
                                        jobTitle: exp.title,
                                        company: exp.company
                                    }}
                                    onApply={(content) => handleChange(index, 'description', content)}
                                />
                            </div>
                            <ReactQuill
                                theme="snow"
                                value={exp.description}
                                onChange={(value) => handleChange(index, 'description', value)}
                                className="bg-white dark:bg-gray-900"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <Button onClick={handleAdd} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
        </div>
    );
};

export default ExperienceForm;
