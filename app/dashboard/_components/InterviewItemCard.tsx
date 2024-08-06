import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

// Define TypeScript types for the interview prop
interface InterviewItem {
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string | null;
    mockId: string;
}

interface InterviewItemCardProps {
    interview: InterviewItem;
}

const InterviewItemCard: React.FC<InterviewItemCardProps> = ({ interview }) => {
    const router = useRouter();
    const Restart = () => {
        router.push('/dashboard/interview/' + interview.mockId)
    }
    const Feedback = () => {
        router.push('/dashboard/interview/' + interview.mockId + '/feedback')
    }
    return (
        <div className='border shadow-sm rounded-lg p-3'>
            <h2 className='font-bold text-primary'>{interview.jobPosition}</h2>
            <h2 className='text-sm text-gray-600'>{interview.jobExperience} Years of Experience</h2>
            <h2 className='text-xs text-gray-400'>Interview Date: {interview.createdAt}</h2>
            <div className='mt-2 my-2 flex justify-between gap-5'>
                <Button onClick={Restart} size='sm' className='w-full'>Restart</Button>
                <Button onClick={Feedback} size='sm' variant='outline' className='w-full'>Feedback</Button>
            </div>
        </div>
    )
}

export default InterviewItemCard;
