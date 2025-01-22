"use client";

import { useState, useEffect } from 'react';
import { Mic, X, Send } from "lucide-react";
import Image from "next/image";
import PulsatingImage from "./PulsatingImage";

export default function Voice({ onMessageSubmit, onClose }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [recordingTime, setRecordingTime] = useState(0);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const getPlatformSpecificYouTubeLink = (query) => {
    const encodedQuery = encodeURIComponent(query);
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    
    const links = {
      web: `https://www.youtube.com/results?search_query=${encodedQuery}`,
      android: {
        app: `youtube://results?search_query=${encodedQuery}`,
        store: `https://play.google.com/store/apps/details?id=com.google.android.youtube`
      },
      ios: {
        app: `youtube://results?search_query=${encodedQuery}`,
        store: `https://apps.apple.com/app/youtube/id544007664`
      }
    };

    return {
      appLink: isAndroid ? links.android.app : 
              isIOS ? links.ios.app : 
              links.web,
      storeLink: isAndroid ? links.android.store : 
                isIOS ? links.ios.store : 
                null,
      webLink: links.web,
      platform: isAndroid ? 'android' : 
               isIOS ? 'ios' : 
               'web'
    };
  };

  const openYouTube = (query) => {
    const { appLink, storeLink, webLink, platform } = getPlatformSpecificYouTubeLink(query);
    
    if (platform === 'web') {
      window.open(webLink, '_blank');
      return;
    }

    const tryApp = () => {
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Timeout'));
        }, 2500);

        window.location.href = appLink;

        document.addEventListener('visibilitychange', function handler() {
          if (document.hidden) {
            clearTimeout(timeout);
            document.removeEventListener('visibilitychange', handler);
            resolve();
          }
        });
      });
    };

    tryApp().catch(() => {
      const goToStore = window.confirm(
        'YouTube app is not installed. Would you like to install it?\n\n' +
        'Click OK to go to the app store\n' +
        'Click Cancel to open in browser'
      );
      
      if (goToStore && storeLink) {
        window.location.href = storeLink;
      } else {
        window.open(webLink, '_blank');
      }
    });
  };

  const handleTranscribedCommand = (text) => {
    const command = text.toLowerCase();
    if (command.startsWith('vechtron play')) {
      let songQuery;
      if (command.includes('play me')) {
        songQuery = text.slice(text.indexOf('play me') + 8).trim();
      } else {
        songQuery = text.slice(text.indexOf('play') + 5).trim();
      }
      
      if (songQuery) {
        openYouTube(songQuery);
        onMessageSubmit(`Looking up "${songQuery}" on YouTube`);
        onClose();
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    // Initialize speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US'; // You can make this configurable

      recognitionInstance.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            // Check for YouTube command when we have final transcript
            if (!handleTranscribedCommand(finalTranscript)) {
              setTranscribedText(finalTranscript);
            }
          } else {
            interimTranscript += transcript;
            setTranscribedText(interimTranscript);
          }
        }

        setTranscribedText(finalTranscript || interimTranscript);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopRecording();
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech recognition not supported in this browser');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleClose = () => {
    if (isRecording) {
      stopRecording();
    }
    onClose();
  };

  const startRecording = async () => {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser. Please try Chrome, Edge, or Safari.');
      return;
    }

    try {
      recognition.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error starting recognition:', error);
      alert('Error starting voice recognition. Please try again.');
    }
  };

  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleSendRecording = async () => {
    if (!transcribedText.trim()) return;
    
    try {
      await onMessageSubmit(transcribedText);
      setTranscribedText('');
      onClose();
    } catch (error) {
      console.error('Error sending transcribed message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  

  return (
    <div className="flex flex-col w-full p-5 lg:min-h-[35rem]">

      <div className="my-10 w-36 md:w-64 h-48 sm:h-64 mx-auto flex flex-col items-center justify-between">
        <div className="relative rounded-full h-20 sm:h-32 w-20 sm:w-32">
          <PulsatingImage isRecording={isRecording} />
        </div>
        
        {transcribedText && (
          <div className="text-center text-sm max-w-full overflow-hidden text-ellipsis px-4">
            {transcribedText}
          </div>
        )}
        
        {isRecording && (
          <div className="text-center text-red-500 font-medium">
            {formatTime(recordingTime)}
          </div>
        )}

        <div className="flex justify-between items-center w-full gap-4">
          <div 
            className={`text-center rounded-full p-2 font-light transition-colors ${
              isRecording ? 'bg-red-200' : 'bg-slate-200'
            }`}
          >
            <Mic 
              size={30} 
              color={isRecording ? 'red' : 'black'} 
              className="cursor-pointer" 
              onClick={toggleRecording}
            />
          </div>

          {!isRecording && transcribedText && (
            <div className="text-center bg-purple-200 rounded-full p-2 font-light">
              <Send
                size={30}
                color="purple"
                className="cursor-pointer"
                onClick={handleSendRecording}
              />
            </div>
          )}

          <div className="text-center bg-slate-200 rounded-full p-2 font-light">
            <X
              size={30}
              color="black"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
}