"use client";

import React, { useState, useEffect } from "react";
import { Adventure } from "../types/adventure";
import { fetchAdventures } from "../pages/api/adventures";
import AdventuresList from "./_components/AdventureList";

const AdventuresPage = () => {
  const [adventures, setAdventures] = useState<Adventure[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdventures();
        setAdventures(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return <AdventuresList adventures={adventures} />;
};

export default AdventuresPage;
