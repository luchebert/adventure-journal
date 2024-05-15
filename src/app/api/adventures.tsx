import { Adventure } from '../../app/types/adventure';

const apiUrl = process.env.API_BASE_URL || 'http://localhost:3001';

const fetchAdventures = async (): Promise<Adventure[]> => {
  const response = await fetch(`${apiUrl}/api/adventures`);
  if (!response.ok) {
    throw new Error('Failed to fetch adventures');
  }
  return await response.json();
};

const createAdventure = async (
  adventureData: Adventure,
): Promise<Adventure> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adventureData),
  });

  if (!response.ok) {
    throw new Error('Failed to create adventure');
  }

  return await response.json();
};

const updateAdventure = async (
  id: string,
  adventureData: Adventure,
): Promise<Adventure> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adventureData),
  });

  if (!response.ok) {
    throw new Error('Failed to update adventure');
  }

  return await response.json();
};

const deleteAdventure = async (id: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete adventure');
  }
};

export { fetchAdventures, createAdventure, updateAdventure, deleteAdventure };
