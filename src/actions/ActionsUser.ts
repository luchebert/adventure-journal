// src/actions/ActionsUser.ts
'use server';

import { createUser } from '@/lib/userDbService';
import { SignupSchema } from '@/lib/zodSchemas';

export async function signupUser(formData: FormData) {
  const rawFormData = {
    username: String(formData.get('username')),
    email: String(formData.get('email')),
    password: String(formData.get('password')),
    confirmPassword: String(formData.get('confirmPassword')),
  };

  const result = SignupSchema.safeParse(rawFormData);
  if (!result.success) {
    // Return validation errors as a user-friendly message
    return { success: false, message: result.error.errors.map(e => e.message).join(', ') };
  }

  // After successful validation, manually check if passwords match
  if (rawFormData.password !== rawFormData.confirmPassword) {
    // Return a user-friendly message
    return { success: false, message: 'Passwords do not match' };
  }

  await createUser(rawFormData);

  return { success: true, message: 'User created successfully!' };
}
