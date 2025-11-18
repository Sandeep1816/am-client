'use client'

export default function StatsSection() {
  const stats = [
    { number: '400+', label: 'Cities having same day delivery' },
    { number: '100+', label: 'Countries being served with happiness' },
    { number: '5 Million+', label: 'Gift boxes delivered across the globe' },
  ]

  return (
    <section className="bg-white py-12 md:py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-start gap-6 md:gap-12">
          {/* Left side - Label */}
          <div className="hidden md:flex flex-col items-center">
            <h3 className="text-3xl font-black text-primary writing-vertical">Stats</h3>
            <div className="w-1 h-20 bg-primary rounded mt-4"></div>
          </div>

          {/* Right side - Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 flex-1">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="text-5xl md:text-6xl font-black text-accent mb-3">
                  {stat.number}
                </div>
                <p className="text-lg text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
