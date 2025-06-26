"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Wifi, Coffee, Mountain, Users, Bed, Tv, Wind, ChevronLeft, ChevronRight } from "lucide-react"
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
      className: "text-4xl font-bold tracking-tight font-display",
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
          className="bg-design-mask bg-design-blend"
        />
        <div className="absolute inset-0 bg-design-overlay"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <MultiLineTypewriter lines={sectionTitle} loop={false} />
          <p className="mt-4 text-lg text-gray-300">
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
                    className={`bg-white/10 backdrop-blur-sm border-gray-700 text-white ${
                      room.comingSoon ? "relative" : ""
                    }`}
                  >
                    <CardHeader>
                      {/* If deluxe room, show mini-carousel */}
                      {index === 0 && Array.isArray(room.image) ? (
                        <div className="relative w-full h-[400px]">
                          <Image
                            src={room.image[deluxeImageIdx]}
                            alt={room.title}
                            fill
                            className="object-cover rounded-t-lg"
                            style={{ objectPosition: 'center' }}
                          />
                          {/* Left arrow */}
                          <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-10"
                            aria-label="Previous image"
                            type="button"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          {/* Right arrow */}
                          <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 z-10"
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
                                className={`inline-block w-2 h-2 rounded-full ${i === deluxeImageIdx ? 'bg-white' : 'bg-white/40'}`}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Image
                          src={room.image}
                          alt={room.title}
                          width={600}
                          height={400}
                          className={`rounded-t-lg object-cover ${room.comingSoon ? "filter blur-sm" : ""}`}
                        />
                      )}
                      <CardTitle className="pt-4">{room.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400">{room.description}</p>
                      {!room.comingSoon && (
                        <>
                          <div className="flex justify-between items-center mt-4">
                            <p className="text-lg font-bold">${room.price}/night</p>
                            <button
                              onClick={openBooking}
                              className="bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg"
                            >
                              Book Now
                            </button>
                          </div>
                          <div className="flex space-x-4 mt-4 text-sm text-gray-400">
                            {room.features.map((feature, i) => (
                              <span key={i}>{feature}</span>
                            ))}
                          </div>
                        </>
                      )}
                    </CardContent>
                    {room.comingSoon && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <p className="text-3xl font-bold text-white">COMING SOON</p>
                      </div>
                    )}
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white" />
          <CarouselNext className="text-white" />
        </Carousel>

        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center mb-6">All Rooms Include</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {roomFeatures.map((feature, index) => (
              <div key={index}>
                <feature.icon className="h-10 w-10 mx-auto mb-2 text-red-400" />
                <p className="font-semibold">{feature.title}</p>
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