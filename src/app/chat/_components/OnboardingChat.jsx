"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import api from '../../../lib/chatapi';
import { RefreshCw } from 'lucide-react';
import { useAuthStore } from '@store/useStore';
export const dynamic = "force-dynamic";
const ONBOARDING_QUESTIONS = [
  {
    id: 'welcome',
    message: "Let's get you set up to use the vehicle portal. To provide you with personalized service, I'll need some information about your vehicle. Ready to begin?",
    type: 'multiple_choice',
    options: ['Yes, sure!', 'No, thanks'],
    required: true
  },
  {
    id: 'mileage_range',
    message: 'What is the current mileage of your vehicle?',
    type: 'multiple_choice',
    options: ['10,000ml- 49,000ml', '50,000ml - 75,00ml', 'None of this'],
    required: true
  },
  {
    id: 'exact_mileage',
    message: 'Kindly enter your mileage',
    type: 'number',
    required: true,
    validation: (value) => value > 0 && value < 1000000
  },
  {
    id: 'last_oil_change',
    message: 'When was the last oil change?',
    type: 'date',
    required: true
  },
  {
    id: 'engine_check',
    message: 'When last did you check your engine',
    type: 'multiple_choice',
    options: ['1-3 months ago', '3-6 months ago', 'Over 6 months ago'],
    required: true
  },
  {
    id: 'confirmation',
    message: "Great! I've collected all the information. Would you like to submit and complete the setup?",
    type: 'multiple_choice',
    options: ['Yes, submit', 'No, let me review'],
    required: true
  }
];

// Rest of the component code remains the same until handleResponse

const handleResponse = (response) => {
    const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];

    if (currentQuestion.validation && !currentQuestion.validation(response)) {
      setError('Please provide a valid response.');
      return;
    }

    setError('');
    setMessages(prev => [...prev, { content: response.toString(), role: 'user' }]);
    
    const newResponses = {
      ...responses,
      [currentQuestion.id]: response
    };
    setResponses(newResponses);

    if (currentQuestion.id === 'confirmation') {
      if (response === 'Yes, submit') {
        handleSubmit(newResponses);
      } else {
        // Show review of responses
        const reviewMessage = Object.entries(newResponses)
          .filter(([key]) => key !== 'confirmation')
          .map(([key, value]) => {
            const question = ONBOARDING_QUESTIONS.find(q => q.id === key);
            return `${question.message}: ${value}`;
          })
          .join('\n');
        
        setMessages(prev => [...prev, {
          content: `Here's what you provided:\n${reviewMessage}\n\nWould you like to submit now?`,
          role: 'assistant'
        }]);
      }
      return;
    }

    if (currentQuestionIndex < ONBOARDING_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, {
          content: ONBOARDING_QUESTIONS[currentQuestionIndex + 1].message,
          role: 'assistant'
        }]);
      }, 500);
    }
};


// Rest of the code remains the same

const OnboardingChat = () => {
  const [messages, setMessages] = useState([{
    content: ONBOARDING_QUESTIONS[0].message,
    role: 'assistant'
  }]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef(null);
  const router = useRouter();
  const { user, updateProfilePics } = useAuthStore();
  const [userProfilePic, setUserProfilePic] = useState("/assets/icons/avatar.png");

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth-storage');
    if (storedAuth) {
      try {
        const parsedAuth = JSON.parse(storedAuth);
        const profilePic = parsedAuth?.state?.user?.profile_picture;
        if (profilePic) {
          setUserProfilePic(profilePic);
          updateProfilePics(profilePic); // Update the store
        }
      } catch (error) {
        console.error('Error parsing auth storage:', error);
      }
    }
  }, [updateProfilePics]);
  const [hasPreviousSession, setHasPreviousSession] = useState(false);
//   useEffect(() => {
//     checkPreviousSession();
//   }, []);
  
//   const checkPreviousSession = () => {
//     const savedProgress = localStorage.getItem('onboardingProgress');
//     if (savedProgress) {
//       const { responses: savedResponses, currentIndex } = JSON.parse(savedProgress);
//       setHasPreviousSession(true);
//       setResponses(savedResponses);
//       setCurrentQuestionIndex(currentIndex);
//       rebuildMessages(savedResponses, currentIndex);
//       console.log(user?.profile_picture);
//     } else {
//       setMessages([{
//         content: ONBOARDING_QUESTIONS[0].message,
//         role: 'assistant'
//       }]);
//     }
//   };
  useEffect(() => {
    const savedProgress = localStorage.getItem('onboardingProgress');
    if (savedProgress) {
      setHasPreviousSession(true);
      const { responses: savedResponses, currentIndex } = JSON.parse(savedProgress);
      setResponses(savedResponses);
      setCurrentQuestionIndex(currentIndex);
      rebuildMessages(savedResponses, currentIndex);

    } else {
      initializeChat();
    }
  }, []);

// 

  const initializeChat = () => {
    setMessages([{
      content: ONBOARDING_QUESTIONS[0].message,
      role: 'assistant'
    }]);
    setCurrentQuestionIndex(0);
  };

  const rebuildMessages = (savedResponses, currentIndex) => {
    const rebuiltMessages = [];
    for (let i = 0; i < currentIndex && i < ONBOARDING_QUESTIONS.length; i++) {
      rebuiltMessages.push({
        content: ONBOARDING_QUESTIONS[i].message,
        role: 'assistant',
      });
      if (savedResponses[ONBOARDING_QUESTIONS[i].id]) {
        rebuiltMessages.push({
          content: savedResponses[ONBOARDING_QUESTIONS[i].id].toString(),
          role: 'user',
        });
      }
    }
    if (currentIndex < ONBOARDING_QUESTIONS.length) {
      rebuiltMessages.push({
        content: ONBOARDING_QUESTIONS[currentIndex].message,
        role: 'assistant'
      });
    }
    setMessages(rebuiltMessages);
  };

  const handleRestartForm = () => {
    localStorage.removeItem('onboardingProgress');
    setMessages([{
      content: ONBOARDING_QUESTIONS[0].message,
      role: 'assistant'
    }]);
    setCurrentQuestionIndex(0);
    setResponses({});
    setError('');
    setHasPreviousSession(false);
  };
  const handleResponse = (response) => {
    const currentQuestion = ONBOARDING_QUESTIONS[currentQuestionIndex];

    if (currentQuestion.validation && !currentQuestion.validation(response)) {
      setError('Please provide a valid response.');
      return;
    }

    setError('');
    setMessages(prev => [...prev, { content: response.toString(), role: 'user' }]);
    
    const newResponses = {
      ...responses,
      [currentQuestion.id]: response
    };
    setResponses(newResponses);

    // Save to localStorage
    localStorage.setItem('onboardingProgress', JSON.stringify({
      responses: newResponses,
      currentIndex: currentQuestionIndex + 1
    }));

    if (currentQuestionIndex < ONBOARDING_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setMessages(prev => [...prev, {
          content: ONBOARDING_QUESTIONS[currentQuestionIndex + 1].message,
          role: 'assistant'
        }]);
      }, 500);
    } else {
      handleSubmit(newResponses);
    }
  };
  const handleOptionSelect = (option) => {
    if (option === 'No, thanks' && currentQuestionIndex === 0) {
      setError('Please select "Yes, sure!" to continue with the onboarding process.');
      return;
    }

    handleResponse(option);
  };



  const handleSubmit = async (finalResponses) => {
    setIsSubmitting(true);
    try {
      const response = await api.post('/api/onboarding', finalResponses);
      if (response.status === "success") {
        localStorage.removeItem('onboardingProgress'); // Clear storage on successful submit
        setMessages(prev => [...prev, {
          content: 'Thank you for completing the onboarding process!',
          role: 'assistant'
        }]);
        setTimeout(() => router.push('/dashboard'), 2000);
      }
    } catch (error) {
      console.error('Error submitting onboarding:', error);
      setError('There was an error saving your responses. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentQuestion = () => ONBOARDING_QUESTIONS[currentQuestionIndex];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
        <div className="relative w-full h-40 flex-shrink-0">
          <Image
            src="/assets/images/bg-img3.png"
            alt="Background image"
            fill
            className="object-cover"
          />
        </div>
      <div className="flex-1 flex flex-col -mt-24 px-4 relative mb-32">
        <div className="max-w-[1200px] rounded-t-2xl mx-auto w-full h-[calc(100vh-100px)] ">
          <div className="bg-white rounded-2xl shadow-xl h-full flex flex-col">
          {hasPreviousSession && (
              <div className="p-4 bg-purple-50 border-b rounded-t-2xl flex justify-between items-center">
                <p className="text-sm">Continue your previous session?</p>
                <button
                  onClick={handleRestartForm}
                  className="px-4 py-2 text-sm border rounded-lg hover:bg-white transition-colors flex items-center gap-2"
                >
                  <RefreshCw size={16} />
                  Restart
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-6 ">
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start mb-6 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}>
                  {message.role === "assistant" && (
                    <div className="w-8 h-8 rounded-full bg-purple-100 mr-3 flex-shrink-0">
                      <Image
                        src="/assets/icons/Media.jpeg (1).png"
                        alt="Assistant"
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                  )}
                  <div className={`flex flex-col max-w-[80%] ${
                    message.role === "user" ? "items-end" : "items-start"
                  }`}>
                    <div className={`rounded-lg p-3 ${
                      message.role === "user" 
                        ? "bg-purple-50 rounded-tr-none" 
                        : "bg-gray-50 rounded-tl-none"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                  {message.role === "user" && (
                    <div className="w-12 h-12 rounded-full ml-3 flex-shrink-0">
                    <Image
                    src={ userProfilePic }
                    alt="Avatar"
                    width={50}
                    height={50}
                    className="p-1 ml-1 rounded-full object-cover"
                    />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Current Question */}
              {!isSubmitting && getCurrentQuestion() && (
                <div className="flex items-start mb-6">
                  <div className="w-8 h-8 rounded-full bg-purple-100 mr-3 flex-shrink-0">
                    <Image
                      src="/assets/icons/Media.jpeg (1).png"
                      alt="Assistant"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col max-w-[80%]">
                    <div className="rounded-lg p-3 bg-gray-50 rounded-tl-none">
                      {getCurrentQuestion()?.type === 'multiple_choice' && (
                        <div className="flex flex-wrap gap-2">
                          {getCurrentQuestion().options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleOptionSelect(option)}
                              className="px-4 py-2 text-sm border rounded-lg hover:bg-purple-50 transition-colors"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                      {getCurrentQuestion()?.type === 'number' && (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            className="flex-1 p-2 border rounded"
                            placeholder="Enter mileage"
                            min="0"
                            max="999999"
                          />
                          <button
                            onClick={(e) => {
                              const input = e.target.previousSibling;
                              handleResponse(Number(input.value));
                            }}
                            className="px-4 py-2 text-sm border rounded-lg hover:bg-purple-50 transition-colors"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      {getCurrentQuestion()?.type === 'date' && (
                        <div>
                          <input
                            type="date"
                            className="w-full p-2 border rounded"
                            onChange={(e) => handleResponse(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    {error && (
                      <p className="text-red-500 text-xs mt-2">{error}</p>
                    )}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingChat;