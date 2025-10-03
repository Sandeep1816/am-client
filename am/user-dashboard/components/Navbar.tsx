"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">MyShop</Link>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="px-3 py-1 rounded hover:bg-gray-100">Cart</Link>
          <Link href="/login" className="px-3 py-1 rounded hover:bg-gray-100">Login</Link>
          <Link href="/signup" className="px-3 py-1 rounded bg-blue-600 text-white">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
