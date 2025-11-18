'use client'

import { useState, useEffect } from 'react'

export default function FeaturedBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Birthday",
      emoji: "🎂",
      subtitle: "Joy in Every Present",
      buttonText: "CELEBRATE NOW",
      image: "/birthday-celebration-party-cake-gifts.jpg"
    },
    {
      title: "Anniversary",
      emoji: "💕",
      subtitle: "Love in Every Moment",
      buttonText: "CELEBRATE NOW",
      image: "/anniversary-celebration-flowers-romantic.jpg"
    },
    {
      title: "Celebration",
      emoji: "🎉",
      subtitle: "Joy Delivered Home",
      buttonText: "CELEBRATE NOW",
      image: "/celebration-party-decorations-happy-people.jpg"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="bg-gradient-to-b from-rose-50 to-white py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-r from-rose-100 to-pink-100">
          {/* Slides Container */}
          <div className="relative h-96 md:h-[500px] lg:h-[550px]">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full px-6 md:px-12 lg:px-16">
                  {/* Left - Content */}
                  <div className="flex flex-col justify-center gap-4 md:gap-6 z-10">
                    <div>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                        {slide.title}
                        <span className="ml-3 text-5xl md:text-6xl">{slide.emoji}</span>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="h-1 w-12 bg-gray-900"></div>
                          <span className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900">
                            {slide.subtitle}
                          </span>
                          <div className="h-1 w-12 bg-gray-900"></div>
                        </div>
                        <span className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 ml-2">😊</span>
                      </h2>
                    </div>

                    <button className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-8 rounded-full text-lg transition w-fit">
                      {slide.buttonText}
                    </button>
                  </div>

                  {/* Right - Image */}
                  <div className="flex justify-center hidden md:flex">
                    <div className="relative w-full max-w-sm h-96 md:h-[450px] rounded-2xl overflow-hidden">
                      <img
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-pink-600 w-8 h-2.5 rounded-full'
                    : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5 rounded-full'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
