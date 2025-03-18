'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Clock, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/toast'

// Available time slots
const timeSlots = [
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM'
];

// Party size options
const partySizes = [
  { value: '1', label: '1 person' },
  { value: '2', label: '2 people' },
  { value: '3', label: '3 people' },
  { value: '4', label: '4 people' },
  { value: '5', label: '5 people' },
  { value: '6', label: '6 people' },
  { value: '7', label: '7 people' },
  { value: '8', label: '8 people' },
  { value: 'large', label: '9+ people (We\'ll contact you)' }
];

// Dining options
const diningOptions = [
  { value: 'standard', label: 'Standard Dining' },
  { value: 'outdoor', label: 'Outdoor Patio' },
  { value: 'private', label: 'Private Room' },
  { value: 'bar', label: 'Bar Seating' }
];

// Special occasions
const occasions = [
  { value: 'none', label: 'None' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'date', label: 'Date Night' },
  { value: 'business', label: 'Business Meal' },
  { value: 'other', label: 'Other' }
];

export default function BookingForm() {
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState('')
  const [partySize, setPartySize] = useState('')
  const [diningOption, setDiningOption] = useState('standard')
  const [occasion, setOccasion] = useState('none')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Reset form after successful submission
      setTimeout(() => {
        setIsSuccess(false)
        setDate(new Date())
        setTime('')
        setPartySize('')
        setDiningOption('standard')
        setOccasion('none')
        setName('')
        setEmail('')
        setPhone('')
        setSpecialRequests('')
      }, 3000)
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Reserve a Table</h2>
        <p className="mt-4 text-xl text-gray-600">Book your dining experience at The House of Bamboo</p>
      </div>
      
      {isSuccess ? (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Booking Confirmed!</CardTitle>
            <CardDescription className="text-green-600">
              Thank you for your reservation at The House of Bamboo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-green-700">
              We've sent a confirmation email to {email}. If you need to make any changes to your reservation, 
              please call us at (123) 456-7890 or reply to the confirmation email.
            </p>
            <div className="mt-4 p-4 bg-white rounded-md border border-green-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{format(date, 'EEEE, MMMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-medium">{time}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Party Size</p>
                  <p className="font-medium">{partySizes.find(p => p.value === partySize)?.label}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dining Option</p>
                  <p className="font-medium">{diningOptions.find(d => d.value === diningOption)?.label}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => setIsSuccess(false)} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Make Another Reservation
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Reservation Details</CardTitle>
              <CardDescription>
                Please fill out the form below to book your table.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => {
                          // Disable dates in the past
                          return date < new Date(new Date().setHours(0, 0, 0, 0));
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Select value={time} onValueChange={setTime}>
                    <SelectTrigger id="time" className="w-full">
                      <SelectValue placeholder="Select time">
                        {time ? (
                          <div className="flex items-center">
                            <Clock className="mr-2 h-4 w-4" />
                            <span>{time}</span>
                          </div>
                        ) : (
                          <span>Select time</span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Party Size and Dining Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="party-size">Party Size</Label>
                  <Select value={partySize} onValueChange={setPartySize}>
                    <SelectTrigger id="party-size" className="w-full">
                      <SelectValue placeholder="Select party size">
                        {partySize ? (
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            <span>{partySizes.find(p => p.value === partySize)?.label}</span>
                          </div>
                        ) : (
                          <span>Select party size</span>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {partySizes.map((size) => (
                        <SelectItem key={size.value} value={size.value}>
                          {size.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dining-option">Dining Option</Label>
                  <Select value={diningOption} onValueChange={setDiningOption}>
                    <SelectTrigger id="dining-option" className="w-full">
                      <SelectValue placeholder="Select dining option" />
                    </SelectTrigger>
                    <SelectContent>
                      {diningOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Special Occasion */}
              <div className="space-y-2">
                <Label htmlFor="occasion">Special Occasion (Optional)</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion" className="w-full">
                    <SelectValue placeholder="Select occasion (if any)" />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occ) => (
                      <SelectItem key={occ.value} value={occ.value}>
                        {occ.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="(123) 456-7890" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              
              {/* Special Requests */}
              <div className="space-y-2">
                <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                <Textarea 
                  id="special-requests" 
                  placeholder="Please let us know if you have any special requests or dietary restrictions." 
                  className="min-h-[100px]"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                disabled={isSubmitting || !date || !time || !partySize || !name || !email || !phone}
              >
                {isSubmitting ? "Processing..." : "Book Reservation"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
      
      {/* Additional Information */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reservation Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Reservations are held for 15 minutes past the scheduled time. Please call if you're running late.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Large Parties</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              For parties of 9 or more, please call us directly at (123) 456-7890 for special arrangements.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cancellation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Please notify us at least 24 hours in advance for cancellations to avoid a cancellation fee.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
