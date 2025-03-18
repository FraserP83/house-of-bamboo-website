'use client'

import Navbar from '@/components/Navbar'
import BookingForm from '@/components/BookingForm'

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <BookingForm />
      </div>
    </main>
  )
}
