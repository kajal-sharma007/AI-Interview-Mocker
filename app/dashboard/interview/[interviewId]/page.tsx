"use client";

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import Webcam from "react-webcam";
import React, { useEffect, useState } from 'react';
import { LightbulbIcon, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface InterviewDetails {
    id: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string | null;
    mockId: string;
}

interface InterviewProps {
    params: {
        interviewId: string;
    };
}

const Interview: React.FC<InterviewProps> = ({ params }) => {
    // Specify the type for useState
    const [interviewDetails, setInterviewDetails] = useState<InterviewDetails | undefined>(undefined);
    const [webcamEnable, setWebcamEnable] = useState(false)

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
                setInterviewDetails(result[0]);
            } else {
                console.warn('No interview details found');
            }
        } catch (error) {
            console.error('Error fetching interview details:', error);
        }
    };

    return (
        <div className='my-10 flex flex-col justify-center items-center'>
            {interviewDetails ? (
                <div>
                    <h1 className='ml-4 text-2xl font-bold'>LET'S GET STARTED!</h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                        <div className='my-7'>
                            {webcamEnable ? <Webcam
                                onUserMedia={() => setWebcamEnable(true)}
                                onUserMediaError={() => setWebcamEnable(false)}
                                mirrored={true}
                                style={{
                                    height: 300,
                                    width: 300
                                }}
                            />
                                :
                                <>
                                    <WebcamIcon className='h-72 w-full  p-20 bg-secondary rounded-lg border' />
                                    <Button className='mt-5 w-full' onClick={() => setWebcamEnable(true)}>Enable web cam and Microphone</Button>
                                </>
                            }
                        </div>
                        <div className='my-7 flex flex-col gap-3'>
                            <div className='flex flex-col gap-3 p-5 rounded-lg border'>
                                <p><strong className='font-bold text-lg'>JOB POSITION:</strong>&nbsp;{interviewDetails.jobPosition}</p>
                                <p><strong className='font-bold text-lg'>SKILLS:</strong>&nbsp;{interviewDetails.jobDesc}</p>
                                <p><strong className='font-bold text-lg'>EXPERIENCE:</strong>&nbsp;{interviewDetails.jobExperience}</p>
                            </div>
                            <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-200'>
                                <h2 className='flex gap-2 items-center text-yellow-600'><LightbulbIcon /><strong>Information</strong></h2>
                                <h2 className='mt-3 text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
                            </div>
                        </div>
                    </div>
                    <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
                        <Button className='ml-48'>START INTERVIEW</Button>
                    </Link>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Interview;
