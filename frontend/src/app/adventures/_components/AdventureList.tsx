import React from "react";
import { Adventure } from "@/app/types/adventure";

interface AdventuresListProps {
  adventures: Adventure[];
}

const AdventuresList = ({ adventures }: AdventuresListProps) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Adventures</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {adventures.map((adventure) => (
          <li
            key={adventure.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-lg font-semibold mb-2">{adventure.name}</h2>
            <p className="text-gray-600">{adventure.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdventuresList;
