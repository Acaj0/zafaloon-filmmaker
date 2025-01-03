import React from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';

  return (
    <div className={`rounded-lg mb-2 border-l-4 p-4 ${bgColor} ${textColor} flex justify-between items-start`} role="alert">
      <div>
        <p className="font-bold">{type === 'success' ? 'Success' : 'Error'}</p>
        <p>{message}</p>
      </div>
      <div>
        <button
          onClick={onClose}
          className="text-xl font-semibold ml-2"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Alert;

