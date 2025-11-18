"use client"

import { useRouter } from "next/navigation"
import {
  Clock,
  Heart,
  Shirt,
  Users,
  Pencil,
  Cake,
  Key,
  PartyPopper,
} from "lucide-react"

const categories = [
  { icon: Clock, label: "Same Day Delivery", slug: "same-day" },
  { icon: Heart, label: "For Her", slug: "for-her" },
  { icon: Shirt, label: "For Him", slug: "for-him" },
  { icon: Users, label: "For Friends", slug: "for-friends" },
  { icon: Pencil, label: "Stationary", slug: "stationary" },
  { icon: Cake, label: "Birthday Gifts", slug: "birthday-gifts" },
  { icon: Key, label: "Key Chains", slug: "key-chains" },
  { icon: PartyPopper, label: "Festival Gifts", slug: "festival-gifts" },
]

export default function Categories() {
  const router = useRouter()

  return (
    <section className="bg-white border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {categories.map((category, idx) => {
            const Icon = category.icon
            return (
              <button
                key={idx}
                onClick={() => router.push(`/category/${category.slug}`)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border border-border hover:border-primary hover:bg-muted transition group"
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:scale-110 transition" />
                <span className="text-xs md:text-sm text-center font-medium text-foreground">
                  {category.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
