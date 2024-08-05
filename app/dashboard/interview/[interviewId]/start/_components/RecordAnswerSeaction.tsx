import Webcam from 'react-webcam';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Mic } from 'lucide-react';

const RecordAnswerSection: React.FC = () => {
    const [userAnswer, setUserAnswer] = useState('');
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        finalTranscript,  // Add finalTranscript if available
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    // Handler functions
    const handleStartListening = () => {
        SpeechRecognition.startListening();
    };

    const handleStopListening = () => {
        SpeechRecognition.stopListening();
    };

    // Update userAnswer when transcript changes
    useEffect(() => {
        setUserAnswer(prevAns => prevAns + transcript);
    }, [transcript]);

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='flex flex-col mt-10 justify-center items-center bg-black rounded-lg p-2 relative'>
                <Image src={'/webcam.jpg'} alt='webCam' width={200} height={200} className='absolute rounded-lg' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 400,
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <Button variant='outline' className='my-10'
                onClick={listening ? handleStopListening : handleStartListening}>
                {listening ?
                    <h2 className='text-red-600 flex gap-2'>
                        <Mic /> Stop Recording
                    </h2>
                    :
                    'Record Answer'
                }
            </Button>
            <Button onClick={() => console.log(userAnswer)}>Show Answer</Button> {/* Display the final concatenated answer */}
        </div>
    );
}

export default RecordAnswerSection;
