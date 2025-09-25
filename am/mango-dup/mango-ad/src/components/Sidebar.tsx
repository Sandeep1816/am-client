"use client"
import Link from "next/link"
import { useState } from "react"
import { Home, Package, ShoppingCart, Settings } from "lucide-react"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-56"
      } bg-gray-900 text-white min-h-screen p-4 transition-all`}
    >
      <button
        className="text-xs text-gray-300 mb-6"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "»" : "« Collapse"}
      </button>

      <nav className="flex flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 hover:text-orange-400">
          <Home size={20} />
          {!collapsed && "Dashboard"}
        </Link>
        <Link href="/products" className="flex items-center gap-2 hover:text-orange-400">
          <Package size={20} />
          {!collapsed && "Products"}
        </Link>
        <Link href="/orders" className="flex items-center gap-2 hover:text-orange-400">
          <ShoppingCart size={20} />
          {!collapsed && "Orders"}
        </Link>
        <Link href="/settings" className="flex items-center gap-2 hover:text-orange-400">
          <Settings size={20} />
          {!collapsed && "Settings"}
        </Link>
      </nav>
    </aside>
  )
}
