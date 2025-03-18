'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, Tag, User } from 'lucide-react';

// Function to fetch and parse RSS feeds
async function fetchRSSFeed() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: 'New Spring Menu Unveiled',
          description: 'Discover our exciting new seasonal dishes.',
          author: 'Executive Chef Jon Hizola',
          date: '2025-03-15T10:30:00Z',
          image: '/images/food1.jpg',
          category: 'Menu Updates',
          link: '/blog/new-spring-menu',
        },
        {
          id: 2,
          title: 'Cocktail Masterclass: Learn from Our Mixologists',
          description: 'Join us for an exclusive evening.',
          author: 'Alexander Dickson, Director & Beverage Manager',
          date: '2025-03-10T14:45:00Z',
          image: '/images/drink1.jpg',
          category: 'Events',
          link: '/blog/cocktail-masterclass',
        },
      ]);
    }, 1500);
  });
}

// Format date function
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
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
      const blogPosts = await fetchRSSFeed();
      setPosts(blogPosts);
      setLoading(false);
    }
    loadRSSFeeds();
  }, []);

  const categories = [...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    return (
      (!searchTerm || post.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!selectedCategory || post.category === selectedCategory)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">The House of Bamboo Blog</h2>
        <p className="mt-4 text-xl text-gray-600">Latest news, events, and culinary insights</p>
      </div>

      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto h-10 px-3 rounded-md border border-input bg-background text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {loading && <Skeleton className="h-64 w-full" />}

      {!loading && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No blog posts found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search or filter.</p>
          <Button className="mt-4" onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}>Clear Filters</Button>
        </div>
      )}

      {!loading && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
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
    </div>
  );
}
