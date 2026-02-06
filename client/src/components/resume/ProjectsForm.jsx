import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Trash2, Plus } from 'lucide-react';

const ProjectsForm = ({ data, onChange }) => {
    const handleChange = (index, field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        onChange(newData);
    };

    const handleAdd = () => {
        onChange([
            ...data,
            {
                name: '',
                technologies: '',
                link: '',
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
            {data.map((project, index) => (
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
                            <Label>Project Title</Label>
                            <Input
                                value={project.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                placeholder="Project Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Tech Stack</Label>
                            <Input
                                value={project.technologies}
                                onChange={(e) => handleChange(index, 'technologies', e.target.value)}
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label>Project Link</Label>
                            <Input
                                value={project.link}
                                onChange={(e) => handleChange(index, 'link', e.target.value)}
                                placeholder="github.com/username/project"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>Description</Label>
                            <ReactQuill
                                theme="snow"
                                value={project.description}
                                onChange={(value) => handleChange(index, 'description', value)}
                                className="bg-white dark:bg-gray-900"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <Button onClick={handleAdd} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Project
            </Button>
        </div>
    );
};

export default ProjectsForm;
