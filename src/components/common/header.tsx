import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-100">
      <h1 className="text-xl font-bold mb-2 md:mb-0">Easy Permits PH</h1>
      <div className="flex flex-wrap items-center justify-center md:justify-end space-x-2">
        <Link href="/">
          <button className="px-4 py-2 text-white bg-gray-400 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-gray-500 active:scale-95 flex-1 md:flex-none">
            Home
          </button>
        </Link>
        <Link href="/login">
          <button className="px-4 py-2 text-white bg-blue-600 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-blue-700 active:scale-95 flex-1 md:flex-none">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="px-4 py-2 text-white bg-green-600 rounded-md shadow-md transform transition-transform duration-200 hover:scale-105 hover:bg-green-700 active:scale-95 flex-1 md:flex-none">
            Register
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
