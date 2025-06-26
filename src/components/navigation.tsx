"use client"

import { Button } from "@/components/ui/button"
import { Phone, Menu, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

interface NavigationProps {
  onSectionChange: (section: string) => void
  onBookingToggle: () => void
}

export function Navigation({ onSectionChange, onBookingToggle }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const navItems = [
    { id: "home", label: "Home" },
    { id: "rooms", label: "Rooms" },
    { id: "amenities", label: "Amenities" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg transition-all duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Book Now Button at Top Left */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBookingToggle}
              className="bg-red-700 text-white font-semibold px-6 py-2 rounded shadow-lg border-none focus:outline-none"
            >
              Book Now
            </button>
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSectionChange("home")}>
              <Image
                src="/decorations/1544c8657e0b1996e5a17729f7619958 (1).png"
                alt="Apple Haven Inn Logo"
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <span className="text-xl font-bold text-gray-800 animate-fade-in">Apple Haven Inn</span>
                <p className="text-xs text-gray-600">Reshur Gulmarg, Kashmir</p>
              </div>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  activeSection === item.id
                    ? "text-red-600 border-b-2 border-red-600 transform scale-105"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          {/* Contact */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-gray-600 animate-fade-in">
              <Phone className="w-4 h-4" />
              <span className="font-medium">+91 194 xxx xxxx</span>
            </div>
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden transform hover:scale-110 transition-transform duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`text-left font-medium transition-all duration-300 hover:translate-x-2 ${
                    activeSection === item.id ? "text-red-600" : "text-gray-600 hover:text-red-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
