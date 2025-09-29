"use client"

import React from 'react'
import Header from '@/components/Header'

import MediaCarousel from '@/components/MediaCarousel'
import DonationForm from '@/components/DonationForm'
import ProgressTracker from '@/components/ProgressTracker'
import EmergencyInfo from '@/components/EmergencyInfo'
import Footer from '@/components/Footer'
import BottomNavigation from '@/components/BottomNavigation'
import DonationPopup from '@/components/DonationPopup'
import { useDonationPopup } from '@/hooks/useDonationPopup'
import { useCampaigns } from '@/hooks/useCampaigns'

function Page() {
  const { isOpen, close } = useDonationPopup({
    showAfterMs: 3000, // Show after 3 seconds
    showOnScrollPercentage: 30, // Show after 30% scroll
    maxShowsPerSession: 2 // Show max 2 times per session
  })

  const { getRandomCampaign } = useCampaigns()
  const featuredCampaign = getRandomCampaign()

  return (
    <div className="min-h-screen">
      <Header />

      <main>


        <MediaCarousel />

        <section id="donate" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Your Support Can Save Lives
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join thousands of compassionate donors helping rebuild Punjab. Every contribution brings hope to families affected by the devastating floods.
              </p>
            </div>
            <DonationForm />
          </div>
        </section>

        <section id="progress">
          <ProgressTracker />
        </section>

        <section id="emergency">
          <EmergencyInfo />
        </section>
      </main>

      <div id="contact">
        <Footer />
      </div>
      <BottomNavigation />

      {/* Donation Popup */}
      {featuredCampaign && (
        <DonationPopup
          isOpen={isOpen}
          onClose={close}
          campaign={featuredCampaign}
        />
      )}
    </div>
  )
}

export default Page
