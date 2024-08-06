"use client"

import Webcam from 'react-webcam';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAi';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

interface Question {
    question: string;
    answer: string;
}

interface InterviewData {
    mockId: string;
    // Add other properties as needed
}

interface QuestionSectionProps {
    mockInterviewQuestion?: Question[];
    ActiveQuestionIndex: number;
    interviewData: InterviewData; // Update type here
}


const RecordAnswerSection: React.FC<QuestionSectionProps> = ({ mockInterviewQuestion, ActiveQuestionIndex, interviewData }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const { user } = useUser();
    const [loading, setloading] = useState(false);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        finalTranscript,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    // Handler functions
    const handleStartListening = () => {
        SpeechRecognition.startListening({ continuous: true });
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
    };

    // Update userAnswer when transcript or finalTranscript changes
    useEffect(() => {
        if (finalTranscript) {
            setUserAnswer(finalTranscript);
        } else {
            setUserAnswer(prevAns => prevAns + transcript);
        }
    }, [transcript, finalTranscript]);

    const saveUserAnswer = async () => {
        if (listening) {
            setloading(true)
            handleStopListening();
            if (userAnswer.length < 10) {
                setloading(false)
                toast.error('Error while saving your answer. Please record again.');
                return;
            }
            const questions = mockInterviewQuestion || [];
            const questionText = questions[ActiveQuestionIndex]?.question || "No question available";
            const feedbackPrompt = `Question: ${questionText}. User Answer: ${userAnswer}. Provide a rating and feedback in JSON format with rating and feedback fields.`;

            try {
                const result = await chatSession.sendMessage(feedbackPrompt);
                const mockJsonResp = result.response.text().replace(/```json|```/g, '');
                console.log('Feedback Response:', mockJsonResp);
                const JsonFeedbackResp = JSON.parse(mockJsonResp);
                const resp = await db.insert(UserAnswer)
                    .values({
                        mockIdRef: interviewData?.mockId,
                        question: questions[ActiveQuestionIndex]?.question,
                        correctAns: questions[ActiveQuestionIndex]?.answer,
                        userAns: userAnswer,
                        feedback: JsonFeedbackResp?.feedback,
                        rating: JsonFeedbackResp?.rating,
                        userEmail: user?.primaryEmailAddress?.emailAddress,
                        createdAt: moment().format('DD-MM-YYYY')
                    })
                if (resp) {
                    toast('User Answer recorded successfully')
                    setUserAnswer('')
                    resetTranscript()
                }
                resetTranscript()
                setloading(false)
            } catch (error) {
                console.error('Error in sending message:', error);
                toast.error('Error while saving feedback');
            }
        } else {
            handleStartListening();
        }
    };


    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col mt-10 justify-center items-center bg-black rounded-lg p-2 relative'>
                <Image src='/webcam.jpg' alt='Webcam' width={200} height={200} className='absolute rounded-lg' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 400,
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <Button disabled={loading} variant='outline' className='my-10' onClick={saveUserAnswer}>
                {listening ?
                    <h2 className='text-red-600 flex gap-2'>
                        <Mic /> Stop Recording
                    </h2>
                    :
                    'Record Answer'
                }
            </Button>
        </div>
    );
}

export default RecordAnswerSection;
