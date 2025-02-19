"use client";
import React, { useState } from "react";

const CalendarPopup = ({ onClose, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleConfirm = () => {
    if (selectedDate) {
      onSelectDate(selectedDate); // Pass the date to the parent
      onClose(); // Close the calendar popup
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Select Date for Reminder</h2>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-white text-[#1E3A8A] border border-[#1E3A8A] px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleConfirm} className="bg-[#1E3A8A] text-white px-4 py-2 rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPopup;
