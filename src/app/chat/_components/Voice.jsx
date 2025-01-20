import { useState, useEffect } from 'react';
import { Mic, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

export default function Voice({ onClick }) {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);

  const handleClose = () => {
    if (isRecording) {
      stopRecording();
    }
    router.push('/chat/chatdetail');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks(chunks => [...chunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        // Here you can handle the audio blob - send to server, etc.
        console.log('Recording stopped, audio blob created');
        setAudioChunks([]);
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
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
      <div className="flex w-dvw lg:max-w-screen-lg xl:max-w-[900px] gap-2 items-center">
        <Image
          src="/assets/icons/vechtron.png"
          alt="icon"
          width={20}
          height={20}
        />
        <p>Vechtron</p>
        <Image
          src="/assets/icons/selector.png"
          alt="icon"
          width={15}
          height={15}
        />
      </div>
      <div className="my-10 w-36 md:w-64 h-48 sm:h-64 mx-auto flex flex-col items-center justify-between">
        <div className="relative rounded-full h-20 sm:h-32 w-20 sm:w-32">
          <Image
            src="/assets/icons/Media.jpeg (1).png"
            fill
            alt="voice recording icon"
            className={`object-cover ${isRecording ? 'animate-pulse' : ''}`}
          />
        </div>
        {isRecording && (
          <div className="text-center text-red-500 font-medium">
            {formatTime(recordingTime)}
          </div>
        )}
        <div className="flex justify-between items-center w-full">
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