import React from 'react';

const PulsatingImage = ({ isRecording }) => {
  return (
    <div className="relative rounded-full h-32 w-32">
      {isRecording && (
        <>
          <div className="absolute inset-0 rounded-full bg-purple-500 opacity-75 animate-[ping_2s_ease-in-out_infinite]" />
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-50 animate-[ping_2s_ease-in-out_infinite_500ms]" />
        </>
      )}
      <div className={`relative h-full w-full rounded-full ${isRecording ? 'scale-90' : ''} transition-transform duration-200`}>
        <img
          src="/assets/icons/Media.jpeg (1).png"
          alt="voice recording icon"
          className="h-full w-full rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default PulsatingImage;