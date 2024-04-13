"use client";

import Auth from "@/components/Auth";
import React, { useEffect, useState } from "react";
import { Adventure } from "@/app/types/adventure";
import AdventuresList from "@/app/adventures/_components/AdventureList";
import { useFetchAdventures } from "@/api/apiAdventures";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
  <a href={href} className="text-gray-800 hover:text-blue-500">
    {children}
  </a>
);

const Home = () => {
  const { data: adventures, isLoading, isError } = useFetchAdventures();

  if (isError || adventures === undefined) {
    return <div>Error fetching adventures</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 grid grid-rows-[auto,1fr,auto]">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            My Adventure Journal
          </h1>
          <nav className="space-x-4">
            <NavLink href="#">Home</NavLink>
            <NavLink href="#">About</NavLink>
            <NavLink href="#">Adventures</NavLink>
            <NavLink href="#">Contact</NavLink>
            <NavLink href="#">Login</NavLink>
            <NavLink href="#">Signup</NavLink>
          </nav>
        </div>
      </header>

      {/* Hero section */}
      <section
        className="relative"
        style={{
          backgroundImage: `url('/home_splash.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
        }}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <h1 className="text-5xl font-bold text-white text-shadow-lg">
            My Adventure Journal
          </h1>
        </div>
      </section>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Adventures section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Latest Adventures</h2>
          {isLoading ? (
            // Show loading spinner when isLoading is true
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            // Render adventures list when data is loaded
            <AdventuresList adventures={adventures} />
          )}
        </section>

        {/* About section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            About My Adventure Journal
          </h2>
          <p className="text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            convallis justo ut felis consequat, et tristique nisi sagittis.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          My Adventure Journal &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Home;
