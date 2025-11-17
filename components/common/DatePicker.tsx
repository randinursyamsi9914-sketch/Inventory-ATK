import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface CustomDatePickerProps {
  label?: string;
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
  id: string;
  error?: string;
  placeholderText?: string;
  dateFormat?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  selectedDate,
  onChange,
  id,
  error,
  placeholderText,
  dateFormat = 'dd/MM/yyyy',
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        selected={selectedDate}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholderText}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
        wrapperClassName="w-full"
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CustomDatePicker;
