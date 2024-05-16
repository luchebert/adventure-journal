import React from 'react';
import { NavBar } from '@/components/NavBar';

export const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Adventure Journal</h1>
        <NavBar />
      </div>
    </header>
  );
};
