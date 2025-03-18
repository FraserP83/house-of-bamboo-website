'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { AlertCircle, Check, MapPin, Phone, Mail } from 'lucide-react'

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: '/images/food1.jpg',
    alt: 'Delicious cuisine at The House of Bamboo',
    category: 'food',
    title: 'Bamboo Steamed Dumplings',
    description: 'Our signature dumplings filled with a blend of shrimp, pork, and aromatic herbs.'
  },
  {
    id: 2,
    src: '/images/food2.jpg',
    alt: 'Asian fusion dishes',
    category: 'food',
    title: 'Lemongrass Chicken',
    description: 'Grilled chicken marinated in lemongrass, served with coconut rice and stir-fried vegetables.'
  },
  {
    id: 3,
    src: '/images/drink1.jpg',
    alt: 'Signature cocktails',
    category: 'drinks',
    title: 'Bamboo Breeze Cocktail',
    description: 'Refreshing blend of gin, cucumber, lime, and a hint of lemongrass.'
  },
  {
    id: 4,
    src: '/images/food1.jpg',
    alt: 'Restaurant interior',
    category: 'interior',
    title: 'Main Dining Area',
    description: 'Our elegant main dining area featuring bamboo accents and soft lighting.'
  },
  {
    id: 5,
    src: '/images/food2.jpg',
    alt: 'Private dining room',
    category: 'interior',
    title: 'Private Dining Room',
    description: 'Intimate private dining space for special occasions and events.'
  },
  {
    id: 6,
    src: '/images/drink1.jpg',
    alt: 'Bar area',
    category: 'interior',
    title: 'Bar Lounge',
    description: 'Our stylish bar area where you can enjoy signature cocktails and small plates.'
  },
  {
    id: 7,
    src: '/images/food1.jpg',
    alt: 'Chef preparing food',
    category: 'events',
    title: 'Cooking Demonstration',
    description: 'Our executive chef sharing culinary techniques during a special event.'
  },
  {
    id: 8,
    src: '/images/food2.jpg',
    alt: 'Live music performance',
    category: 'events',
    title: 'Jazz Night',
    description: 'Live jazz performances every Friday evening at The House of Bamboo.'
  },
  {
    id: 9,
    src: '/images/drink1.jpg',
    alt: 'Cocktail masterclass',
    category: 'events',
    title: 'Cocktail Masterclass',
    description: 'Learn to craft our signature cocktails with our expert mixologists.'
  }
];

export default function GalleryAndContact() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null); // null, 'submitting', 'success', 'error'
  
  // Filter images based on active tab
  const filteredImages = activeTab === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeTab);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission with timeout
    setTimeout(() => {
      setFormStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setFormStatus(null);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Gallery Section */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Gallery</h2>
          <p className="mt-4 text-xl text-gray-600">Explore the ambiance and cuisine of The House of Bamboo</p>
        </div>
        
        {/* Gallery Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="drinks">Drinks</TabsTrigger>
              <TabsTrigger value="interior">Interior</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card 
              key={image.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative h-64">
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{image.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Image Dialog */}
        {selectedImage && (
          <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedImage.title}</DialogTitle>
                <DialogDescription>{selectedImage.category.charAt(0).toUpperCase() + selectedImage.category.slice(1)}</DialogDescription>
              </DialogHeader>
              <div className="relative h-[60vh] w-full">
                <Image 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-gray-700">{selectedImage.description}</p>
            </DialogContent>
          </Dialog>
        )}
      </div>
      
      {/* Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-8">
            We'd love to hear from you! Whether you have a question about our menu, want to make a special request, 
            or are interested in hosting an event, please don't hesitate to reach out.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <MapPin className="h-6 w-6 text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Location</h3>
                <p className="text-gray-600">
                  123 Bamboo Lane<br />
                  Cityville, State 12345<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Phone className="h-6 w-6 text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Phone</h3>
                <p className="text-gray-600">
                  (123) 456-7890<br />
                  Mon-Fri: 9am - 5pm
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-amber-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-gray-600">
                  info@houseofbamboo.com<br />
                  events@houseofbamboo.com
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Hours of Operation</h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="font-medium">Monday - Thursday</p>
                <p className="text-gray-600">11:00 AM - 10:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Friday - Saturday</p>
                <p className="text-gray-600">11:00 AM - 11:00 PM</p>
              </div>
              <div>
                <p className="font-medium">Sunday</p>
                <p className="text-gray-600">12:00 PM - 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              
              {formStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-green-800">Message Sent Successfully!</h4>
                    <p className="text-green-700 mt-1">
                      Thank you for contacting The House of Bamboo. We'll get back to you as soon as possible.
                    </p>
                  </div>
                </div>
              ) : formStatus === 'error' ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start mb-6">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-red-800">Error Sending Message</h4>
                    <p className="text-red-700 mt-1">
                      There was a problem sending your message. Please try again or contact us directly.
                    </p>
                  </div>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="(123) 456-7890"
                    value={formState.phone}
                    onChange={handleInputChange}
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Reservation Inquiry"
                    value={formState.subject}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Please provide details about your inquiry..."
                    rows={5}
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                >
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
