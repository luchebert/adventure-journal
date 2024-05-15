'use client';

import AdventuresList from './adventures/_components/AdventureList';
import { useFetchAdventures } from '@/api/apiAdventures';
import Hero from '@/components/Hero';
import About from '@/components/About';

const Home = () => {
  const { data: adventures, isLoading } = useFetchAdventures();

  return (
    <>
      <Hero />

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Adventures</h2>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <AdventuresList adventures={adventures!} />
          )}
        </section>

        <About />
      </main>
    </>
  );
};

export default Home;
