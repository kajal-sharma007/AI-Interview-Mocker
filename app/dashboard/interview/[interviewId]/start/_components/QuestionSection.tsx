import { Lightbulb } from 'lucide-react';
import React from 'react';

// Define the type for a question object if known
interface Question {
    question: string;
}

interface QuestionSectionProps {
    mockInterviewQuestion?: Question[]; // Make this prop optional
    ActiveQuestionIndex: number;
}

const QuestionSection: React.FC<QuestionSectionProps> = ({ mockInterviewQuestion = [], ActiveQuestionIndex }) => {
    // Ensure mockInterviewQuestion is always an array
    const questions = mockInterviewQuestion || [];

    return mockInterviewQuestion && (
        <div className='p-5 border rounded-lg my-10  '>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                {questions.length > 0 ? (
                    questions.map((question, index) => (
                        <h2
                            className={`p-2 bg-secondary rounded-full text-xs md:text-sm text-center cursor-pointer 
                            ${ActiveQuestionIndex === index ? 'bg-purple-700 text-white' : ''}`}
                            key={index}
                        >
                            Question #{index + 1}
                        </h2>
                    ))
                ) : (
                    <p>No questions available</p> // Optional: Provide feedback if there are no questions
                )}

            </div>
            <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[ActiveQuestionIndex]?.question}</h2>
            <div className='border rounded-lg p-5 bg-blue-300 mt-20'>
                <h2 className='flex gap-2 items-center text-primary'>
                    <Lightbulb />
                    <strong>Note:</strong>
                </h2>
                <h2 className='text-sm text-primary my-2'>{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
            </div>
        </div>
    );
};

export default QuestionSection;
