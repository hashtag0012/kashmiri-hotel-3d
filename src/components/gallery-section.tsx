"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { MultiLineTypewriter } from "./ui/multi-line-typewriter"

const categories = [
  { id: "all", name: "All" },
  { id: "hotel", name: "Hotel & Suites" },
  { id: "amenities", name: "Amenities" },
  { id: "scenery", name: "Kashmiri Scenery" },
  { id: "food", name: "Cuisine" },
]

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.jpg",
    alt: "Luxury hotel suite with mountain view",
    category: "hotel",
    title: "Presidential Suite",
  },
  {
    id: 2,
    src: "/decorations/upscalemedia-transformed.jpeg",
    alt: "Beautiful cottage scenery with mountains in the background",
    category: "scenery",
    title: "Cottage Mountain View",
  },
  { id: 3, src: "/placeholder.jpg", alt: "Traditional Kashmiri Wazwan feast", category: "food", title: "Wazwan Experience" },
  {
    id: 4,
    src: "/placeholder.jpg",
    alt: "Infinity pool overlooking the valley",
    category: "amenities",
    title: "Heated Infinity Pool",
  },
  {
    id: 5,
    src: "/placeholder.jpg",
    alt: "Hotel exterior with traditional architecture",
    category: "hotel",
    title: "Apple Haven Inn Exterior",
  },
  { 
    id: 6, 
    src: "/decorations/upscalemedia-transformed (1).jpeg", 
    alt: "Scenic cottage landscape with natural beauty", 
    category: "scenery", 
    title: "Cottage Landscape" 
  },
  { id: 7, src: "/placeholder.jpg", alt: "Couple enjoying a candlelit dinner", category: "food", title: "Private Dining" },
  {
    id: 8,
    src: "/placeholder.jpg",
    alt: "Yoga and meditation session by the river",
    category: "amenities",
    title: "Wellness Retreat",
  },
  { id: 9, src: "/placeholder.jpg", alt: "Deluxe room with balcony", category: "hotel", title: "Deluxe Valley View Room" },
  { 
    id: 10, 
    src: "/decorations/IMG-20250625-WA0005.jpg", 
    alt: "Stunning cottage scenery with panoramic views", 
    category: "scenery", 
    title: "Cottage Panorama" 
  },
  {
    id: 11,
    src: "/placeholder.jpg",
    alt: "Close-up of Rogan Josh dish",
    category: "food",
    title: "Authentic Rogan Josh",
  },
  {
    id: 12,
    src: "/placeholder.jpg",
    alt: "Spa and wellness center interior",
    category: "amenities",
    title: "The 'Sukun' Spa",
  },
  {
    id: 13,
    src: "/decorations/IMG-20250625-WA0001.jpg",
    alt: "Peaceful cottage setting with natural surroundings",
    category: "scenery",
    title: "Cottage Serenity",
  }
]

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [lightboxImage, setLightboxImage] = useState<number | null>(null)

  const sectionTitle = [
    {
      text: "Photo Gallery",
      className: "text-5xl font-bold mb-4 font-display animate-fade-in-down",
      style: { color: '#991b1b' }
    },
  ]

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((image) => image.category === selectedCategory)

  const openLightbox = (index: number) => {
    setLightboxImage(index)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
  }

  const nextImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage + 1) % filteredImages.length)
    }
  }

  const prevImage = () => {
    if (lightboxImage !== null) {
      setLightboxImage((lightboxImage - 1 + filteredImages.length) % filteredImages.length)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxImage !== null) {
        switch (event.key) {
          case 'Escape':
            closeLightbox()
            break
          case 'ArrowRight':
            nextImage()
            break
          case 'ArrowLeft':
            prevImage()
            break
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage])

  return (
    <div className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      {/* Background image */}
      <Image
        src="/decorations/e75ddbda351d44e24b6b8099fa200aad (1).jpg"
        alt="Gallery Background"
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
            Explore the beauty of Apple Haven Inn and the stunning landscapes of Kashmir through our curated collection
            of photographs.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`animate-stagger-${index + 1} ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                  : "border-red-200 text-red-600 hover:bg-red-50"
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredImages.map((image, index) => (
            <Card
              key={image.id}
              className={`overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 animate-stagger-${(index % 6) + 1}`}
              onClick={() => openLightbox(index)}
            >
              <div className="relative h-64">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {/* COMING SOON overlay for placeholder images */}
                {image.src === "/placeholder.jpg" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                    <span className="text-2xl font-bold text-white">COMING SOON</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-lg font-semibold">{image.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage !== null && (
          <div 
            className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={(e) => {
              // Close when clicking on the background
              if (e.target === e.currentTarget) {
                closeLightbox()
              }
            }}
          >
            {/* Close button - more prominent */}
            <button 
              onClick={closeLightbox} 
              className="absolute top-6 right-6 text-white hover:text-red-400 transition-colors duration-200 z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            
            {/* Navigation buttons */}
            <button 
              onClick={prevImage} 
              className="absolute left-6 text-white hover:text-red-400 transition-colors duration-200 z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-6 text-white hover:text-red-400 transition-colors duration-200 z-10 bg-black/50 rounded-full p-3 hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            {/* Image container */}
            <div className="relative max-w-5xl max-h-[90vh] p-4">
              <img
                src={filteredImages[lightboxImage].src}
                alt={filteredImages[lightboxImage].alt}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-8 left-8 text-white bg-black/70 backdrop-blur-sm p-4 rounded-lg">
                <h3 className="font-bold text-2xl">{filteredImages[lightboxImage].title}</h3>
                <Badge variant="secondary" className="mt-2 text-sm">
                  {
                    categories.find(
                      (c) =>
                        c.id === filteredImages[lightboxImage].category
                    )?.name
                  }
                </Badge>
              </div>
            </div>
            
            {/* Image counter */}
            <div className="absolute top-6 left-6 text-white bg-black/50 rounded-full px-4 py-2 text-sm">
              {lightboxImage + 1} / {filteredImages.length}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}