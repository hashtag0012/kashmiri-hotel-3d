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
import { Instagram, Facebook } from "lucide-react"
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
                  "/models/countryside/Create_a_3D_environme_0625124202_texture.glb", // houses
                  "/models/countryside/Design_a_3D_scene_wit_0625125529_texture.glb"  // grass
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

        {/* Footer */}
        <footer className="bg-gradient-to-r from-red-800 to-orange-700 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <span>📍 Reshur Gulmarg, Kashmir Valley 193403</span>
            </div>
            <div className="flex justify-center items-center gap-2 mb-4">
              <span>📞 +91 194 xxx xxxx</span>
            </div>
            <div className="flex justify-center items-center gap-6">
              <a 
                href="https://www.instagram.com/apple.haven.kashmir/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-300 transition-colors duration-200"
              >
                <Instagram className="w-8 h-8" />
              </a>
              <a 
                href="https://facebook.com/applehaveninn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-orange-300 transition-colors duration-200"
              >
                <Facebook className="w-8 h-8" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}