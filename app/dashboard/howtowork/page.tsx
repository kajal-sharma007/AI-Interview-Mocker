import React from 'react';
import { FaUser, FaTasks, FaPlus, FaQuestionCircle, FaVideo, FaPlay, FaMicrophone, FaStar } from 'react-icons/fa';

const HowToWork: React.FC = () => {
    return (
        <div className="flex flex-col p-6 space-y-4">
            <div className="border rounded-lg bg-blue-50 border-blue-300 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                    <FaUser className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-blue-600 font-bold text-xl">
                        <strong>Step 1:</strong> User SignUp and SignIn
                    </h2>
                </div>
                <p className="text-gray-700">
                    Register or log in to your account to access the dashboard and manage your interview processes.
                </p>
            </div>
            <div className="border rounded-lg bg-blue-50 my-2 border-blue-300 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                    <FaTasks className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-blue-600 font-bold text-xl">
                        <strong>Step 2:</strong> Create a New AI Mock Interview
                    </h2>
                </div>
                <p className="text-gray-700">
                    Navigate to the dashboard page and initiate the creation of a new AI mock interview.
                </p>
            </div>
            <div className="border rounded-lg bg-blue-50 my-2 border-blue-300 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                    <FaPlus className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-blue-600 font-bold text-xl">
                        <strong>Step 3:</strong> Add Interview Details
                    </h2>
                </div>
                <p className="text-gray-700">
                    Click the "Add New" button on the dashboard page. Provide details such as job position, skills, and years of experience.
                </p>
            </div>
            <div className="border rounded-lg bg-blue-50 my-2 border-blue-300 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                    <FaQuestionCircle className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-blue-600 font-bold text-xl">
                        <strong>Step 4:</strong> Generate Interview Questions
                    </h2>
                </div>
                <p className="text-gray-700">
                    After entering the required information, the AI will generate a list of interview questions based on your inputs.
                </p>
            </div>
            <div className="border rounded-lg bg-blue-50 my-2 border-blue-300 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                    <FaVideo className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-blue-600 font-bold text-xl">
                        <strong>Step 5:</strong> Enable Camera
                    </h2>
                </div>
                <p className="text-gray-700">
                    Ensure your camera is enabled before starting the interview to facilitate a complete mock interview experience.
                </p>
            </div>
            <div className="border rounded-lg bg-blue-50 my-2 border-blue-300 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                    <FaPlay className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-blue-600 font-bold text-xl">
                        <strong>Step 6:</strong> Start the Mock Interview
                    </h2>
                </div>
                <p className="text-gray-700">
                    On the interview page, click the "Start Interview" button to begin the AI mock interview session.
                </p>
            </div>
            <div className="border rounded-lg bg-blue-50 my-2 border-blue-300 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                    <FaMicrophone className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-blue-600 font-bold text-xl">
                        <strong>Step 7:</strong> Answer the Questions
                    </h2>
                </div>
                <p className="text-gray-700">
                    The AI will present questions one by one. Respond to each question using voice recording.
                </p>
            </div>
            <div className="border rounded-lg bg-blue-50 my-2 border-blue-300 p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <div className="flex items-center mb-2">
                    <FaStar className="text-blue-500 text-2xl mr-3" />
                    <h2 className="text-blue-600 font-bold text-xl">
                        <strong>Step 8:</strong> Review Feedback
                    </h2>
                </div>
                <p className="text-gray-700">
                    After completing the interview, the AI will store all recorded answers and provide feedback, including ratings and suggestions based on your responses.
                </p>
            </div>
        </div>
    );
};

export default HowToWork;
