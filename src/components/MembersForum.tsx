'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, Heart, MessageSquare, ThumbsUp, User } from 'lucide-react'

// Sample forum categories
const forumCategories = [
  { id: 'general', name: 'General Discussion' },
  { id: 'events', name: 'Events & Meetups' },
  { id: 'recipes', name: 'Recipe Sharing' },
  { id: 'reviews', name: 'Restaurant Reviews' },
  { id: 'suggestions', name: 'Suggestions & Feedback' }
];

// Sample forum posts
const forumPosts = [
  {
    id: 1,
    title: 'What\'s your favorite dish at The House of Bamboo?',
    content: 'I\'ve been a regular for about 6 months now and I\'m still discovering new favorites on the menu. Currently obsessed with the Lemongrass Chicken! What dishes do you all recommend?',
    author: {
      id: 101,
      name: 'FoodieExplorer',
      avatar: '/images/food1.jpg'
    },
    category: 'general',
    date: '2025-03-15T14:30:00Z',
    replies: 8,
    likes: 12,
    isSticky: false,
    isAnnouncement: false
  },
  {
    id: 2,
    title: 'Monthly Bamboo Members Meetup - April 2025',
    content: 'Our next monthly members meetup is scheduled for April 10th at 7 PM. We\'ll be having a special tasting menu prepared by Chef Michael, followed by a sake sampling session. Limited to 20 members, so RSVP early!',
    author: {
      id: 102,
      name: 'EventCoordinator',
      avatar: '/images/food2.jpg',
      isStaff: true
    },
    category: 'events',
    date: '2025-03-12T10:15:00Z',
    replies: 15,
    likes: 24,
    isSticky: true,
    isAnnouncement: true
  },
  {
    id: 3,
    title: 'Homemade version of the Bamboo Breeze cocktail',
    content: 'I tried to recreate the Bamboo Breeze cocktail at home this weekend. I used gin, cucumber, lime juice, and a lemongrass simple syrup. It was close, but not quite the same. Does anyone know what else might be in it? Any tips from the bartenders?',
    author: {
      id: 103,
      name: 'MixologyFan',
      avatar: '/images/drink1.jpg'
    },
    category: 'recipes',
    date: '2025-03-10T18:45:00Z',
    replies: 6,
    likes: 9,
    isSticky: false,
    isAnnouncement: false
  },
  {
    id: 4,
    title: 'Review: Chef\'s Table Experience',
    content: 'Just experienced the Chef\'s Table last night and it was absolutely phenomenal! The 8-course tasting menu was a perfect balance of traditional and innovative dishes. Chef Michael\'s explanation of each dish and its cultural significance added so much to the experience. Highly recommend for special occasions!',
    author: {
      id: 104,
      name: 'GourmetLover',
      avatar: '/images/food1.jpg'
    },
    category: 'reviews',
    date: '2025-03-08T21:20:00Z',
    replies: 4,
    likes: 18,
    isSticky: false,
    isAnnouncement: false
  },
  {
    id: 5,
    title: 'Suggestion: Vegetarian Tasting Menu',
    content: 'As a vegetarian, I love the current options at The House of Bamboo, but I\'d love to see a dedicated vegetarian tasting menu that showcases the same level of creativity as the regular menu. Would others be interested in this?',
    author: {
      id: 105,
      name: 'PlantBasedFoodie',
      avatar: '/images/food2.jpg'
    },
    category: 'suggestions',
    date: '2025-03-05T15:10:00Z',
    replies: 12,
    likes: 15,
    isSticky: false,
    isAnnouncement: false
  },
  {
    id: 6,
    title: 'Welcome to our new forum!',
    content: 'Hello Bamboo Members! We\'re excited to launch this new forum to help build our community. This is a space to share your experiences, recipes, meet fellow food enthusiasts, and connect with our staff. Please review our community guidelines and happy posting!',
    author: {
      id: 106,
      name: 'RestaurantManager',
      avatar: '/images/food1.jpg',
      isStaff: true
    },
    category: 'general',
    date: '2025-03-01T09:00:00Z',
    replies: 22,
    likes: 45,
    isSticky: true,
    isAnnouncement: true
  }
];

// Function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Sample replies for a post
const sampleReplies = [
  {
    id: 101,
    content: 'The Bamboo Steamed Dumplings are my absolute favorite! I order them every time I visit.',
    author: {
      id: 107,
      name: 'DumplingLover',
      avatar: '/images/food2.jpg'
    },
    date: '2025-03-15T15:10:00Z',
    likes: 5
  },
  {
    id: 102,
    content: 'I\'m a big fan of the Lemongrass Chicken too! But have you tried the Bamboo Shoot Curry? It\'s incredible, especially if you like spicy food.',
    author: {
      id: 108,
      name: 'SpiceEnthusiast',
      avatar: '/images/food1.jpg'
    },
    date: '2025-03-15T16:25:00Z',
    likes: 3
  },
  {
    id: 103,
    content: 'For dessert, you can\'t go wrong with the Mango Sticky Rice. It\'s the perfect balance of sweet and creamy.',
    author: {
      id: 109,
      name: 'SweetTooth',
      avatar: '/images/food2.jpg'
    },
    date: '2025-03-15T17:40:00Z',
    likes: 7
  },
  {
    id: 104,
    content: 'Thank you all for the recommendations! I\'ll definitely try the Bamboo Shoot Curry and the Mango Sticky Rice on my next visit.',
    author: {
      id: 101,
      name: 'FoodieExplorer',
      avatar: '/images/food1.jpg'
    },
    date: '2025-03-15T18:15:00Z',
    likes: 2
  }
];

export default function MembersForum() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('general');
  
  // Filter posts based on active tab and search term
  const filteredPosts = forumPosts.filter(post => {
    const matchesTab = activeTab === 'all' || post.category === activeTab;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });
  
  // Sort posts: announcements and sticky posts first, then by date
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isAnnouncement && !b.isAnnouncement) return -1;
    if (!a.isAnnouncement && b.isAnnouncement) return 1;
    if (a.isSticky && !b.isSticky) return -1;
    if (!a.isSticky && b.isSticky) return 1;
    return new Date(b.date) - new Date(a.date);
  });
  
  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    // In a real implementation, this would validate credentials against a database
    if (username && password) {
      setIsLoggedIn(true);
    }
  };
  
  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };
  
  // Handle new post submission
  const handleNewPost = (e) => {
    e.preventDefault();
    // In a real implementation, this would save the post to a database
    alert('Post submitted successfully!');
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('general');
  };
  
  // Handle reply submission
  const handleReply = (e) => {
    e.preventDefault();
    // In a real implementation, this would save the reply to a database
    alert('Reply submitted successfully!');
    setReplyContent('');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Members Forum</h2>
        <p className="mt-4 text-xl text-gray-600">Connect with fellow Bamboo enthusiasts</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Login/User Profile */}
          <Card>
            {isLoggedIn ? (
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src="/images/food1.jpg" alt="User Avatar" />
                    <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{username}</p>
                    <p className="text-sm text-gray-500">Member since March 2025</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </CardContent>
            ) : (
              <CardContent className="p-6">
                <CardTitle className="text-lg mb-4">Member Login</CardTitle>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold"
                  >
                    Log In
                  </Button>
                </form>
                <div className="mt-4 text-center">
                  <a href="#" className="text-sm text-amber-500 hover:underline">
                    Forgot password?
                  </a>
                  <p className="text-sm mt-2">
                    Not a member?{' '}
                    <a href="#" className="text-amber-500 hover:underline">
                      Join now
                    </a>
                  </p>
                </div>
              </CardContent>
            )}
          </Card>
          
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant={activeTab === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('all')}
                >
                  All Topics
                </Button>
                {forumCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeTab === category.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Forum Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Forum Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Topics:</span>
                  <span className="font-medium">{forumPosts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Members:</span>
                  <span className="font-medium">124</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Newest Member:</span>
                  <span className="font-medium">SushiLover</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search and New Post */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Input
              placeholder="Search forum..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
              onClick={() => isLoggedIn ? setSelectedPost('new') : alert('Please log in to create a post')}
            >
              New Topic
            </Button>
          </div>
          
          {/* New Post Form */}
          {selectedPost === 'new' && isLoggedIn && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleNewPost} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      {forumCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <Textarea
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-[200px]"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedPost(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                    >
                      Post Topic
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
          
          {/* Post Detail View */}
          {selectedPost && selectedPost !== 'new' && (
            <Card className="mb-6">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      {selectedPost.isAnnouncement && (
                        <Badge className="bg-red-500">Announcement</Badge>
                      )}
                      <Badge>{forumCategories.find(c => c.id === selectedPost.category)?.name}</Badge>
                    </div>
                    <CardTitle>{selectedPost.title}</CardTitle>
                    <CardDescription>
                      Posted by {selectedPost.author.name} on {formatDate(selectedPost.date)}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedPost(null)}
                  >
                    Back to List
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4 mb-6">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedPost.author.avatar} alt={selectedPost.author.name} />
                    <AvatarFallback>{selectedPost.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center mb-1">
                      <p className="font-medium mr-2">{selectedPost.author.name}</p>
                      {selectedPost.author.isStaff && (
                        <Badge className="bg-amber-500">Staff</Badge>
                      )}
                    </div>
                    <p className="text-gray-700 whitespace-pre-line">{selectedPost.content}</p>
                    <div className="flex items-center space-x-4 mt-4">
                      <button className="flex items-center text-gray-500 hover:text-amber-500">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        <span>{selectedPost.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-amber-500">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        <span>{selectedPost.replies}</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium mb-4">Replies</h3>
                  <div className="space-y-6">
                    {sampleReplies.map((reply) => (
                      <div key={reply.id} className="flex items-start space-x-4">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                          <AvatarFallback>{reply.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <p className="font-medium text-sm mr-2">{reply.author.name}</p>
                            <p className="text-xs text-gray-500">{formatDate(reply.date)}</p>
                          </div>
                          <p className="text-gray-700 text-sm">{reply.content}</p>
                          <button className="flex items-center text-xs text-gray-500 hover:text-amber-500 mt-2">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>{reply.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {isLoggedIn && (
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium mb-4">Post a Reply</h3>
                    <form onSubmit={handleReply}>
                      <Textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        className="min-h-[100px] mb-4"
                        required
                      />
                      <Button
                        type="submit"
                        className="bg-amber-500 hover:bg-amber-600 text-black font-bold"
                      >
                        Post Reply
                      </Button>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Forum Topics List */}
          {!selectedPost && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {activeTab === 'all' 
                    ? 'All Topics' 
                    : forumCategories.find(c => c.id === activeTab)?.name}
                </CardTitle>
                <CardDescription>
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'topic' : 'topics'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sortedPosts.length > 0 ? (
                    sortedPosts.map((post) => (
                      <div 
                        key={post.id} 
                        className={`p-4 rounded-lg border ${post.isAnnouncement ? 'bg-red-50 border-red-200' : post.isSticky ? 'bg-amber-50 border-amber-200' : 'bg-white border-gray-200'} hover:shadow-md transition-shadow cursor-pointer`}
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              {post.isAnnouncement && (
                                <Badge className="bg-red-500">Announcement</Badge>
                              )}
                              {post.isSticky && !post.isAnnouncement && (
                                <Badge className="bg-amber-500">Sticky</Badge>
                              )}
                              <Badge variant="outline">{forumCategories.find(c => c.id === post.category)?.name}</Badge>
                            </div>
                            <h3 className="text-lg font-medium">{post.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              <span className="flex items-center">
                                <User className="h-3 w-3 mr-1" />
                                {post.author.name}
                                {post.author.isStaff && (
                                  <Badge className="ml-2 bg-amber-500 text-xs">Staff</Badge>
                                )}
                              </span>
                            </p>
                          </div>
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center mb-1">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              <span>{post.replies}</span>
                            </div>
                            <div className="flex items-center">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500 flex items-center">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No topics found</p>
                      {searchTerm && (
                        <Button 
                          variant="link" 
                          onClick={() => setSearchTerm('')}
                          className="mt-2"
                        >
                          Clear search
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      {/* Forum Guidelines */}
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Forum Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Do:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Be respectful and courteous to other members</li>
              <li>Stay on topic and contribute meaningfully to discussions</li>
              <li>Share your experiences and recommendations</li>
              <li>Report inappropriate content to moderators</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Don't:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Post offensive or disrespectful content</li>
              <li>Share personal information about yourself or others</li>
              <li>Spam or post promotional content without permission</li>
              <li>Create multiple accounts or impersonate others</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
