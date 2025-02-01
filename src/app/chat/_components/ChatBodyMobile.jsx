import React from 'react';
import Image from "next/image";
import Link from "next/link";

const ChatBodyMobile = () => {
  return (
    <div className="w-full justify-center items-center bg-white">
      {/* Header */}
      <div className="w-full p-4 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">👋</span>
          <h1 className="text-xl md:text-2xl font-semibold">Good day! How may I assist you today?</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-4 mt-10">
        {/* Entertainment Card */}
        <Link href="#" className="block">
          <div className="bg-[#EBF3FF] rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="relative w-6 h-6">
                <Image
                  src="/assets/icons/spotify.png"
                  alt="spotify"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-black">Entertainment</h2>
                <p className="text-sm text-gray-600 mt-1">Pick your favorite tunes for the drive.</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Navigation Card */}
        <Link href="/route" className="block">
          <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="relative w-6 h-6">
                <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.76953 22.2237C6.63712 23.3294 7.42679 24.4941 8.13283 25.7094C8.73561 26.8523 8.98689 27.6273 9.42741 29.0045C9.69757 29.7653 9.94174 29.9924 10.4667 29.9924C11.0387 29.9924 11.2983 29.6061 11.4988 29.0086C11.9152 27.7081 12.2419 26.7156 12.7574 25.7777C13.7689 23.9671 15.0258 22.3581 16.2608 20.8118C16.5951 20.3741 18.7568 17.8244 19.7299 15.8126C19.7299 15.8126 20.926 13.6027 20.926 10.5163C20.926 7.62927 19.7464 5.62695 19.7464 5.62695L16.3504 6.53644L14.288 11.9684L13.7777 12.7174L13.6757 12.8531L13.54 13.023L13.3018 13.2943L12.9614 13.6346L11.1249 15.1308L6.53335 17.7819L5.76953 22.2237Z" fill="#34A853"/>
                  <path d="M1.03125 15.4415C2.15188 18.0012 4.31286 20.2513 5.77493 22.2259L13.5407 13.0269C13.5407 13.0269 12.4466 14.4578 10.462 14.4578C8.25144 14.4578 6.46558 12.6925 6.46558 10.4666C6.46558 8.94021 7.38389 7.8916 7.38389 7.8916L2.11231 9.30414L1.03125 15.4415Z" fill="#FBBC04"/>
                  <path d="M13.6273 0.472656C16.2065 1.30424 18.414 3.05004 19.7493 5.6244L13.5429 13.0204C13.5429 13.0204 14.4612 11.9528 14.4612 10.4359C14.4612 8.15821 12.5433 6.45663 10.4713 6.45663C8.512 6.45663 7.38672 7.88511 7.38672 7.88511V3.22571L13.6273 0.472656Z" fill="#4285F4"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-black">Navigation</h2>
                <p className="text-sm text-gray-600 mt-1">Get your directions faster</p>
              </div>
            </div>
          </div>
        </Link>

        {/* Health & Maintenance Card */}
        <Link href="/vehicle_management/portal" className="block">
          <div className="bg-[#E94E43] rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-3">
              <div className="relative w-6 h-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8.99959V14.9996M8.99998 11.9996H15M19.463 3.99359C16.781 2.34859 14.44 3.01059 13.034 4.06659C12.458 4.49959 12.17 4.71659 12 4.71659C11.83 4.71659 11.542 4.49959 10.966 4.06659C9.55998 3.01059 7.21898 2.34959 4.53698 3.99359C1.01798 6.15159 0.221981 13.2736 8.33998 19.2826C9.88598 20.4266 10.659 20.9986 12 20.9986C13.341 20.9986 14.114 20.4266 15.66 19.2826C23.778 13.2736 22.982 6.15359 19.463 3.99359Z" stroke="#FBFDFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-white">Health & Maintenance</h2>
                <p className="text-sm text-white mt-1">Tips and Reminders</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ChatBodyMobile;