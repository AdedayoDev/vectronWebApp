import React from 'react';

const ComingSoonOverlay = ({ title, children }) => {
  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Blurred content in the background */}
      <div className="blur-sm filter opacity-30">
        {children}
      </div>
      
      {/* Semi-transparent overlay with coming soon message */}
      <div className="absolute inset-0 bg-white/40 flex items-center justify-center z-10">
        <div className="text-center p-10 bg-white rounded-xl shadow-xl border border-gray-200 max-w-md">
          <div className="mb-4 mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-yellow-100">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-12 w-12 text-yellow-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
          <div className="text-xl text-yellow-600 font-semibold mb-4">Coming Soon</div>
          <p className="text-gray-600">
            We're working hard to bring you this feature. Stay tuned for updates!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonOverlay;