"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Wifi,
  UtensilsCrossed,
  ParkingCircle,
  ConciergeBell,
  Bath,
  HeartHandshake,
  Bus,
  Plane,
  Car,
  Ticket,
  Map,
  ShoppingBag,
  Briefcase,
  Clock,
  Apple,
  Leaf,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import { MultiLineTypewriter } from "./ui/multi-line-typewriter"

export function AmenitiesSection() {
  const sectionTitle = [
    {
      text: "Our World-Class Amenities",
      className: "text-4xl font-bold tracking-tight font-display animate-fade-in-down",
      style: { color: 'white' }
    },
  ]

  const amenityCategories = [
    {
      title: "Hotel Facilities",
      icon: Briefcase,
      amenities: [
        { icon: Wifi, name: "High-Speed Wi-Fi" },
        { icon: UtensilsCrossed, name: "Kashmiri Cuisine" },
        { icon: ParkingCircle, name: "24/7 Free Parking" },
        { icon: ConciergeBell, name: "Staff Available 24/7" },
        { icon: HeartHandshake, name: "Wedding & Event Spaces" },
      ],
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/decorations/Screenshot 2025-06-25 005150.png"
          alt="Amenities Background"
          layout="fill"
          objectFit="cover"
          className="opacity-20 animate-fade-in"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <MultiLineTypewriter lines={sectionTitle} loop={false} />
          <p className="mt-4 text-lg text-gray-200 animate-fade-in-up animate-delay-300">
            Enjoy a wide range of amenities to make your stay comfortable and memorable.
          </p>
        </div>
        {/* Animated Seasonal Orchard Experience Section */}
        <div className="mb-16 flex justify-center">
          <div className="relative bg-white/10 backdrop-blur-lg border-2 border-green-400 rounded-3xl shadow-2xl p-8 max-w-3xl w-full overflow-hidden animate-scale-in animate-delay-500">
            {/* Animated Apple and Leaves */}
            <Apple className="absolute left-6 top-6 text-red-500 animate-bounce" size={40} />
            <Leaf className="absolute right-8 top-8 text-green-500 animate-spin-slow" size={32} />
            <Sparkles className="absolute left-1/2 -translate-x-1/2 bottom-6 text-yellow-400 animate-pulse" size={32} />
            <h3 className="text-4xl font-extrabold font-display text-green-900 mb-4 text-center drop-shadow-lg animate-fade-in-up animate-delay-700">Seasonal Orchard Experience</h3>
            <p className="text-lg text-gray-100 font-medium mb-6 text-center animate-fade-in-up animate-delay-1000">
              During apple season, guests are invited to enjoy fresh fruits served daily and can join our staff for a magical hand-picking experience in the nearby orchard. The best time to visit is during the harvest, when the air is filled with the scent of ripe apples—an enchanting experience unique to our hotel.
            </p>
            <ul className="list-none flex flex-col gap-3 items-center">
              <li className="flex items-center gap-2 text-lg font-semibold text-white/90 animate-stagger-1"><Apple className="text-red-400 animate-bounce" size={24} /> Apple Journey: Guided hand-picking in our orchard</li>
              <li className="flex items-center gap-2 text-lg font-semibold text-white/90 animate-stagger-2"><Leaf className="text-green-400 animate-spin-slow" size={24} /> Fresh fruits served daily during the season</li>
              <li className="flex items-center gap-2 text-lg font-semibold text-white/90 animate-stagger-3"><Sparkles className="text-yellow-300 animate-pulse" size={24} /> Learn about local apple varieties & traditions</li>
              <li className="flex items-center gap-2 text-lg font-semibold text-white/90 animate-stagger-4"><Apple className="text-red-400 animate-bounce" size={24} /> Perfect for families & nature lovers</li>
            </ul>
          </div>
        </div>
        {/* Hotel Facilities grid below */}
        <div className="grid grid-cols-1 gap-8 mb-16">
          {amenityCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="bg-white/10 backdrop-blur-md border-green-300 border-2 text-white hover:bg-white/20 transition-all duration-300 shadow-xl animate-fade-in-up animate-delay-500">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-green-200/30 border border-green-400">
                    <category.icon className="h-7 w-7 text-green-700" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-900 font-display">{category.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.amenities.map((amenity, amenityIndex) => (
                    <li key={amenityIndex} className={`flex items-center text-lg text-white/90 font-semibold gap-3 animate-stagger-${amenityIndex + 1}`}>
                      <amenity.icon className="h-6 w-6 text-green-400 animate-fade-in" />
                      {amenity.name}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-200 animate-fade-in-up animate-delay-700">Special Services Upon Request</h3>
          <p className="mt-4 text-lg text-gray-200 animate-fade-in-up animate-delay-1000">
            We are happy to arrange personalized experiences, including private dining, cultural tours, and adventure
            activities. Please contact our staff for more details.
          </p>
        </div>
      </div>
    </section>
  )
}