import React from 'react';

const ConfirmationModal = ({ show, message, onConfirm, onCancel, button1, button2 }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">{message}</h2>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400"
          >
            {button1}
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-500"
          >
            {button2}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
