// src/app/actions/ActionsUser.ts
'use server'

import { createUser } from '@/lib/userDbService';

export async function signupUser(formData: FormData) {

  const rawFormData = {
    username: String(formData.get('username')),
    email: String(formData.get('email')),
    password: String(formData.get('password')),
  };

  try {
    await createUser(rawFormData); // Assuming createUser returns a promise
    // Handle successful creation, e.g., redirect or show success message
  } catch (error) {
    // Handle errors, e.g., show error message
  }
}
