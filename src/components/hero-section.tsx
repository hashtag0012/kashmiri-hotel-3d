"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { MultiLineTypewriter } from "./ui/multi-line-typewriter"

interface HeroSectionProps {
  onBookingToggle: () => void
}

export function HeroSection({ onBookingToggle }: HeroSectionProps) {
  const welcomeLines = [
    {
      text: "Welcome to",
      className: "text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl",
    },
    {
      text: "Apple Haven Inn",
      className:
        "text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg",
    },
  ]

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      {/* Location Badge */}
      <div className="mb-6">
        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
          <MapPin className="w-4 h-4 mr-2" />
          Srinagar, Kashmir Valley
        </Badge>
      </div>

      {/* Main Heading */}
      <div className="mb-6">
        <MultiLineTypewriter lines={welcomeLines} loop={false} />
      </div>

      {/* Subtitle */}
      <p className="text-xl md:text-2xl text-white/90 max-w-4xl mb-8 leading-relaxed drop-shadow-lg">
        Experience authentic Kashmiri hospitality amidst blooming apple orchards and majestic Himalayan peaks
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center mb-12">
        <Button
          onClick={onBookingToggle}
          size="lg"
          className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold px-8 py-4 text-lg"
        >
          Book Your Stay
        </Button>
      </div>

      {/* Heritage Badges - Removed */}
    </div>
  )
}
