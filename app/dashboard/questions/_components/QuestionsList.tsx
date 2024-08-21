"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionItemCard from './QuestionItemCard';

// Define TypeScript types for the interview item
interface questionItem {
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string | null;
    mockId: string;
}

function QuestionList() {
    const { user } = useUser();
    const [questionList, setQuestionList] = useState<questionItem[]>([]);

    useEffect(() => {
        if (user) {
            GetQuestionList();
        }
    }, [user]);

    const GetQuestionList = async () => {
        const email = user?.primaryEmailAddress?.emailAddress;

        if (!email) {
            console.error('User email address is not defined');
            return;
        }

        try {
            // Create a query to fetch interviews
            const query = db.select().from(MockInterview)
                .where(eq(MockInterview.createdBy, email))
                .orderBy(desc(MockInterview.id));

            // Execute the query
            const result = await query;

            console.log(result);
            setQuestionList(result);
        } catch (error) {
            console.error('Error fetching interview list:', error);
        }
    }

    return (
        <div className='p-5'>
            <h2 className='font-medium text-xl mb-4'>Previous Mock Interview Questions</h2>
            {questionList.length > 0 ? (
                <div className='flex flex-col gap-5 my-3 w-full'>
                    {questionList.map((question) => (
                        <QuestionItemCard key={question.mockId} question={question} ActiveQuestionIndex={0} />
                    ))}
                </div>
            ) : (
                <p>No interview questions found.</p>
            )}
        </div>
    );
}

export default QuestionList;


