'use client'

import Navbar from '@/components/Navbar'
import EventsCalendar from '@/components/EventsCalendar'

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <EventsCalendar />
      </div>
    </main>
  )
}
