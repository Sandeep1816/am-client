'use client'

import { Search, MapPin, Heart, ShoppingCart, User, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      {/* Top bar with location and info */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 bg-muted text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>Where to deliver?</span>
        </div>
        <div className="flex gap-6 text-muted-foreground">
          <a href="#" className="hover:text-foreground">Help & FAQ</a>
          <a href="#" className="hover:text-foreground">Contact Us</a>
        </div>
      </div>

      {/* Main header */}
      <div className="px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">Gifts Destiny</div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for gifts"
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
            </div>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center gap-1 text-foreground hover:text-primary transition">
              <Heart className="w-5 h-5" />
              <span className="text-sm">Wishlist</span>
            </button>
            <button className="hidden md:flex items-center gap-1 text-foreground hover:text-primary transition">
              <ShoppingCart className="w-5 h-5" />
              <span className="text-sm">Cart</span>
            </button>
            <button className="hidden md:flex items-center gap-1 text-foreground hover:text-primary transition">
              <User className="w-5 h-5" />
              <span className="text-sm">Account</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for gifts"
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground" />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border pt-4">
            <button className="w-full text-left px-4 py-2 hover:bg-muted rounded">Wishlist</button>
            <button className="w-full text-left px-4 py-2 hover:bg-muted rounded">Cart</button>
            <button className="w-full text-left px-4 py-2 hover:bg-muted rounded">Account</button>
          </div>
        )}
      </div>
    </header>
  )
}
