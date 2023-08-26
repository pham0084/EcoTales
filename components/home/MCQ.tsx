import React, { useState } from 'react';

interface Option {
    id: number;
    text: string;
}

interface MCQProps {
    question: string;
    options: Option[];
}

const MCQ: React.FC<MCQProps> = ({ question, options }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleOptionClick = (optionId: number) => {
        setSelectedOption(optionId);
    };

    return (
        <div className="p-4 border rounded-md shadow-md">
            <p className="mb-4 text-lg font-semibold">{question}</p>
            <div className="space-y-2">
                {options.map((option) => (
                    <div
                        key={option.id}
                        className={`cursor-pointer p-2 rounded-md ${
                            selectedOption === option.id
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-gray-200'
                        }`}
                        onClick={() => handleOptionClick(option.id)}
                    >
                        {option.text}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MCQ;
