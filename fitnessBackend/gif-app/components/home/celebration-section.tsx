'use client'

import { Gift, Clock, Heart, Users, Home, Zap } from 'lucide-react'

const celebrations = [
  { icon: Gift, label: 'Birthday Gifts' },
  { icon: Clock, label: '30 Mins Gifts' },
  { icon: Heart, label: 'Anniversary Gifts' },
  { icon: Users, label: 'Wedding Gifts' },
  { icon: Home, label: 'House Warming' },
  { icon: Zap, label: 'Balloon Decor' },
]

export default function CelebrationSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-12">
          Surprises for Every Celebration
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {celebrations.map((item, idx) => {
            const Icon = item.icon
            return (
              <button
                key={idx}
                className="group flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-transparent hover:border-primary hover:bg-muted transition"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                  <Icon className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                </div>
                <span className="text-sm md:text-base font-semibold text-center text-foreground">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
