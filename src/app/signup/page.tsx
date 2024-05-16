// src/app/signup/page.tsx
import React from 'react';
import { signupUser } from '@/actions/ActionsUser';

export default function Page() {
  return (
    <form action={signupUser}>
      <label>
        Username:
        <input type="text" name="username" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}
