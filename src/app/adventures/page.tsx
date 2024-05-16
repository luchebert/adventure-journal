'use client';

import React from 'react';
import AdventuresList from './_components/AdventureList';
import { useFetchAdventures } from '@/api/apiAdventures';

const AdventuresPage = () => {
  const { data: adventures, isLoading } = useFetchAdventures();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Adventures</h1>
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <AdventuresList adventures={adventures!} />
      )}
    </div>
  );
};

export default AdventuresPage;
