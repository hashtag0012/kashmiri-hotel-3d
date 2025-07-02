"use client"

import { Suspense, useState, useCallback, useEffect } from "react"
import { Navigation } from "../components/navigation"
import { HeroSection } from "../components/hero-section"
import { RoomsSection } from "../components/rooms-section"
import { AmenitiesSection } from "../components/amenities-section"
import { GallerySection } from "../components/gallery-section"
import { ContactSection } from "../components/contact-section"
import { BookingModal } from "../components/booking-modal"
import ModelViewer from "@/components/model-viewer"
import { Instagram, Facebook, MapPin, Phone, Mail, Heart } from "lucide-react"
import { LoadingScreen } from "@/components/loading-screen"
import { ChinarLeaves } from "@/components/chinar-leaves"

// Main Component
export default function AppleHavenInn() {
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [modelLoaded, setModelLoaded] = useState(false)

  const handleLoadingFinish = () => setIsLoading(false)

  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const toggleBooking = () => {
    setShowBookingModal(!showBookingModal)
  }

  return (
    <div className="min-h-screen">
      {isLoading && <LoadingScreen onFinish={handleLoadingFinish} />}
      
      <div className={isLoading ? "invisible" : "visible"}>
        {modelLoaded && <ChinarLeaves />}
        <Navigation onSectionChange={scrollToSection} onBookingToggle={toggleBooking} />

        {/* Hero Section with 3D Scene */}
        <section id="home" className="relative">
          <div className="relative h-screen w-full">
            <Suspense fallback={<div>Loading 3D Scene...</div>}>
              <ModelViewer
                modelUrls={[
                  "/models/countryside/kashmiri_apple_very_r_0629101439_texture.glb" // Kashmiri apple
                ]}
                onLoaded={handleModelLoaded}
              />
            </Suspense>
            <HeroSection onBookingToggle={toggleBooking} />
          </div>
        </section>

        {/* Rooms Section */}
        <section id="rooms">
          <RoomsSection />
        </section>

        {/* Amenities Section */}
        <section id="amenities">
          <AmenitiesSection />
        </section>

        {/* Gallery Section */}
        <section id="gallery">
          <GallerySection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>

        {/* Booking Modal */}
        {showBookingModal && <BookingModal onClose={toggleBooking} />}

        {/* Beautiful Footer */}
        <footer className="relative bg-gradient-to-br from-slate-900 via-red-900 to-orange-900 text-white py-16 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              
              {/* Hotel Info */}
              <div className="text-center md:text-left animate-fade-in-up">
                <h3 className="text-2xl font-bold mb-6 text-orange-300">Apple Haven Inn</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-gray-300">Reshur Gulmarg, Kashmir Valley 193403</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <Phone className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-gray-300">+91 194 xxx xxxx</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <Mail className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-gray-300">applehavenkashmir@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="text-center animate-fade-in-up animate-delay-200">
                <h3 className="text-2xl font-bold mb-6 text-orange-300">Quick Links</h3>
                <div className="space-y-3">
                  <button 
                    onClick={() => scrollToSection('rooms')}
                    className="block w-full text-gray-300 hover:text-orange-300 transition-colors duration-200 py-1"
                  >
                    Our Rooms
                  </button>
                  <button 
                    onClick={() => scrollToSection('amenities')}
                    className="block w-full text-gray-300 hover:text-orange-300 transition-colors duration-200 py-1"
                  >
                    Amenities
                  </button>
                  <button 
                    onClick={() => scrollToSection('gallery')}
                    className="block w-full text-gray-300 hover:text-orange-300 transition-colors duration-200 py-1"
                  >
                    Gallery
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="block w-full text-gray-300 hover:text-orange-300 transition-colors duration-200 py-1"
                  >
                    Contact
                  </button>
                </div>
              </div>

              {/* Social & Experience */}
              <div className="text-center md:text-right animate-fade-in-up animate-delay-400">
                <h3 className="text-2xl font-bold mb-6 text-orange-300">Connect With Us</h3>
                <div className="flex justify-center md:justify-end items-center gap-6 mb-6">
                  <a 
                    href="https://www.instagram.com/apple.haven.kashmir/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-300 transition-all duration-300 transform hover:scale-110"
                  >
                    <Instagram className="w-8 h-8" />
                  </a>
                  <a 
                    href="https://facebook.com/applehaveninn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white hover:text-orange-300 transition-all duration-300 transform hover:scale-110"
                  >
                    <Facebook className="w-8 h-8" />
                  </a>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Experience authentic Kashmiri hospitality amidst blooming apple orchards and majestic Himalayan peaks.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-orange-400/30 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm animate-fade-in-up animate-delay-500">
                  © 2025 Apple Haven Inn. All rights reserved.
                </p>
                <div className="flex items-center gap-2 text-gray-400 text-sm animate-fade-in-up animate-delay-700">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>in Kashmir</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-orange-400/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-red-400/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-10 w-12 h-12 bg-yellow-400/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </footer>
      </div>
    </div>
  )
  )
}