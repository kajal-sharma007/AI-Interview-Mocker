import React from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';


// Define TypeScript types for the interview prop
interface QuestionItem {
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string | null;
    mockId: string;
}
interface Question {
    question: string;
}

interface QuestionItemCardProps {
    question: QuestionItem;
    mockInterviewQuestion?: Question[]; // Make this prop optional
    ActiveQuestionIndex: number;
}

const QuestionItemCard: React.FC<QuestionItemCardProps> = ({ question, mockInterviewQuestion = [], ActiveQuestionIndex }) => {
    const questions = mockInterviewQuestion || [];
    return (
        <div className='rounded-lg'>
            <Collapsible>
                <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>
                    <h2 className='font-bold text-primary'>{question.jobPosition}</h2>
                    <h2 className='text-sm text-gray-600'>{question.jobExperience} Years of Experience</h2>
                    <h2 className='text-xs text-gray-400'>Interview Date: {question.createdAt}</h2>
                    <ChevronsUpDown />
                </CollapsibleTrigger>
                <CollapsibleContent>
                    {questions[ActiveQuestionIndex]?.question || 'No question available'}
                </CollapsibleContent>
            </Collapsible>

        </div>
    )
}

export default QuestionItemCard;
