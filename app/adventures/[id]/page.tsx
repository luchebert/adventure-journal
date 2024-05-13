'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Adventure } from '../../types/adventure';

export default function AdventureDetails() {
  const pathname = usePathname();
  const id = pathname ? pathname.split('/').pop() : null;
  console.log(id);
  
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return; // Ensure id is defined before proceeding
      setIsLoading(true);
      try {
        const res = await fetch(`/api/adventures/${id}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setAdventure(data);
      } catch (error) {
        console.error('Failed to fetch adventure:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {adventure ? (
            <div>
              <h1 className="text-3xl font-bold mb-4">{adventure.name}</h1>
              <p className="text-gray-600 mb-4">{adventure.location}</p>
            </div>
          ) : (
            <div>No adventure found</div>
          )}
        </>
      )}
    </div>
  );
};
