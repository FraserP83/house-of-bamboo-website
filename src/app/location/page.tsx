'use client'

import Navbar from '@/components/Navbar'
import GoogleMapsEmbed from '@/components/GoogleMapsEmbed'

export default function LocationPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <GoogleMapsEmbed />
      </div>
    </main>
  )
}
