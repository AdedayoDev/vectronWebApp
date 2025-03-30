import React, { useState, useRef, useEffect } from 'react';
import { FiBell, FiX } from 'react-icons/fi';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Handle ESC key to close dropdown
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling when dropdown is open on mobile
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <FiBell 
          size={22} 
          className="cursor-pointer hover:text-gray-900 transition"
          onClick={toggleDropdown}
          aria-label="Notifications"
        />
      </div>
      
      {/* Desktop dropdown */}
      {isOpen && (
        <div className="hidden md:block absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
              <span className="text-xs bg-gray-100 text-gray-600 py-1 px-2 rounded-full">0</span>
            </div>
            <div className="h-48 flex items-center justify-center flex-col border-t border-gray-100 pt-3">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
                <FiBell size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm">No new notifications</p>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-100 text-center">
              <button 
                className="text-sm text-blue-600 hover:text-blue-800 transition"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Mobile full-screen overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Close notifications"
            >
              <FiX size={22} />
            </button>
          </div>
          
          <div className="flex-grow flex items-center justify-center flex-col p-4">
            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-3">
              <FiBell size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-500 text-center">No new notifications</p>
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button 
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;