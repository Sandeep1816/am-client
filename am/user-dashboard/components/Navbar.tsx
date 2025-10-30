"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const isLoggedIn = !!user?.token;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">
          MyShop
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="px-3 py-1 rounded hover:bg-gray-100">
            Cart
          </Link>

          {isLoggedIn ? (
            <>
              <span className="text-gray-700">Welcome!</span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
