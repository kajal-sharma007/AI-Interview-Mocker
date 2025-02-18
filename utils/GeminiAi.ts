import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from '@google/generative-ai';
  
  // Ensure the environment variable is defined
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_GEMININ_API_KEY environment variable is not defined');
  }
  
  // Initialize the GoogleGenerativeAI instance
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Configure the generative model
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });
  
  // Define the configuration for generation
  interface GenerationConfig {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
    responseMimeType: string;
  }
  
  const generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
  };

  export const chatSession = model.startChat({
    generationConfig,
  });
  