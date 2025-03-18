'use client'

import Navbar from '@/components/Navbar'
import GalleryAndContact from '@/components/GalleryAndContact'

export default function GalleryContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <GalleryAndContact />
      </div>
    </main>
  )
}
