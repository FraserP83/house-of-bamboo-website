'use client'

import Navbar from '@/components/Navbar'
import MembersForum from '@/components/MembersForum'

export default function Forum() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <MembersForum />
      </div>
    </main>
  )
}
