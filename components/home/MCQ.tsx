import React, { useState } from 'react';

interface MCQOption {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface MCQProps {
  question: string;
  options: MCQOption[];
}

const MCQComponent: React.FC<MCQProps> = ({ question, options }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean>(false);

  const handleOptionSelect = (optionId: number, isCorrect: boolean) => {
    setSelectedOption(optionId);
    setIsAnswerCorrect(isCorrect);
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>{question}</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {options.map((option) => (
          <li
            key={option.id}
            style={{
              cursor: 'pointer',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              marginBottom: '5px',
              backgroundColor:
                selectedOption === option.id ? 'lightgreen' : 'transparent',
            }}
            onClick={() => handleOptionSelect(option.id, option.isCorrect)}
          >
            {option.text}
            {option.isCorrect && selectedOption !== null && isAnswerCorrect && (
              <span
                style={{
                  marginLeft: '10px',
                  color: 'green',
                  fontWeight: 'bold',
                }}
              >
                Correct Answer
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MCQComponent;
