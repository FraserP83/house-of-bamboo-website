'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarIcon, Clock, MapPin, Music, Utensils } from 'lucide-react'

// Sample events data
const events = [
  {
    id: 1,
    title: 'Live Jazz Night',
    description: 'Enjoy the smooth sounds of our resident jazz quartet while dining.',
    date: new Date(2025, 2, 20, 19, 0), // March 20, 2025, 7:00 PM
    endTime: new Date(2025, 2, 20, 22, 0), // March 20, 2025, 10:00 PM
    location: 'Main Dining Area',
    type: 'music',
    image: '/images/food1.jpg',
  },
  {
    id: 2,
    title: 'Asian Fusion Cooking Class',
    description: 'Learn to prepare signature dishes from our executive chef.',
    date: new Date(2025, 2, 22, 14, 0), // March 22, 2025, 2:00 PM
    endTime: new Date(2025, 2, 22, 16, 0), // March 22, 2025, 4:00 PM
    location: 'Private Dining Room',
    type: 'food',
    image: '/images/food2.jpg',
  },
  {
    id: 3,
    title: 'Cocktail Masterclass',
    description: 'Our mixologists will teach you how to craft our signature cocktails.',
    date: new Date(2025, 2, 25, 18, 0), // March 25, 2025, 6:00 PM
    endTime: new Date(2025, 2, 25, 20, 0), // March 25, 2025, 8:00 PM
    location: 'Bar Area',
    type: 'drink',
    image: '/images/drink1.jpg',
  },
  {
    id: 4,
    title: 'Traditional Dance Performance',
    description: 'Experience authentic cultural dances from across Asia.',
    date: new Date(2025, 2, 27, 20, 0), // March 27, 2025, 8:00 PM
    endTime: new Date(2025, 2, 27, 21, 30), // March 27, 2025, 9:30 PM
    location: 'Main Dining Area',
    type: 'performance',
    image: '/images/food1.jpg',
  },
  {
    id: 5,
    title: 'Wine Tasting Evening',
    description: 'Sample a selection of wines perfectly paired with Asian cuisine.',
    date: new Date(2025, 3, 2, 19, 0), // April 2, 2025, 7:00 PM
    endTime: new Date(2025, 3, 2, 21, 0), // April 2, 2025, 9:00 PM
    location: 'Private Dining Room',
    type: 'drink',
    image: '/images/drink1.jpg',
  },
  {
    id: 6,
    title: 'Bamboo Flute Concert',
    description: 'A mesmerizing evening of traditional bamboo flute music.',
    date: new Date(2025, 3, 5, 19, 30), // April 5, 2025, 7:30 PM
    endTime: new Date(2025, 3, 5, 21, 30), // April 5, 2025, 9:30 PM
    location: 'Main Dining Area',
    type: 'music',
    image: '/images/food1.jpg',
  },
];

// Function to format date to display time
const formatTime = (date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Function to format date to display date
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

// Function to get events for a specific date
const getEventsForDate = (date) => {
  return events.filter(event => 
    event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );
};

// Function to get all dates with events
const getDatesWithEvents = () => {
  return events.map(event => new Date(
    event.date.getFullYear(),
    event.date.getMonth(),
    event.date.getDate()
  ));
};

export default function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  const eventsForSelectedDate = getEventsForDate(selectedDate);
  const datesWithEvents = getDatesWithEvents();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Events & Entertainment</h2>
        <p className="mt-4 text-xl text-gray-600">Join us for special events and entertainment at The House of Bamboo</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Event Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date || new Date())}
                className="rounded-md border"
                modifiers={{
                  hasEvent: (date) => 
                    datesWithEvents.some(eventDate => 
                      eventDate.getDate() === date.getDate() && 
                      eventDate.getMonth() === date.getMonth() && 
                      eventDate.getFullYear() === date.getFullYear()
                    )
                }}
                modifiersStyles={{
                  hasEvent: { 
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fontWeight: 'bold',
                    borderBottom: '2px solid rgb(245, 158, 11)'
                  }
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Events List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Events on {formatDate(selectedDate)}</CardTitle>
              <CardDescription>
                {eventsForSelectedDate.length === 0 
                  ? 'No events scheduled for this date' 
                  : `${eventsForSelectedDate.length} event${eventsForSelectedDate.length > 1 ? 's' : ''} scheduled`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eventsForSelectedDate.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No events</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      There are no events scheduled for this date.
                    </p>
                  </div>
                ) : (
                  eventsForSelectedDate.map((event) => (
                    <Dialog key={event.id}>
                      <DialogTrigger asChild>
                        <Card className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-0">
                            <div className="flex flex-col sm:flex-row">
                              <div className="relative h-48 sm:h-auto sm:w-1/3">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}></div>
                                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                                <div className="absolute top-2 left-2">
                                  <Badge className={`
                                    ${event.type === 'music' ? 'bg-purple-500' : ''}
                                    ${event.type === 'food' ? 'bg-green-500' : ''}
                                    ${event.type === 'drink' ? 'bg-blue-500' : ''}
                                    ${event.type === 'performance' ? 'bg-red-500' : ''}
                                  `}>
                                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                                  </Badge>
                                </div>
                              </div>
                              <div className="p-4 sm:w-2/3">
                                <h3 className="text-lg font-bold">{event.title}</h3>
                                <div className="flex items-center mt-2 text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>{formatTime(event.date)} - {formatTime(event.endTime)}</span>
                                </div>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{event.location}</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.description}</p>
                                <Button variant="link" className="mt-2 p-0 h-auto text-amber-500">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{event.title}</DialogTitle>
                          <DialogDescription>
                            <Badge className={`
                              ${event.type === 'music' ? 'bg-purple-500' : ''}
                              ${event.type === 'food' ? 'bg-green-500' : ''}
                              ${event.type === 'drink' ? 'bg-blue-500' : ''}
                              ${event.type === 'performance' ? 'bg-red-500' : ''}
                            `}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="relative h-64 w-full mt-4">
                          <div className="absolute inset-0 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${event.image})` }}></div>
                        </div>
                        <div className="grid gap-4 py-4">
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-gray-500" />
                            <span>{formatTime(event.date)} - {formatTime(event.endTime)}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                            <span>{event.location}</span>
                          </div>
                          <p className="text-gray-700">{event.description}</p>
                        </div>
                        <div className="mt-4">
                          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                            Reserve a Spot
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Upcoming Events Preview */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">Upcoming Events</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="relative h-48">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}></div>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute top-2 left-2">
                  <Badge className={`
                    ${event.type === 'music' ? 'bg-purple-500' : ''}
                    ${event.type === 'food' ? 'bg-green-500' : ''}
                    ${event.type === 'drink' ? 'bg-blue-500' : ''}
                    ${event.type === 'performance' ? 'bg-red-500' : ''}
                  `}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h4 className="text-lg font-bold">{event.title}</h4>
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{formatTime(event.date)} - {formatTime(event.endTime)}</span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{event.location}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{event.description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
