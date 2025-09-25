"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-orange-500 text-white px-4 py-3 flex items-center justify-between">
      <Link href="/" className="text-lg font-bold">
        Mango Admin
      </Link>
      <button className="md:hidden" onClick={() => setOpen(!open)}>
        <Menu />
      </button>
      <div
        className={`${
          open ? "block" : "hidden"
        } md:flex gap-6 items-center absolute md:static top-14 left-0 w-full md:w-auto bg-orange-500 md:bg-transparent px-4 md:px-0 py-2 md:py-0`}
      >
        <Link href="/products">Products</Link>
        <Link href="/orders">Orders</Link>
        <Link href="/settings">Settings</Link>
      </div>
    </nav>
  )
}
