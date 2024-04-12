"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Adventure } from "../types/adventure";
import { fetchAdventures } from "../pages/api/adventures";
import AdventuresList from "./_components/AdventureList";
import { resolve } from "path";

const AdventuresPage = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const data = await fetchAdventures();
        setAdventures(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Adventures</h1>
      {isLoading ? (
        // Show loading spinner when isLoading is true
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        // Render adventures list when data is loaded
        <AdventuresList adventures={adventures} />
      )}
    </div>
  );
};

export default AdventuresPage;
