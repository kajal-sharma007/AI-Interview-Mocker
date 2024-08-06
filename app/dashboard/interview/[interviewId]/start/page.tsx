"use client"

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSeaction'; // Ensure this is the correct path
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface StartInterviewProps {
    params: {
        interviewId: string;
    };
}

interface InterviewData {
    mockId: string;
    jsonMockResp: string;
    // Add other fields from your MockInterview schema as needed
}

const StartInterview: React.FC<StartInterviewProps> = ({ params }) => {
    const [interviewData, setInterviewData] = useState<InterviewData | any>(null);
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState<any>(null);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0); // Fixed capitalization and type
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (params.interviewId) {
            GetInterviewDetails(params.interviewId);
        }
    }, [params.interviewId]);

    const GetInterviewDetails = async (interviewId: string) => {
        try {
            const result = await db.select().from(MockInterview)
                .where(eq(MockInterview.mockId, interviewId));

            if (result.length > 0) {
                const jsonMockResp = JSON.parse(result[0].jsonMockResp);
                console.log(jsonMockResp);
                setMockInterviewQuestion(jsonMockResp);
                setInterviewData(result[0]);
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Render a loading state until the data is fetched
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                {/* Questions */}
                <QuestionSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    ActiveQuestionIndex={activeQuestionIndex}
                />

                {/* Video Audio Recording */}
                <RecordAnswerSection
                    mockInterviewQuestion={mockInterviewQuestion}
                    ActiveQuestionIndex={activeQuestionIndex}
                    interviewData={interviewData}
                />
            </div>
            <div className='flex justify-end gap-6'>
                {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex - 1)}>Previous Question</Button>}
                {activeQuestionIndex != mockInterviewQuestion?.length - 1 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>Next Question</Button>}
                <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
                    {activeQuestionIndex == mockInterviewQuestion?.length - 1 && < Button > End Interview</Button>}
                </Link>
            </div>
        </div >
    );
};

export default StartInterview;
