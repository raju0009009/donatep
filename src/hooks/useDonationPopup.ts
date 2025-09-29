"use client"

import { useState, useEffect } from 'react'

interface UseDonationPopupOptions {
  showAfterMs?: number
  showOnScrollPercentage?: number
  sessionKey?: string
  maxShowsPerSession?: number
}

export function useDonationPopup(options: UseDonationPopupOptions = {}) {
  const {
    showAfterMs = 5000, // Show after 5 seconds
    showOnScrollPercentage = 50, // Show after 50% scroll
    sessionKey = 'donation-popup-session',
    maxShowsPerSession = 1
  } = options

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if we should show popup based on session storage
    const sessionData = sessionStorage.getItem(sessionKey)
    if (sessionData) {
      const { showCount, lastShown } = JSON.parse(sessionData)
      const now = Date.now()

      // Reset if session is older than 1 hour
      if (now - lastShown > 60 * 60 * 1000) {
        sessionStorage.removeItem(sessionKey)
      } else if (showCount >= maxShowsPerSession) {
        return // Don't show if already shown max times
      }
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsOpen(true)
      updateSessionCount()
    }, showAfterMs)

    // Show popup on scroll
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      if (scrollPercentage >= showOnScrollPercentage && !isOpen) {
        setIsOpen(true)
        updateSessionCount()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showAfterMs, showOnScrollPercentage, sessionKey, maxShowsPerSession, isOpen])

  const updateSessionCount = () => {
    const sessionData = sessionStorage.getItem(sessionKey)
    let newSessionData = { showCount: 1, lastShown: Date.now() }

    if (sessionData) {
      const parsed = JSON.parse(sessionData)
      newSessionData = {
        showCount: parsed.showCount + 1,
        lastShown: Date.now()
      }
    }

    sessionStorage.setItem(sessionKey, JSON.stringify(newSessionData))
  }

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return {
    isOpen,
    open,
    close
  }
}