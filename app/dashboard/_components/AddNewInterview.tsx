"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAi';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from "uuid";
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobRole, setJobRole] = useState<string>('');
    const [jobDesc, setJobDesc] = useState<string>('');
    const [jobExp, setJobExp] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState<any>(null);
    const router = useRouter();
    const { user } = useUser();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const inputPrompt = `Job Position: ${jobRole}, Job Description: ${jobDesc}, Years of Experience: ${jobExp}. Based on the job position, job description, and years of experience, provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions along with answers in JSON format. Provide fields for question and answer in the JSON.`;

        try {
            const result = await chatSession.sendMessage(inputPrompt);
            const MockJsonResp = result.response.text().replace(/```json|```/g, '');

            try {
                const parsedJsonResponse = JSON.parse(MockJsonResp);
                console.log(parsedJsonResponse);
                setJsonResponse(parsedJsonResponse);

                // Insert into the database
                const [insertedRecord] = await db.insert(MockInterview)
                    .values({
                        mockId: uuidv4(),
                        jsonMockResp: MockJsonResp,
                        jobPosition: jobRole,
                        jobDesc: jobDesc,
                        jobExperience: jobExp,
                        createdBy: user?.primaryEmailAddress?.emailAddress || '',
                        createdAt: moment().format('YYYY-MM-DD')
                    })
                    .returning({ mockId: MockInterview.mockId });

                console.log("Inserted ID:", insertedRecord.mockId);

                if (insertedRecord) {
                    setOpenDialog(false);
                    // Navigate to the new interview page
                    router.push(`/dashboard/interview/${insertedRecord.mockId}`);
                }
            } catch (jsonError) {
                console.error('Error parsing JSON response:', jsonError);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer'>
                <h2 onClick={() => setOpenDialog(true)} className='font-bold text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle className='font-bold text-2xl'>Tell us more about the job you are interviewing for</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h1>Add details about the job position, your skills, and years of experience</h1>
                                    <div className='mt-7 my-3'>
                                        <label className='font-bold text-black'>Job Role/Position</label>
                                        <Input
                                            placeholder='Ex. Full Stack Developer'
                                            required
                                            onChange={(event) => setJobRole(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-bold text-black'>Job Description</label>
                                        <Textarea
                                            placeholder='Ex. React, Angular, NodeJS, MySql, etc...'
                                            required
                                            onChange={(event) => setJobDesc(event.target.value)}
                                        />
                                    </div>
                                    <div className='my-3'>
                                        <label className='font-bold text-black'>Years of Experience</label>
                                        <Input
                                            placeholder='Ex. 5'
                                            type='number'
                                            max={50}
                                            required
                                            onChange={(event) => setJobExp(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading ?
                                            <>
                                                <LoaderCircle className='animate-spin' /> Generating from AI
                                            </> : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AddNewInterview;
