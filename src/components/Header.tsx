'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { DonationModal } from '@/components/DonationModal'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToDonation = () => {
    const element = document.querySelector('#donate')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleDonateClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        isScrolled
          ? 'bg-background/95 shadow-lg border-b border-border'
          : 'bg-background/50'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`p-1 sm:p-1.5 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? 'bg-primary shadow-lg'
                  : 'bg-primary/90 backdrop-blur-sm shadow-md'
              }`}>
                <Image 
                  src="/logo.webp" 
                  alt="Punjab Flood Relief Logo" 
                  width={30} 
                  height={30} 
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${isScrolled ? 'text-primary-foreground' : 'text-primary-foreground'} transition-transform hover:scale-110`}
                />
              </div>
              <div>
                <h1 className={`font-bold text-lg sm:text-xl tracking-tight ${
                  isScrolled ? 'text-foreground' : 'text-foreground'
                } transition-colors`}>
                  Punjab Flood Relief
                </h1>
                <p className={`text-[10px] sm:text-xs ${
                  isScrolled ? 'text-muted-foreground' : 'text-muted-foreground/80'
                }`}>
                  Save Lives, Rebuild Hope
                </p>
              </div>
            </div>

            {/* Donate Button */}
            <Button
              onClick={handleDonateClick}
              size="sm"
              className={`${
                isScrolled
                  ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg'
                  : 'bg-primary/90 hover:bg-primary text-primary-foreground shadow-md backdrop-blur-sm'
              } transform transition-all duration-300 hover:scale-105 font-semibold px-3 sm:px-6 text-sm sm:text-base`}
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 animate-pulse" />
              <span className="hidden sm:inline">Donate Now</span>
              <span className="sm:hidden">Donate</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>

      {/* Donation Modal */}
      <DonationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
