'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Food menu categories and items
const foodCategories = [
  {
    id: 'starters',
    name: 'Starters',
    items: [
      {
        id: 'bamboo-dumplings',
        name: 'Bamboo Steamed Dumplings',
        description: 'Delicate dumplings filled with a blend of shrimp, pork, and aromatic herbs.',
        price: 14.99,
        image: '/images/food1.jpg',
        vegetarian: false,
        spicy: false,
      },
      {
        id: 'spring-rolls',
        name: 'Crispy Spring Rolls',
        description: 'Hand-rolled vegetable spring rolls with sweet chili dipping sauce.',
        price: 12.99,
        image: '/images/food2.jpg',
        vegetarian: true,
        spicy: false,
      },
      {
        id: 'satay-skewers',
        name: 'Chicken Satay Skewers',
        description: 'Grilled chicken skewers with peanut sauce and cucumber relish.',
        price: 13.99,
        image: '/images/food1.jpg',
        vegetarian: false,
        spicy: false,
      },
    ],
  },
  {
    id: 'mains',
    name: 'Main Courses',
    items: [
      {
        id: 'lemongrass-chicken',
        name: 'Lemongrass Chicken',
        description: 'Grilled chicken marinated in lemongrass, served with coconut rice and stir-fried vegetables.',
        price: 18.99,
        image: '/images/food2.jpg',
        vegetarian: false,
        spicy: true,
      },
      {
        id: 'bamboo-curry',
        name: 'Bamboo Shoot Curry',
        description: 'Tender bamboo shoots in a rich coconut curry with your choice of protein.',
        price: 19.99,
        image: '/images/food1.jpg',
        vegetarian: false,
        spicy: true,
      },
      {
        id: 'tofu-stir-fry',
        name: 'Tofu & Vegetable Stir-Fry',
        description: 'Crispy tofu with seasonal vegetables in a light ginger sauce.',
        price: 16.99,
        image: '/images/food2.jpg',
        vegetarian: true,
        spicy: false,
      },
    ],
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      {
        id: 'mango-sticky-rice',
        name: 'Mango Sticky Rice',
        description: 'Sweet coconut rice with fresh mango and toasted sesame seeds.',
        price: 9.99,
        image: '/images/food1.jpg',
        vegetarian: true,
        spicy: false,
      },
      {
        id: 'coconut-panna-cotta',
        name: 'Coconut Panna Cotta',
        description: 'Silky coconut panna cotta with passion fruit coulis.',
        price: 10.99,
        image: '/images/food2.jpg',
        vegetarian: true,
        spicy: false,
      },
    ],
  },
];

// Beverage menu categories and items
const beverageCategories = [
  {
    id: 'cocktails',
    name: 'Signature Cocktails',
    items: [
      {
        id: 'bamboo-breeze',
        name: 'Bamboo Breeze',
        description: 'Refreshing blend of gin, cucumber, lime, and a hint of lemongrass.',
        price: 12.99,
        image: '/images/drink1.jpg',
        alcoholic: true,
      },
      {
        id: 'lychee-martini',
        name: 'Lychee Martini',
        description: 'Vodka shaken with lychee liqueur and fresh lychee juice.',
        price: 13.99,
        image: '/images/drink1.jpg',
        alcoholic: true,
      },
      {
        id: 'thai-basil-smash',
        name: 'Thai Basil Smash',
        description: 'Bourbon whiskey muddled with Thai basil, lemon, and honey.',
        price: 14.99,
        image: '/images/drink1.jpg',
        alcoholic: true,
      },
    ],
  },
  {
    id: 'mocktails',
    name: 'Mocktails',
    items: [
      {
        id: 'lemongrass-cooler',
        name: 'Lemongrass Cooler',
        description: 'Fresh lemongrass, lime, mint, and soda water.',
        price: 8.99,
        image: '/images/drink1.jpg',
        alcoholic: false,
      },
      {
        id: 'coconut-crush',
        name: 'Coconut Crush',
        description: 'Young coconut water blended with pineapple and a hint of ginger.',
        price: 9.99,
        image: '/images/drink1.jpg',
        alcoholic: false,
      },
    ],
  },
  {
    id: 'wines',
    name: 'Wines',
    items: [
      {
        id: 'house-white',
        name: 'House White',
        description: 'Crisp Sauvignon Blanc with notes of citrus and green apple.',
        price: 9.99,
        glass: true,
        bottle: 38.99,
        image: '/images/drink1.jpg',
        alcoholic: true,
      },
      {
        id: 'house-red',
        name: 'House Red',
        description: 'Medium-bodied Merlot with hints of dark berries and spice.',
        price: 9.99,
        glass: true,
        bottle: 38.99,
        image: '/images/drink1.jpg',
        alcoholic: true,
      },
    ],
  },
];

export default function MenuPopup() {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <FoodMenu />
      <BeverageMenu />
    </div>
  )
}

function FoodMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold">
          Food Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">Food Menu</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="starters" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            {foodCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {foodCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          <div className="flex items-center space-x-2">
                            {item.vegetarian && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Veg</span>
                            )}
                            {item.spicy && (
                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Spicy</span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mt-2">{item.description}</p>
                        <p className="text-amber-600 font-bold mt-4">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

function BeverageMenu() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="text-amber-500 border-amber-500 hover:bg-amber-500/10">
          Beverage Menu
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">Beverage Menu</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="cocktails" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            {beverageCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {beverageCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4 md:w-2/3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold">{item.name}</h3>
                          {item.alcoholic !== undefined && (
                            <span className={`${item.alcoholic ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'} text-xs px-2 py-1 rounded`}>
                              {item.alcoholic ? 'Alcoholic' : 'Non-Alcoholic'}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mt-2">{item.description}</p>
                        <div className="mt-4">
                          {item.glass ? (
                            <div className="flex justify-between">
                              <p className="text-amber-600 font-bold">Glass: ${item.price.toFixed(2)}</p>
                              <p className="text-amber-600 font-bold">Bottle: ${item.bottle.toFixed(2)}</p>
                            </div>
                          ) : (
                            <p className="text-amber-600 font-bold">${item.price.toFixed(2)}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
