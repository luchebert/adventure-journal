"use client";

import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAdventure } from "@/api/apiAdventures";
import { Adventure } from "@/app/types/adventure";

const NewAdventurePage = () => {
  const [isUserInitialized, setIsUserInitialized] = useState(false);
  const user = useAuth();

  useEffect(() => {
    if (user !== null) {
      setIsUserInitialized(true);
      console.log(user);
    }
  }, [user]);

  if (isUserInitialized && user === null) {
    redirect("/login");
  }

  const newAdventureSchema = z.object({
    name: z.string().min(8, {
      message: "Adventer name must be at least 8 characters.",
    }),
    location: z.string().min(8, {
      message: "Adventere location must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof newAdventureSchema>>({
    resolver: zodResolver(newAdventureSchema),
    defaultValues: {
      name: "",
      location: "",
    },
  });

  const {
    mutate: createAdventure,
    isLoading,
    isError,
    isSuccess,
  } = useCreateAdventure();

  const onSubmit = async (values: z.infer<typeof newAdventureSchema>) => {
    try {
      await createAdventure(values);
    } catch (error) {
      console.error("Failed to create new adventure:", error);
    }
  };

  return (
    <>
      <div>Welcome {user?.email} New Adventure page</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Type a name" {...field} />
                </FormControl>
                <FormDescription>Name for your Adventure</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Type a location" {...field} />
                </FormControl>
                <FormDescription>Location of your Adventure</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add New</Button>
        </form>
      </Form>
    </>
  );
};

export default NewAdventurePage;
