"use client";

import Link from "next/link";
import { useSidebar } from "@/src/context/SidebarContext";
import { Home, Package, ShoppingCart, Settings } from "lucide-react";

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();

  return (
    <aside className={`bg-gray-900 text-white min-h-screen p-4 transition-all ${isExpanded ? "w-56" : "w-16"}`}>
      <button className="text-xs text-gray-300 mb-6" onClick={toggleSidebar}>
        {isExpanded ? "« Collapse" : "»"}
      </button>

      <nav className="flex flex-col gap-4">
        <Link href="/admin" className="flex items-center gap-2 hover:text-orange-400">
          <Home size={20} />
          {isExpanded && "Dashboard"}
        </Link>
        <Link href="/products" className="flex items-center gap-2 hover:text-orange-400">
          <Package size={20} />
          {isExpanded && "Products"}
        </Link>
        <Link href="/orders" className="flex items-center gap-2 hover:text-orange-400">
          <ShoppingCart size={20} />
          {isExpanded && "Orders"}
        </Link>
        <Link href="/settings" className="flex items-center gap-2 hover:text-orange-400">
          <Settings size={20} />
          {isExpanded && "Settings"}
        </Link>
      </nav>
    </aside>
  );
}
