"use client";
import React, { useState, ChangeEvent } from 'react';

interface Option {
  value: string;
  label: string;
  link: string;
  disabled?: boolean; // Optional property to indicate if the option is disabled
}

const Initial_dropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const options: Option[] = [
    { value: '', label: 'Select an option', link: '' },
    { value: 'option1', label: 'Securities and Exchange Commission (SEC) ***', link: '', disabled: true },
    { value: 'sec_application', label: 'SEC Application', link: '/iniforms/sec_application' },
    // Additional options can be uncommented as needed
    // { value: 'option2', label: 'Department of Trade and Industry (DTI)', link: '/iniforms/dti' },
    // { value: 'option3', label: 'Mines and Geosciences Bureau (MGB) ***', link: '/option3', disabled: true },
    // { value: 'option4', label: 'Mineral Processing Permit', link: '/option3' },
    // { value: 'option5', label: 'Quarry Permit', link: '/option3' },
    // { value: 'option6', label: 'Environmental Management Bureau (EMB)', link: '/option4' },
  ];

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(option => option.value === selectedValue);
    
    if (selectedOption && selectedOption.link) {
      window.location.href = selectedOption.link; 
    }

    setSelectedOption(selectedValue);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-10 p-6 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Select a government agency:</h2>
        <select
          value={selectedOption}
          onChange={handleChange}
          className="p-3 text-lg border border-gray-300 rounded-md w-full"
          style={{ maxHeight: '200px', overflowY: 'auto' }} // Adding maxHeight and overflow for scrollable effect
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {selectedOption && (
          <div className="mt-4 p-2 border border-green-500 rounded-md text-green-500 text-center">
            <p>You selected: {selectedOption}</p>
          </div>
        )}
      </div>

      {/* Forms Section */}
      <div className='mt-10 flex items-center justify-center p-4'>
        <div className='text-black font-semibold text-center'>
          We can help you with your government permits and compliances, just select from the dropdown menu!
        </div>
      </div>
      {/* 
      <Formcomponent formData={["hello"]}/> */}
    </>
  );
};

export default Initial_dropdown;
