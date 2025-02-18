"use client"

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronDown, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

// Define the type for a single feedback item
interface FeedbackItem {
    id: number;
    createdAt: string | null;
    mockIdRef: string;
    question: string;
    correctAns: string | null;
    userAns: string | null;
    feedback: string | null;
    rating: string | null;
    userEmail: string | null;
}

// Define the type for feedbackList state
interface FeedbackProps {
    params: {
        interviewId: string;
    };
}

function Feedback({ params }: FeedbackProps) {
    const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([]);
    const router = useRouter()

    useEffect(() => {
        GetFeedback();
    }, []);

    const GetFeedback = async () => {
        try {
            const result = await db.select()
                .from(UserAnswer)
                .where(eq(UserAnswer.mockIdRef, params.interviewId))
                .orderBy(UserAnswer.id);
            console.log(result);
            setFeedbackList(result);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    return (
        <div className='p-10'>
            <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
            <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
            <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>
            {feedbackList && feedbackList.map((item, index) => {
                return (
                    <Collapsible key={index} className='mt-7'>
                        <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-7 w-full'>{item.question}<ChevronsUpDown /></CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
                                <h2 className='p-2 border rounded-lg bg-red-200 text-sm text-red-700'><strong>Your Answer:</strong>{item.userAns}</h2>
                                <h2 className='p-2 border rounded-lg bg-green-200 text-sm text-green-700'><strong>Correct Answer:</strong>{item.correctAns}</h2>
                                <h2 className='p-2 border rounded-lg bg-blue-200 text-sm text-blue-700'><strong>Feedback:</strong>{item.feedback}</h2>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                );
            })}
            <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
        </div>
    );
}

export default Feedback;
