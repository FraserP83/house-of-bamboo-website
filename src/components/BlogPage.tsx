'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { CalendarIcon, Clock, Tag, User } from 'lucide-react'

// Function to parse RSS feeds
async function fetchRSSFeed(url) {
  try {
    // In a real implementation, this would use a server-side API to fetch and parse RSS feeds
    // For this demo, we'll simulate fetching blog posts
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'New Spring Menu Unveiled',
            description: 'Discover our exciting new seasonal dishes featuring fresh local ingredients and innovative flavor combinations.',
            content: 'Spring has arrived at The House of Bamboo, and with it comes our exciting new seasonal menu. Our executive chef has crafted a selection of dishes that celebrate the vibrant flavors of spring, featuring locally sourced ingredients at their peak freshness. From tender asparagus and sweet peas to delicate herbs and edible flowers, our new dishes showcase the best of the season. Highlights include our Bamboo-Steamed Sea Bass with Spring Vegetables, Lemongrass Chicken with Pea Shoot Salad, and our Sakura Blossom Dessert. Come experience the tastes of spring at The House of Bamboo!',
            author: 'Chef Michael Chen',
            date: '2025-03-15T10:30:00Z',
            image: '/images/food1.jpg',
            category: 'Menu Updates',
            link: '/blog/new-spring-menu'
          },
          {
            id: 2,
            title: 'Cocktail Masterclass: Learn from Our Mixologists',
            description: 'Join us for an exclusive evening learning the art of crafting our signature cocktails from our expert mixologists.',
            content: 'Have you ever wondered how our bartenders create those stunning and delicious cocktails? Now's your chance to learn! The House of Bamboo is excited to announce our new monthly Cocktail Masterclass series. Each session, our head mixologist will guide you through the process of creating three of our signature cocktails, sharing professional techniques, ingredient knowledge, and presentation tips. You'll enjoy tasting each creation, and we'll provide light appetizers to complement the drinks. Classes are limited to 12 participants to ensure personal attention, so book early to secure your spot. The perfect gift for cocktail enthusiasts or a fun night out with friends!',
            author: 'Sarah Johnson, Events Manager',
            date: '2025-03-10T14:45:00Z',
            image: '/images/drink1.jpg',
            category: 'Events',
            link: '/blog/cocktail-masterclass'
          },
          {
            id: 3,
            title: 'Meet the Farmer: Our Sustainable Bamboo Source',
            description: 'Learn about our partnership with local bamboo farmers and our commitment to sustainable practices.',
            content: 'At The House of Bamboo, sustainability isn't just a buzzword—it's a core value that influences everything we do. This month, we're spotlighting our partnership with Green Bamboo Farms, a local family-owned operation that has been growing bamboo sustainably for three generations. Located just 30 miles from our restaurant, Green Bamboo Farms provides us with the fresh bamboo shoots used in many of our signature dishes, as well as the beautiful bamboo materials that feature in our décor. Bamboo is one of the most sustainable plants on the planet, growing up to 3 feet in a single day and requiring no pesticides or fertilizers. By sourcing locally, we reduce our carbon footprint while supporting our local economy. Join us in celebrating this wonderful plant that gives our restaurant its name and character!',
            author: 'Lisa Wong, Sustainability Director',
            date: '2025-03-05T09:15:00Z',
            image: '/images/food2.jpg',
            category: 'Sustainability',
            link: '/blog/sustainable-bamboo'
          },
          {
            id: 4,
            title: 'The Art of Tea Ceremony: Monthly Workshops',
            description: 'Experience the tranquility and mindfulness of traditional tea ceremonies in our new monthly workshops.',
            content: 'The House of Bamboo is delighted to introduce our new monthly Tea Ceremony Workshops, starting this April. These intimate sessions will be led by Tea Master Hiroshi Tanaka, who brings over 25 years of experience in the art of traditional tea ceremonies. Participants will learn about the history and philosophy behind this ancient practice, the proper techniques for preparation, and the mindfulness aspects that make tea ceremonies a form of moving meditation. Each workshop includes a tasting of premium teas and traditional wagashi sweets. Whether you're a tea enthusiast or simply looking for a moment of tranquility in your busy life, these workshops offer a unique cultural experience. Spaces are limited to 8 participants per session to maintain an authentic and personal atmosphere.',
            author: 'Hiroshi Tanaka, Tea Master',
            date: '2025-03-01T11:20:00Z',
            image: '/images/food1.jpg',
            category: 'Workshops',
            link: '/blog/tea-ceremony'
          },
          {
            id: 5,
            title: 'Chef's Table Experience: A Culinary Journey',
            description: 'Reserve our exclusive Chef's Table for an unforgettable dining experience with a personalized menu.',
            content: 'For those seeking the ultimate dining experience, The House of Bamboo proudly presents our Chef's Table Experience. This exclusive offering gives you and up to five guests a front-row seat to the culinary magic happening in our kitchen. Executive Chef Michael Chen will personally prepare a multi-course tasting menu tailored to your preferences and dietary requirements, explaining each dish and its inspiration as it's served. You'll witness the precision and artistry that goes into every plate, with the opportunity to ask questions and learn professional techniques. The experience includes a welcome champagne toast, wine pairings with each course, and a signed menu to take home as a memento. Perfect for special celebrations or for food enthusiasts wanting to deepen their appreciation of Asian fusion cuisine.',
            author: 'Chef Michael Chen',
            date: '2025-02-25T16:00:00Z',
            image: '/images/food2.jpg',
            category: 'Dining Experiences',
            link: '/blog/chefs-table'
          }
        ]);
      }, 1500);
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    async function loadRSSFeeds() {
      setLoading(true);
      // In a real implementation, you would fetch from actual RSS feeds
      const blogPosts = await fetchRSSFeed('https://example.com/rss');
      setPosts(blogPosts);
      setLoading(false);
    }
    
    loadRSSFeeds();
  }, []);
  
  // Get unique categories from posts
  const categories = [...new Set(posts.map(post => post.category))];
  
  // Filter posts based on search term and selected category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The House of Bamboo Blog</h2>
        <p className="mt-4 text-xl text-gray-600">Latest news, events, and culinary insights</p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Featured Post */}
      {!loading && filteredPosts.length > 0 && (
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${filteredPosts[0].image})` }}
                ></div>
              </div>
              <div className="p-6">
                <CardHeader className="p-0 pb-4">
                  <div className="flex items-center mb-2">
                    <Tag className="h-4 w-4 mr-1 text-amber-500" />
                    <span className="text-sm text-amber-500">{filteredPosts[0].category}</span>
                  </div>
                  <CardTitle className="text-2xl">{filteredPosts[0].title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 pb-4">
                  <p className="text-gray-600 mb-4">{filteredPosts[0].description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <User className="h-4 w-4 mr-1" />
                    <span className="mr-4">{filteredPosts[0].author}</span>
                    <CalendarIcon className="h-4 w-4 mr-1" />
                    <span>{formatDate(filteredPosts[0].date)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-0">
                  <Button variant="outline" className="border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white">
                    Read More
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <Skeleton className="h-64 rounded-none" />
                <div className="p-6">
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-40 mb-4" />
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="h-48 rounded-t-lg" />
                  <div className="p-6">
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-40 mb-4" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {/* Blog Posts Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.slice(1).map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-48">
                <div 
                  className="absolute inset-0 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${post.image})` }}
                ></div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 mr-1 text-amber-500" />
                  <span className="text-sm text-amber-500">{post.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <Button variant="outline" className="w-full border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* No Results */}
      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No blog posts found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <Button 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
      
      {/* Newsletter Signup */}
      <div className="mt-16 bg-amber-50 rounded-lg p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Subscribe to Our Newsletter</h3>
          <p className="mt-2 text-gray-600">
            Stay updated with the latest news, events, and special offers from The House of Bamboo.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input
            placeholder="Your email address"
            type="email"
            className="flex-1"
          />
          <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  )
}
