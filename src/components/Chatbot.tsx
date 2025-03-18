'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bot, Send, User, X } from 'lucide-react'

// Sample FAQ data for the chatbot
const faqData = [
  {
    question: "What are your opening hours?",
    answer: "We're open Monday to Thursday from 11am to 10pm, Friday and Saturday from 11am to 11pm, and Sunday from 12pm to 9pm."
  },
  {
    question: "Do you take reservations?",
    answer: "Yes, we accept reservations through our website booking system or by calling us at (123) 456-7890. We recommend booking in advance, especially for weekends."
  },
  {
    question: "Is there a dress code?",
    answer: "We have a smart casual dress code. While we don't require formal attire, we do ask that guests avoid sportswear, beachwear, or flip-flops in the evening."
  },
  {
    question: "Do you have vegetarian options?",
    answer: "Yes, we offer a variety of vegetarian dishes. Many of our menu items can also be adapted to vegetarian preferences. Please inform your server about any dietary requirements."
  },
  {
    question: "Do you cater for allergies?",
    answer: "Absolutely. Please inform us of any allergies when making your reservation or tell your server. Our kitchen can accommodate most dietary restrictions and allergies."
  },
  {
    question: "Is there parking available?",
    answer: "We have a dedicated parking lot behind the restaurant. Valet parking is also available during dinner hours on Friday and Saturday."
  },
  {
    question: "Do you have a bar area?",
    answer: "Yes, we have a full-service bar area where you can enjoy our signature cocktails, wines, and other beverages. Bar seating is available on a first-come, first-served basis."
  },
  {
    question: "Can I host a private event?",
    answer: "Yes, we have a private dining room that can accommodate up to 20 guests. For larger events, we can arrange partial or full restaurant buyouts. Please contact our events team at events@houseofbamboo.com for more information."
  },
  {
    question: "Do you have a children's menu?",
    answer: "We offer a special menu for children under 12 with smaller portions and kid-friendly options. High chairs and booster seats are available upon request."
  },
  {
    question: "Is there a corkage fee?",
    answer: "Yes, there is a $25 corkage fee per bottle for wine brought from outside. We waive this fee for bottles not available on our wine list, limited to one bottle per party."
  }
];

// Function to find the best match for a user query
function findBestMatch(query) {
  query = query.toLowerCase();
  
  // Check for exact matches first
  for (const faq of faqData) {
    if (faq.question.toLowerCase() === query) {
      return faq.answer;
    }
  }
  
  // Check for partial matches
  let bestMatch = null;
  let highestScore = 0;
  
  for (const faq of faqData) {
    const questionWords = faq.question.toLowerCase().split(' ');
    const queryWords = query.split(' ');
    
    let matchScore = 0;
    for (const word of queryWords) {
      if (word.length > 2 && questionWords.includes(word)) {
        matchScore++;
      }
      
      // Check for partial word matches
      for (const qWord of questionWords) {
        if (qWord.includes(word) && word.length > 3) {
          matchScore += 0.5;
        }
      }
    }
    
    if (matchScore > highestScore) {
      highestScore = matchScore;
      bestMatch = faq.answer;
    }
  }
  
  // Return the best match if score is above threshold, otherwise return default message
  if (highestScore >= 1) {
    return bestMatch;
  }
  
  // Check for specific keywords
  if (query.includes('menu') || query.includes('food') || query.includes('eat')) {
    return "You can view our full menu by clicking on the 'Food Menu' or 'Beverage Menu' buttons on our homepage. We offer a variety of Asian fusion dishes with a focus on fresh, local ingredients.";
  }
  
  if (query.includes('book') || query.includes('reservation') || query.includes('table')) {
    return "You can make a reservation through our booking page on the website or by calling us at (123) 456-7890. We recommend booking in advance, especially for weekends.";
  }
  
  if (query.includes('location') || query.includes('address') || query.includes('where')) {
    return "We're located at 123 Bamboo Lane, Cityville, State 12345. You can find us on the map in the contact section of our website.";
  }
  
  if (query.includes('event') || query.includes('private') || query.includes('party')) {
    return "We offer private event spaces and catering services. Please contact our events team at events@houseofbamboo.com for more information about hosting your special occasion with us.";
  }
  
  return "I'm not sure I understand your question. Could you please rephrase or ask about our hours, menu, reservations, or location? Alternatively, you can call us at (123) 456-7890 for more specific assistance.";
}

// Initial greeting message
const initialMessage = {
  sender: 'bot',
  text: "Hello! Welcome to The House of Bamboo. I'm your virtual assistant and I'm here to help answer your questions about our restaurant. You can ask me about our hours, menu, reservations, or location. How can I assist you today?",
  time: new Date()
};

// Suggested questions
const suggestedQuestions = [
  "What are your opening hours?",
  "Do you take reservations?",
  "Do you have vegetarian options?",
  "Is there parking available?",
  "Can I host a private event?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([initialMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle sending a message
  const handleSendMessage = (text = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage = {
      sender: 'user',
      text: text,
      time: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponse = {
        sender: 'bot',
        text: findBestMatch(text),
        time: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };
  
  // Handle suggested question click
  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };
  
  // Format time
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <>
      {/* Chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className={`rounded-full w-16 h-16 shadow-lg ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-full max-w-sm">
          <Card className="shadow-xl border-amber-200">
            <CardHeader className="bg-amber-500 text-black rounded-t-lg">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3 bg-white">
                  <AvatarImage src="/images/food1.jpg" alt="Chatbot Avatar" />
                  <AvatarFallback>HB</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>House of Bamboo Assistant</CardTitle>
                  <CardDescription className="text-gray-800">
                    Online | Typically replies instantly
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0 bg-amber-100">
                        <AvatarImage src="/images/food1.jpg" alt="Chatbot Avatar" />
                        <AvatarFallback>HB</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-amber-500 text-black'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-amber-800' : 'text-gray-500'}`}>
                        {formatTime(message.time)}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0 bg-amber-700">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex mb-4 justify-start">
                    <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0 bg-amber-100">
                      <AvatarImage src="/images/food1.jpg" alt="Chatbot Avatar" />
                      <AvatarFallback>HB</AvatarFallback>
                    </Avatar>
                    <div className="bg-white border border-gray-200 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Suggested questions */}
              {messages.length < 3 && (
                <div className="p-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-2">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full transition-colors"
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="p-3 border-t">
              <form
                className="flex w-full items-center space-x-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              >
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="bg-amber-500 hover:bg-amber-600"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
