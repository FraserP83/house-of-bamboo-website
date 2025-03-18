'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

export default function GoogleMapsEmbed() {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Find Us</h2>
        <p className="mt-4 text-xl text-gray-600">Visit The House of Bamboo at our convenient location</p>
      </div>
      
      <Card className="overflow-hidden shadow-lg">
        <CardContent className="p-0">
          <div className="aspect-video w-full">
            {mapLoaded ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215175515263!2d-73.98784542404045!3d40.75798833440232!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710728580626!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The House of Bamboo Location"
                className="w-full h-full"
              ></iframe>
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                <p className="text-gray-500">Loading map...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Address</h3>
            <p className="text-gray-600">
              123 Bamboo Lane<br />
              Cityville, State 12345<br />
              United States
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Directions</h3>
            <p className="text-gray-600">
              Located in the heart of downtown, just 2 blocks from Central Station. Street parking available, or use the public parking garage on Main Street.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Public Transportation</h3>
            <p className="text-gray-600">
              Take the Blue Line to Central Station, then walk 2 blocks east. Bus routes 10, 15, and 22 stop directly in front of the restaurant.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
