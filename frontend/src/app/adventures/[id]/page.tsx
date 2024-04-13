"use client";

import React from "react";
import { useFetchAdventure } from "@/api/apiAdventures";

const AdventureDetails = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const { data: adventure, isLoading, isError } = useFetchAdventure(id);

  if (isError) {
    return <div>Error fetching adventure</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {adventure ? ( // Check if adventure exists
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

export default AdventureDetails;
