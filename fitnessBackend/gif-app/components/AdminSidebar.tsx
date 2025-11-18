"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Plus,
  Folder,
  Menu
} from "lucide-react";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Products", href: "/admin/products", icon: <Package size={20} /> },
    { name: "Create Product", href: "/admin/products/create", icon: <Plus size={20} /> },
    { name: "Categories", href: "/admin/categories", icon: <Folder size={20} /> },
    { name: "Create Category", href: "/admin/categories/create", icon: <Plus size={20} /> },
  ];

  return (
    <aside className="bg-white w-72 h-screen border-r shadow-sm p-6 hidden md:flex flex-col">
      <div className="mb-8 flex items-center gap-2">
        <Menu size={26} />
        <h2 className="text-xl font-semibold">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {links.map((link) => {
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition 
                ${active ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"}`}
            >
              {link.icon}
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
