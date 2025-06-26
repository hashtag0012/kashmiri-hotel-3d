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
import { CalendarIcon, X } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"

interface BookingModalProps {
  onClose: () => void
}

export function BookingModal({ onClose }: BookingModalProps) {
  const [state, action, isPending] = useActionState(submitBooking, null)
  const [checkInDate, setCheckInDate] = useState<Date>()
  const [checkOutDate, setCheckOutDate] = useState<Date>()

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-scale-in">
        <CardHeader className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-t-lg relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors">
            <X className="w-6 h-6" />
          </button>
          <CardTitle className="text-2xl font-bold">Book Your Stay</CardTitle>
          <CardDescription className="text-orange-100">Reserve your room at Apple Haven Inn</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form action={action} className="space-y-6">
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

            <div className="space-y-2">
              <Label htmlFor="address" className="text-red-800 font-semibold">
                Address *
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-red-800 font-semibold">Check-in Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal border-red-200">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkInDate ? format(checkInDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <input type="hidden" name="checkIn" value={checkInDate ? format(checkInDate, "yyyy-MM-dd") : ""} />
              </div>

              <div className="space-y-2">
                <Label className="text-red-800 font-semibold">Check-out Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal border-red-200">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {checkOutDate ? format(checkOutDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <input type="hidden" name="checkOut" value={checkOutDate ? format(checkOutDate, "yyyy-MM-dd") : ""} />
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
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-3 text-lg transform hover:scale-105 transition-all duration-300"
            >
              {isPending ? "Processing Booking..." : "Confirm Booking"}
            </Button>

            {state && (
              <div
                className={`p-4 rounded-lg text-center font-semibold animate-fade-in ${
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
  )
}
