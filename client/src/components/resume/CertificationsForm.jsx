import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Trash2, Plus } from 'lucide-react';

const CertificationsForm = ({ data, onChange }) => {
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
                issuer: '',
                date: '',
            },
        ]);
    };

    const handleRemove = (index) => {
        const newData = data.filter((_, i) => i !== index);
        onChange(newData);
    };

    return (
        <div className="space-y-6">
            {data.map((cert, index) => (
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
                            <Label>Certification Name</Label>
                            <Input
                                value={cert.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                placeholder="AWS Certified Solutions Architect"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Issuer</Label>
                            <Input
                                value={cert.issuer}
                                onChange={(e) => handleChange(index, 'issuer', e.target.value)}
                                placeholder="Amazon Web Services"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <Input
                                type="month"
                                value={cert.date}
                                onChange={(e) => handleChange(index, 'date', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ))}
            <Button onClick={handleAdd} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" /> Add Certification
            </Button>
        </div>
    );
};

export default CertificationsForm;
