import Webcam from 'react-webcam';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAi';

interface Question {
    question: string;
}

interface QuestionSectionProps {
    mockInterviewQuestion?: Question[];
    ActiveQuestionIndex: number;
}

const RecordAnswerSection: React.FC<QuestionSectionProps> = ({ mockInterviewQuestion, ActiveQuestionIndex }) => {
    const [userAnswer, setUserAnswer] = useState('');
    const {
        transcript,
        listening,
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
            handleStopListening();
            if (userAnswer.length < 10) {
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
                // Process the response as needed
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
            <Button variant='outline' className='my-10' onClick={saveUserAnswer}>
                {listening ?
                    <h2 className='text-red-600 flex gap-2'>
                        <Mic /> Stop Recording
                    </h2>
                    :
                    'Record Answer'
                }
            </Button>
            <Button onClick={() => console.log('User Answer:', userAnswer)}>Show Answer</Button>
        </div>
    );
}

export default RecordAnswerSection;
