'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-black/80 backdrop-blur-md fixed w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-white font-bold text-xl">
                The House of Bamboo
              </Link>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link href="/" className="text-white hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>
              <Link href="/menu" className="text-white hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Menu
              </Link>
              <Link href="/events" className="text-white hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Events
              </Link>
              <Link href="/gallery" className="text-white hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Gallery
              </Link>
              <Link href="/blog" className="text-white hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Blog
              </Link>
              <Link href="/forum" className="text-white hover:text-amber-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Forum
              </Link>
              <Button variant="outline" className="bg-amber-500 text-black hover:bg-amber-400 border-none">
                Book Now
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-300 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-white hover:text-amber-300 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/menu" className="text-white hover:text-amber-300 block px-3 py-2 rounded-md text-base font-medium">
              Menu
            </Link>
            <Link href="/events" className="text-white hover:text-amber-300 block px-3 py-2 rounded-md text-base font-medium">
              Events
            </Link>
            <Link href="/gallery" className="text-white hover:text-amber-300 block px-3 py-2 rounded-md text-base font-medium">
              Gallery
            </Link>
            <Link href="/blog" className="text-white hover:text-amber-300 block px-3 py-2 rounded-md text-base font-medium">
              Blog
            </Link>
            <Link href="/forum" className="text-white hover:text-amber-300 block px-3 py-2 rounded-md text-base font-medium">
              Forum
            </Link>
            <Button variant="outline" className="w-full mt-4 bg-amber-500 text-black hover:bg-amber-400 border-none">
              Book Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
