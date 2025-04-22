'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { track } from '@vercel/analytics'

export function MainNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const donateUrl = "https://give.tithe.ly/?formId=42e3f1ba-6865-11ee-90fc-1260ab546d11"

  const handlePartnerClick = () => {
    track('partner_header_click', {
      location: 'header',
      text: 'Partner'
    })
  }

  return (
    <div className="container flex h-14 items-center">
      <Link href="/" className="flex items-center space-x-2">
        <span className="font-bold text-xl">Dr. Joshua Todd</span>
      </Link>
      
      <button
        className="ml-auto md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      <nav className="ml-auto hidden md:flex gap-6 items-center">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">About</Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#ministry">Ministry</Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#testimonials">Testimonials</Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#events">Events</Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#missions">Missions</Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#books">Books</Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/blog">Blog</Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="/calendar">Calendar</Link>
        <Link 
          href={donateUrl}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium 
          transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-purple-600 hover:to-pink-600
          [animation:pulse_4s_ease-in-out_infinite] hover:animate-none"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handlePartnerClick}
        >
          Partner
        </Link>
      </nav>

      {isMenuOpen && (
        <div className="absolute top-14 left-0 right-0 md:hidden border-t bg-background">
          <nav className="flex flex-col p-4">
            <Link 
              className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
              href="#about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
              href="#ministry"
              onClick={() => setIsMenuOpen(false)}
            >
              Ministry
            </Link>
            <Link 
              className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
              href="#testimonials"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
              href="#events"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
              href="#missions"
              onClick={() => setIsMenuOpen(false)}
            >
              Missions
            </Link>
            <Link 
              className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
              href="#books"
              onClick={() => setIsMenuOpen(false)}
            >
              Books
            </Link>
            <Link 
              className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
              href="/blog"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              className="px-4 py-2 hover:bg-muted rounded-md text-sm font-medium" 
              href="/calendar"
              onClick={() => setIsMenuOpen(false)}
            >
              Calendar
            </Link>
            <Link 
              href={donateUrl}
              className="mt-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md font-medium text-center"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                setIsMenuOpen(false);
                handlePartnerClick();
              }}
            >
              Partner
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
} 