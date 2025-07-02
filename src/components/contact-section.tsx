"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Car, Plane } from "lucide-react"
import Image from "next/image"
import { MultiLineTypewriter } from "./ui/multi-line-typewriter"

export function ContactSection() {
  const sectionTitle = [
    {
      text: "Contact Us",
      className: "text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4 font-display animate-fade-in-down"
    },
  ]

  return (
    <div className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/decorations/Screenshot 2025-06-25 010036 (1) (1) (1).png"
        alt="Contact Us Background"
        layout="fill"
        objectFit="cover"
        className="z-0 opacity-30 animate-fade-in"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <MultiLineTypewriter lines={sectionTitle} loop={false} />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animate-delay-300">
            Get in touch with us for reservations, inquiries, or to plan your perfect Kashmir getaway. Our team is here
            to help make your stay unforgettable.
          </p>
        </div>

        {/* Centered Hotel Information */}
        <div className="max-w-4xl mx-auto mb-16">
          {/* Hotel Information */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8 animate-scale-in animate-delay-500">
            <CardHeader>
              <CardTitle className="text-3xl text-red-800 text-center">Hotel Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4 animate-fade-in-left animate-delay-700">
                <MapPin className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Address</h3>
                  <p className="text-gray-600">
                    Apple Haven Inn
                    <br />
                    Reshur Gulmarg, Kashmir Valley
                    <br />
                    Jammu & Kashmir 193403, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in-right animate-delay-700">
                <Phone className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Phone</h3>
                  <p className="text-gray-600">+91 194 xxx xxxx</p>
                  <p className="text-gray-600">+91 194 xxx xxxy (Reservations)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in-left animate-delay-1000">
                <Mail className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Email</h3>
                  <p className="text-gray-600">applehavenkashmir@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in-right animate-delay-1000">
                <Clock className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">Reception Hours</h3>
                  <p className="text-gray-600">24/7 Front Desk Service</p>
                  <p className="text-gray-600">Check-in: 2:00 PM</p>
                  <p className="text-gray-600">Check-out: 12:00 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Getting Here */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8 animate-scale-in animate-delay-700">
            <CardHeader>
              <CardTitle className="text-3xl text-red-800 text-center">Getting Here</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-4 animate-fade-in-up animate-delay-1000">
                <Plane className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">By Air</h3>
                  <p className="text-gray-600">
                    Srinagar Airport (SXR) - 56 km
                    <br />
                    Airport transfer available on request
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 animate-fade-in-up animate-delay-1000">
                <Car className="w-6 h-6 text-red-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-red-800">By Road</h3>
                  <p className="text-gray-600">
                    From Srinagar: 56 km (1.5 hours)
                    <br />
                    From Jammu: 290 km (8 hours)
                    <br />
                    Free parking available
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-red-600 to-orange-500 text-white animate-scale-in animate-delay-1000">
            <CardHeader>
              <CardTitle className="text-3xl text-center">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="animate-fade-in-up animate-delay-1000">
                <h3 className="font-semibold">24/7 Emergency Hotline</h3>
                <p className="text-orange-100">+91 194 xxx xxxx</p>
              </div>
              <div className="animate-fade-in-up animate-delay-1000">
                <h3 className="font-semibold">Local Police</h3>
                <p className="text-orange-100">100</p>
              </div>
              <div className="animate-fade-in-up animate-delay-1000">
                <h3 className="font-semibold">Medical Emergency</h3>
                <p className="text-orange-100">108</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}