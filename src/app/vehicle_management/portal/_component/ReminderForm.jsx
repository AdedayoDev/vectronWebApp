"use client";
import React, { useState } from "react";

const ReminderForm = ({ onClose, selectedDate, onSetReminder, title }) => {
  const [reminderDate, setReminderDate] = useState(selectedDate);
  const [time, setTime] = useState("");
  const [timeZone, setTimeZone] = useState("");

  const timeZones = ["GMT", "UTC", "EST", "PST", "CST", "IST"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reminderDate && time && timeZone) {
      onSetReminder({ title, date: reminderDate, time, timeZone });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-5/12 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Grid Container for 4 items */}
          <div className="grid grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title:
              </label>
              <div className="border p-2 rounded w-full bg-gray-100">
                {title}
              </div>
            </div>

            {/* Reminder Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Reminder Date:
              </label>
              <input
                type="date"
                value={reminderDate}
                onChange={(e) => setReminderDate(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>

            {/* Time Zone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time Zone:
              </label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="border p-2 rounded w-full"
                required
              >
                <option value="">Select Time Zone</option>
                {timeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Time:
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center mt-4">
            
            <button
              type="submit"
              className="bg-[#1E3A8A] text-white px-4 py-2 rounded"
            >
              Save Reminder
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-white text-[#1E3A8A] border border-[#1E3A8A] px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderForm;
