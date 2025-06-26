"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { submitBooking } from "../actions/booking"
import { useActionState } from "react"
import { CalendarIcon, MapPin, Phone, Star, Wifi, Car, Coffee, Mountain } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

export function BookingForm() {
  const [state, action, isPending] = useActionState(submitBooking, null)
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-orange-50 to-red-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-red-800 mb-4">Book Your Stay</h1>
            <p className="text-xl text-gray-600">
              Reserve your room at Apple Haven Inn and experience authentic Kashmiri hospitality
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg">
                  <CardTitle className="text-2xl font-bold">Reservation Details</CardTitle>
                  <CardDescription className="text-orange-100">
                    Fill in your details to complete your booking
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form action={action} className="space-y-6">
                    {/* Guest Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-4">Guest Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-red-800 font-semibold">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            required
                            className="border-red-200 focus:border-red-500"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-red-800 font-semibold">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className="border-red-200 focus:border-red-500"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 mt-4">
                        <Label htmlFor="email" className="text-red-800 font-semibold">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="border-red-200 focus:border-red-500"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-red-800 font-semibold">
                        Complete Address *
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        required
                        className="border-red-200 focus:border-red-500"
                        placeholder="Enter your complete address"
                        rows={3}
                      />
                    </div>

                    {/* Stay Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-4">Stay Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-red-800 font-semibold">Check-in Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal border-red-200"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                          <input
                            type="hidden"
                            name="checkIn"
                            value={checkInDate ? format(checkInDate, "yyyy-MM-dd") : ""}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-red-800 font-semibold">Check-out Date *</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal border-red-200"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                            </PopoverContent>
                          </Popover>
                          <input
                            type="hidden"
                            name="checkOut"
                            value={checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : ""}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="roomType" className="text-red-800 font-semibold">
                          Room Type *
                        </Label>
                        <Select name="roomType" required>
                          <SelectTrigger className="border-red-200">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="deluxe">Orchard View Deluxe - ₹4,500/night</SelectItem>
                            <SelectItem value="premium">Apple Blossom Suite - ₹7,500/night</SelectItem>
                            <SelectItem value="royal">Heritage Royal Suite - ₹12,000/night</SelectItem>
                            <SelectItem value="presidential">Apple Haven Presidential - ₹20,000/night</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="guests" className="text-red-800 font-semibold">
                          Number of Guests *
                        </Label>
                        <Select name="guests" required>
                          <SelectTrigger className="border-red-200">
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                            <SelectItem value="4">4 Guests</SelectItem>
                            <SelectItem value="5+">5+ Guests</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 text-lg"
                    >
                      {isPending ? "Processing Booking..." : "Confirm Booking"}
                    </Button>

                    {state && (
                      <div
                        className={`p-4 rounded-lg text-center font-semibold ${
                          state.success
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {state.message}
                        {state.success && state.bookingId && (
                          <div className="mt-2 text-sm">
                            Booking ID: <span className="font-mono">{state.bookingId}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div className="space-y-6">
              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-red-800">Hotel Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span className="text-sm">Reshur Gulmarg, Kashmir</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-sm">4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <span className="text-sm">+91 194 xxx xxxx</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-red-800">Included Amenities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Free Parking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Complimentary Breakfast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mountain className="w-4 h-4 text-red-600" />
                    <span className="text-sm">Mountain Views</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-xl border-0 bg-gradient-to-r from-red-600 to-orange-500 text-white">
                <CardHeader>
                  <CardTitle className="text-xl">Special Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-orange-100 text-sm">
                    Book 3+ nights and get 15% off your total stay! Plus complimentary airport transfer.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
