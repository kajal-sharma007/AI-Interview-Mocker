"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import InterviewItemCard from './InterviewItemCard';

// Define TypeScript types for the interview item
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

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState<InterviewItem[]>([]);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
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
            setInterviewList(result);
        } catch (error) {
            console.error('Error fetching interview list:', error);
        }
    }

    return (
        <div className='p-5'>
            <h2 className='font-medium text-xl mb-4'>Previous Mock Interviews</h2>
            {interviewList.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                    {interviewList.map((interview) => (
                        <InterviewItemCard key={interview.id} interview={interview} />
                    ))}
                </div>
            ) : (
                <p>No interviews found.</p>
            )}
        </div>
    );
}

export default InterviewList;
