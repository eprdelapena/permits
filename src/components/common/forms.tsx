"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

interface Option {
  value: string;
  label: string;
  link: string;
}

const Formcomponent: React.FC<{ governmentAgency: string }> = (props) => {
  const [formData, setFormData] = useState<{ name?: string; email?: string; message?: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <div className="space-y-6 p-6 max-w-md mx-auto">
        <div className="border border-gray-300 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">{props.governmentAgency}</h3>
          <p className="text-lg font-light mb-2">Please fill-up all data</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              onChange={handleInputChange}
              className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95"
            >
              Submit
            </button>
          </form>
        </div>

        <Link href="/" className="block text-center mt-4">
          <button className="px-4 py-2 text-white bg-gray-400 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-gray-500 active:scale-95">
            Go Back to Home Page
          </button>
        </Link>
      </div>
    </>
  );
}

export default Formcomponent;
