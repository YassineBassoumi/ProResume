import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';

const LanguagesForm = ({ data, onChange }) => {
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
                proficiency: 'Native',
            },
        ]);
    };

    const handleRemove = (index) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="flex-1">
                            <Input
                                value={item.name || ''}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                placeholder="Language (e.g. Spanish)"
                            />
                        </div>
                        <div className="w-40">
                            <Select
                                value={item.proficiency || 'Native'}
                                onValueChange={(value) => handleChange(index, 'proficiency', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Native">Native</SelectItem>
                                    <SelectItem value="Fluent">Fluent</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() => handleRemove(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
            <Button onClick={handleAdd} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Language
            </Button>
        </div>
    );
};

export default LanguagesForm;
