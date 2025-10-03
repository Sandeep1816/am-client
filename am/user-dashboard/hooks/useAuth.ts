"use client";

import { useState } from "react";
import { User } from "@/types/user";

const TOKEN_KEY = "user_token";

export function useAuth() {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
      if (!token) return null;
      // minimal: store token in localStorage; decode on server if needed
      return { id: "", email: "", token } as User;
    } catch {
      return null;
    }
  });

function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
  setUser({ id: "", email: "", name: "", token }); // 👈 add name
}


  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }

  return { user, saveToken, logout };
}
