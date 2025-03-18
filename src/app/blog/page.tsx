'use client'

import Navbar from '@/components/Navbar'
import BlogPage from '@/components/BlogPage'

export default function Blog() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        <BlogPage />
      </div>
    </main>
  )
}
