import { useState, useEffect } from 'react';

const AdventureDetails = ({ id }) => {
  const [adventure, setAdventure] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/adventures/${id}`);
      const data = await res.json();
      setAdventure(data);
      setIsLoading(false);
    };

    fetchData();
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

export default AdventureDetails;
