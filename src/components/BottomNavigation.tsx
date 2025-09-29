'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { DonationModal } from '@/components/DonationModal'
import { Heart, ArrowUp } from 'lucide-react'

export default function BottomNavigation() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [donationNotification, setDonationNotification] = useState<{
    show: boolean
    name: string
    amount: number
  }>({ show: false, name: '', amount: 0 })

  // Indian names for random donation notifications
  const indianNames = [
    'Priya', 'Amit', 'Deepak', 'Sneha', 'Rahul', 'Neha', 'Vikram', 'Anjali',
    'Rajesh', 'Kavita', 'Sunil', 'Meera', 'Arun', 'Pooja', 'Vivek', 'Sunita',
    'Ravi', 'Geeta', 'Mohan', 'Lata', 'Ajay', 'Rekha', 'Kiran', 'Shilpa',
    'Sanjay', 'Anita', 'Vijay', 'Savita', 'Manish', 'Usha', 'Ramesh', 'Vandana'
  ]

  // Show random donation notification
  useEffect(() => {
    const showDonationNotification = () => {
      const randomName = indianNames[Math.floor(Math.random() * indianNames.length)]
      const randomAmount = Math.floor(Math.random() * 10) * 500 + 500 // Amounts: 500, 1000, 1500, ..., 5000

      setDonationNotification({
        show: true,
        name: randomName,
        amount: randomAmount
      })

      // Hide notification after 4 seconds
      setTimeout(() => {
        setDonationNotification(prev => ({ ...prev, show: false }))
      }, 4000)
    }

    // Show first notification after 3 seconds
    const firstTimeout = setTimeout(showDonationNotification, 3000)

    // Show subsequent notifications every 8-15 seconds
    const notificationInterval = setInterval(() => {
      showDonationNotification()
    }, Math.random() * 7000 + 8000) // Random interval between 8-15 seconds

    return () => {
      clearTimeout(firstTimeout)
      clearInterval(notificationInterval)
    }
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleDonate = () => {
    setIsModalOpen(true)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Bottom Donation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-gradient-to-t from-background/95 via-background/90 to-background/80 backdrop-blur-lg border-t border-border/50 shadow-lg">
          {/* Visual separator line */}
          <div className="h-px bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>

          {/* Donation Notification Toast */}
          {donationNotification.show && (
            <div className="flex items-center bg-green-400 gap-2 flex-row border border-secondary/30 rounded-lg p-2 mb-3 shadow-lg transition-all duration-400 ease-in-out">
              <div className="flex items-center justify-center w-8 h-8 relative">
                <div className="w-5 h-5 rounded-full overflow-hidden mx-auto">
                  <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center">
                    <Heart className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
              </div>
              <p className=" font-bold text-xs flex-1">
                {donationNotification.name} has donated ₹{donationNotification.amount.toLocaleString('en-IN')}
              </p>
            </div>
          )}

          <div className="p-4 pb-6">
            {/* Quick donate label */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-muted-foreground">Quick Donate</span>
              <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
            </div>

            {/* Donate Button with enhanced styling */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm"></div>
              <Button
                onClick={handleDonate}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg border border-primary/20 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Heart className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10 font-semibold">Donate Now</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      <DonationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="sm"
          className="fixed bottom-32 right-4 z-50 rounded-full w-10 h-10 p-0 shadow-lg bg-primary hover:bg-primary/90"
        >
          <ArrowUp className="w-4 h-4" />
        </Button>
      )}

      {/* Spacer for bottom navigation on mobile */}
      <div className="h-32 md:hidden"></div>
    </>
  )
}