import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus } from 'lucide-react';

const AwardsForm = ({ data, onChange }) => {
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
                date: '',
                awarder: '',
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
            {data.map((award, index) => (
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
                            <Label>Award Title</Label>
                            <Input
                                value={award.title}
                                onChange={(e) => handleChange(index, 'title', e.target.value)}
                                placeholder="Employee of the Month"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input
                                type="month"
                                value={award.date}
                                onChange={(e) => handleChange(index, 'date', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Awarder / Organization</Label>
                            <Input
                                value={award.awarder}
                                onChange={(e) => handleChange(index, 'awarder', e.target.value)}
                                placeholder="Company Name or Organization"
                            />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={award.description}
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                placeholder="Describe the award..."
                                className="min-h-[80px]"
                            />
                        </div>
                    </div>
                </div>
            ))}
            <Button onClick={handleAdd} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Award
            </Button>
        </div>
    );
};

export default AwardsForm;
