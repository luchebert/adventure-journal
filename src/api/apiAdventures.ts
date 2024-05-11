// apiAdventures.ts
import { useQuery, useMutation, UseMutationResult } from "react-query";
import { Adventure } from "../../app/types/adventure";

export const useFetchAdventures = () => {
  return useQuery<Adventure[], Error>("adventures", async () => {
    const response = await fetch('/api/adventures');
    if (!response.ok) {
      throw new Error("Failed to fetch adventures");
    }
    return response.json();
  });
};

export const useFetchAdventure = (id: string) => {
  return useQuery<Adventure, Error>(["adventure", id], async () => {
    const response = await fetch(`/api/adventures/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch adventure");
    }

    return response.json();
  });
};

export const useCreateAdventure = (): UseMutationResult<
  Adventure,
  Error,
  Adventure
> => {
  return useMutation<Adventure, Error, Adventure>(
    (adventureData: Adventure) => {
      return fetch('/api/adventures', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adventureData),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create adventure");
        }
        return response.json();
      });
    }
  );
};

export const useUpdateAdventure = (): UseMutationResult<
  Adventure,
  Error,
  { id: string; data: Adventure }
> => {
  return useMutation<Adventure, Error, { id: string; data: Adventure }>(
    ({ id, data }) => {
      return fetch(`/api/adventures/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update adventure");
        }

        return response.json();
      });
    }
  );
};

export const useDeleteAdventure = (): UseMutationResult<
  void,
  Error,
  string
> => {
  return useMutation<void, Error, string>((id: string) => {
    return fetch(`/api/adventures/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete adventure");
      }
    });
  });
};
