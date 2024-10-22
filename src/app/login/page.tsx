"use client";
import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Add your login logic here
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    // Simulate a successful login (replace with actual logic)
    console.log('Logging in with:', { email, password });
    setError(null);
    // Redirect or perform login action
  };

  return (
    <>

      <div className="flex flex-col items-center mt-10 p-6 border border-gray-300 rounded-lg shadow-md max-w-md mx-auto w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">Login to your account</h2>
        
        {error && (
          <div className="mt-2 mb-4 p-2 border border-red-500 rounded-md text-red-500 text-center">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 text-lg border border-gray-300 rounded-md w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 text-lg border border-gray-300 rounded-md w-full"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95"
          >
            Login
          </button>
        </form>

        <div className="mt-4">
          <p className="text-center">Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register here</Link></p>
        </div>
      </div>

      <div className='mt-10 flex items-center justify-center p-4'>
        <div className='text-black font-semibold text-center'>
          We can help you with your government permits and compliances!
        </div>
      </div>
    </>
  );
};

export default LoginPage;
