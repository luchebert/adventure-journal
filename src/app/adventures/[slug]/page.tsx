// src/app/pages/adventures/[slug]/page.tsx
'use server';

import { fetchAdventureById } from '@/lib/adventureDatabaseService';
import { IAdventurePlain } from '@/models/Adventure';
import { disassembleSlug } from '@/utils/slug';

export default async function Page({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const result = disassembleSlug(params.slug);

  if (!result || !result._id) {
    console.log(result);
    // Handle the case where disassembleSlug returns null or no _id
    return <div>Error loading adventure</div>; // Or any appropriate fallback UI
  }

  const { _id } = result;

  console.log('_id', _id);

  const adventure: IAdventurePlain | null = await fetchAdventureById(_id);

  console.log('adventure', adventure);

  if (!adventure) return <div>Loading...</div>;

  return (
    <div>
      <h1>{adventure.name}</h1>
      <p>{adventure.description}</p>
      {/* Render other adventure details as needed */}
    </div>
  );
}
