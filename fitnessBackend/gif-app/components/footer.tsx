'use client'

import { Download, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-50 border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Left - App download */}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">
              Download our GiftHub app for a better experience!!
            </h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs">GET IT ON</div>
                  <div className="font-semibold">Google Play</div>
                </div>
              </button>
              <button className="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <div className="text-xs">Download on</div>
                  <div className="font-semibold">App Store</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right - Social links */}
          <div className="md:text-right">
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-6">
              Follow us on:
            </h3>
            <div className="flex gap-4 md:justify-end">
              {[
                { icon: Facebook, color: 'text-blue-600' },
                { icon: Twitter, color: 'text-blue-400' },
                { icon: Instagram, color: 'text-pink-500' },
                { icon: Linkedin, color: 'text-blue-700' },
                { icon: Youtube, color: 'text-red-600' },
              ].map((social, idx) => {
                const Icon = social.icon
                return (
                  <button
                    key={idx}
                    className={`w-12 h-12 rounded-full ${social.color} bg-white shadow-md hover:shadow-lg transition flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Logo and copyright */}
        <div className="border-t border-border pt-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">GiftHub</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Copyright © 2025 GiftHub.com. All rights reserved.
          </p>

          {/* Payment methods */}
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <span className="font-semibold text-foreground">Payment Methods:</span>
            <div className="flex gap-4">
              <img
                src="/visa-card-logo.png"
                alt="Visa"
                className="h-6"
              />
              <img
                src="/mastercard-logo.png"
                alt="Mastercard"
                className="h-6"
              />
              <img
                src="/american-express-logo.png"
                alt="Amex"
                className="h-6"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
