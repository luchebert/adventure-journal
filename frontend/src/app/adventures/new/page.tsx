"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

const NewAdventurePage = () => {
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const user = useAuth();

  useEffect(() => {
    if (user !== null) {
      setIsUserInitialized(true);
      console.log(user);
      console.log(process.env);
    }
  }, [user]);

  if (isUserInitialized && user === null) {
    redirect("/login");
  }

  return <div>Welcome {user?.email} New Adventure page</div>;
};

export default NewAdventurePage;
