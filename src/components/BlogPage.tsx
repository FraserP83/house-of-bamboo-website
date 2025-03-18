'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { CalendarIcon, Tag, User } from 'lucide-react';

async function fetchRSSFeed() {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'New Spring Menu Unveiled',
            description: 'Discover our exciting new seasonal dishes.',
            author: 'Chef Michael Chen',
            date: '2025-03-15T10:30:00Z',
            image: '/images/food1.jpg',
            category: 'Menu Updates',
            link: '/blog/new-spring-menu',
          },
          {
            id: 2,
            title: 'Cocktail Masterclass',
            description: 'Join our expert mixologists for an exclusive workshop.',
            author: 'Sarah Johnson',
            date: '2025-03-10T14:45:00Z',
            image: '/images/drink1.jpg',
            category: 'Events',
            link: '/blog/cocktail-masterclass',
          },
        ]);
      }, 1500);
    });
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

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
  const filteredPosts = posts.filter((post) =>
    (searchTerm === '' || post.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === '' || post.category === selectedCategory)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">The House of Bamboo Blog</h2>
        <p className="text-xl text-gray-600">Latest news and insights</p>
      </div>

      <div className="mb-8 flex gap-4">
        <Input
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded px-3 h-10"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent><Skeleton className="h-48" /></CardContent>
            </Card>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id}>
              <div className="relative h-48 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
              <CardContent>
                <div className="flex items-center mb-2">
                  <Tag className="h-4 w-4 mr-1 text-amber-500" />
                  <span className="text-sm text-amber-500">{post.category}</span>
                </div>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="h-4 w-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <Button variant="outline">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No blog posts found</h3>
          <Button onClick={() => { setSearchTerm(''); setSelectedCategory(''); }}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
}
