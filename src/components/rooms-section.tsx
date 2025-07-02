"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Wifi, Coffee, Mountain, Users, Bed, Tv, Wind, ChevronLeft, ChevronRight, Star, MapPin } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { BookingModal } from "@/components/booking-modal"
import { MultiLineTypewriter } from "./ui/multi-line-typewriter"

const rooms = [
  {
    title: "Deluxe Orchard View",
    description: "Cozy room with a stunning view of the apple orchards.",
    image: [
      "/decorations/Screenshot 2025-06-26 202841.png",
      "/decorations/Screenshot 2025-06-26 202957.png",
      "/decorations/Screenshot 2025-06-26 202934.png",
      "/decorations/Screenshot 2025-06-26 202910.png",
    ],
    price: "150",
    features: ["1 King Bed", "Sleeps 2", "300 sq. ft."],
    rating: 4.9,
    location: "Mountain View",
    comingSoon: false,
  },
  {
    title: "More Rooms",
    description: "New and exciting rooms are under preparation. Stay tuned for more options!",
    image: "/placeholder.jpg",
    price: "",
    features: [],
    comingSoon: true,
  },
  {
    title: "More Rooms",
    description: "New and exciting rooms are under preparation. Stay tuned for more options!",
    image: "/placeholder.jpg",
    price: "",
    features: [],
    comingSoon: true,
  },
]

const roomFeatures = [
  { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Stay connected with our complimentary Wi-Fi" },
  { icon: Mountain, title: "Scenic Views", desc: "Breathtaking views of the mountains and valleys" },
  { icon: Wind, title: "Climate Control", desc: "Individually controlled heating and cooling" },
  { icon: Tv, title: "Flat Screen TV", desc: "Enjoy a wide range of channels" },
]

export function RoomsSection() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [deluxeImageIdx, setDeluxeImageIdx] = useState(0)
  const openBooking = () => setShowBookingModal(true)
  const closeBooking = () => setShowBookingModal(false)

  const sectionTitle = [
    {
      text: "Our Rooms",
      className: "text-4xl font-bold tracking-tight font-display animate-fade-in-down",
    },
  ]

  // Helper for deluxe room image navigation
  const deluxeImages = Array.isArray(rooms[0].image) ? rooms[0].image : []
  const handlePrev = () => setDeluxeImageIdx((prev) => (prev - 1 + deluxeImages.length) % deluxeImages.length)
  const handleNext = () => setDeluxeImageIdx((prev) => (prev + 1) % deluxeImages.length)

  return (
    <section id="rooms" className="relative py-20 text-white overflow-hidden" style={{ backgroundColor: '#000000' }}>
         {/* Background Design */}
         <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/decorations/Untitled (1).jpeg"
          alt="background design"
          layout="fill"
          objectFit="cover"
          className="bg-design-mask bg-design-blend animate-fade-in"
        />
        <div className="absolute inset-0 bg-design-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <MultiLineTypewriter lines={sectionTitle} loop={false} />
          <p className="mt-4 text-lg text-gray-300 animate-fade-in-up animate-delay-300">
            Each room offers a unique blend of traditional Kashmiri craftsmanship and modern luxury.
          </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {rooms.map((room, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card
                    className={`bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm border-2 border-orange-400/30 text-white shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:scale-105 hover:border-orange-400/60 ${
                      room.comingSoon ? "relative" : ""
                    } animate-scale-in animate-delay-${index * 200}`}
                  >
                    <CardHeader className="pb-2">
                      {/* If deluxe room, show mini-carousel */}
                      {index === 0 && Array.isArray(room.image) ? (
                        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                          <Image
                            src={room.image[deluxeImageIdx]}
                            alt={room.title}
                            fill
                            className="object-cover transition-all duration-500 hover:scale-110"
                            style={{ objectPosition: 'center' }}
                          />
                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          
                          {/* Left arrow */}
                          <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500/80 text-white rounded-full p-2 z-10 transition-all duration-300"
                            aria-label="Previous image"
                            type="button"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          {/* Right arrow */}
                          <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-orange-500/80 text-white rounded-full p-2 z-10 transition-all duration-300"
                            aria-label="Next image"
                            type="button"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                          {/* Dots indicator */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {room.image.map((_, i) => (
                              <span
                                key={i}
                                className={`inline-block w-2 h-2 rounded-full transition-all duration-300 ${i === deluxeImageIdx ? 'bg-orange-400 scale-125' : 'bg-white/40'}`}
                              />
                            ))}
                          </div>
                          
                          {/* Room rating and location badges */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <Badge className="bg-orange-500/90 text-white border-0 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-current" />
                              {room.rating}
                            </Badge>
                            <Badge className="bg-blue-500/90 text-white border-0 flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {room.location}
                            </Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                          <Image
                            src={room.image}
                            alt={room.title}
                            width={600}
                            height={400}
                            className={`w-full h-full object-cover transition-all duration-500 hover:scale-110 ${room.comingSoon ? "filter blur-sm" : ""}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                      )}
                      
                      <div className="pt-4">
                        <CardTitle className="text-xl font-bold text-orange-400 mb-2">{room.title}</CardTitle>
                        <p className="text-gray-300 text-sm leading-relaxed">{room.description}</p>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      {!room.comingSoon && (
                        <>
                          <div className="flex justify-between items-center mb-4 p-3 bg-black/20 rounded-lg">
                            <div>
                              <p className="text-2xl font-bold text-orange-400">${room.price}</p>
                              <p className="text-xs text-gray-400">per night</p>
                            </div>
                            <button
                              onClick={openBooking}
                              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                              Book Now
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs">
                            {room.features.map((feature, i) => (
                              <Badge key={i} variant="outline" className="border-orange-400/50 text-orange-300">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </>
                      )}
                    </CardContent>
                    
                    {room.comingSoon && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-lg">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-orange-400 mb-2">COMING SOON</p>
                          <p className="text-gray-300">Exciting new rooms in development</p>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white border-orange-400 hover:bg-orange-500" />
          <CarouselNext className="text-white border-orange-400 hover:bg-orange-500" />
        </Carousel>

        <div className="mt-16 bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-400/30 animate-fade-in-up animate-delay-700">
          <h3 className="text-2xl font-bold text-center mb-6 text-orange-400">All Rooms Include</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {roomFeatures.map((feature, index) => (
              <div key={index} className={`animate-stagger-${index + 1}`}>
                <feature.icon className="h-10 w-10 mx-auto mb-2 text-orange-400" />
                <p className="font-semibold text-orange-300">{feature.title}</p>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showBookingModal && <BookingModal onClose={closeBooking} />}
    </section>
  )
}