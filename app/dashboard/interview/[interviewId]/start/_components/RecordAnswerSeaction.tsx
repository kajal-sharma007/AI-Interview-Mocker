import Webcam from 'react-webcam';
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';

function RecordAnswerSection() {

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
            <Button variant='outline' className='my-10'>Recored Answer</Button>
        </div>
    );
}

export default RecordAnswerSection;
