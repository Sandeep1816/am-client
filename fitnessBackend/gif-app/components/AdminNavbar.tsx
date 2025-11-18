"use client";

import { Menu } from "lucide-react";

export default function AdminNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={onMenuClick}>
        <Menu size={28} />
      </button>

      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-600">Admin</span>
        <div className="w-10 h-10 rounded-full bg-gray-300" />
      </div>
    </header>
  );
}
