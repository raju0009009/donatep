'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { DonationModal } from '@/components/DonationModal'


export default function DonationForm() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDonateClick = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Card className="w-full max-w-lg mx-auto shadow-xl border-0 bg-gradient-to-br from-background to-muted/20">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-foreground tracking-tight">
            Make a Donation
          </CardTitle>
          <CardDescription className="text-base">
            Your contribution brings hope to families affected by the Punjab floods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              Your generous donation can provide immediate relief to families affected by the Punjab floods.
            </p>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">₹500</div>
                <div className="text-sm text-muted-foreground">Emergency Kit</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">₹2,500</div>
                <div className="text-sm text-muted-foreground">Family Relief</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">₹5,000</div>
                <div className="text-sm text-muted-foreground">Shelter Support</div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleDonateClick}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          >
            <Heart className="w-5 h-5 mr-2 animate-pulse" />
            Donate Now
          </Button>

          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">Why Your Donation Matters</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Every contribution helps provide food, clean water, medical supplies, and shelter to families in need.
                  Your donation makes a real difference in rebuilding lives and restoring hope in affected communities.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Donation Modal */}
      <DonationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}