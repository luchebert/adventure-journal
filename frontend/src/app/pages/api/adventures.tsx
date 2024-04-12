import { Adventure } from "@/app/types/adventure";

const fetchAdventures = async (): Promise<Adventure[]> => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
  const response = await fetch(`${apiUrl}/api/adventures`);
  if (!response.ok) {
    throw new Error("Failed to fetch adventures");
  }
  return await response.json();
};

export { fetchAdventures };
