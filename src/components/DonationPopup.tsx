"use client"

import React from "react"
import { X, HeartPulse, Soup, Droplets, Home, Shield } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface DonationPopupProps {
  isOpen: boolean
  onClose: () => void
  onDonate: (amount: number) => void
  campaign?: {
    title: string
    description: string
    mainImage: string
    logo: string
    presetAmount: number
  }
}

export default function DonationPopup({ isOpen, onClose, onDonate, campaign }: DonationPopupProps) {
  const [showDifferentAmount, setShowDifferentAmount] = React.useState(false)

  // Helper function to render logo or icon
  const renderLogo = (logo: string, className: string = "") => {
    const iconMap: Record<string, React.ComponentType<any>> = {
      "heart-pulse": HeartPulse,
      "soup": Soup,
      "droplets": Droplets,
      "home": Home,
      "shield": Shield,
    }

    // Check if logo is an icon name (contains no spaces, no special characters, matches our icon map)
    if (iconMap[logo]) {
      const IconComponent = iconMap[logo]
      return <IconComponent className={className} />
    }

    // Otherwise, treat as image URL
    return (
      <Image
        src={logo}
        alt="logo"
        width={300}
        height={300}
        className={className}
        style={{ borderRadius: "1000px", overflow: "hidden" }}
      />
    )
  }

  // Default campaign data
  const defaultCampaign = {
    title: "Flood Relief Punjab",
    description: "Your donations will make a world of difference",
    mainImage: "/flood1.png",
    logo: "/flood1.png",
    presetAmount: 19999
  }

  const currentCampaign = campaign || defaultCampaign

  const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" data-scope="dialog" data-part="content" dir="ltr" role="dialog">
      <div className="relative w-full max-w-md mx-4 bg-background border rounded-lg shadow-2xl overflow-hidden">
        {/* Background with logo and gradient */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          {renderLogo(currentCampaign.logo, "w-[300px] h-[300px] text-muted-foreground")}
        </div>
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 to-transparent"></div>

        {/* Content */}
        <div className="relative bg-background/95 backdrop-blur-sm border rounded-lg max-w-full">
          {/* Main image with clip path */}
          <Image
            src={currentCampaign.mainImage}
            alt="Campaign"
            width={400}
            height={300}
            className="w-full max-h-[300px] object-cover"
            style={{
              clipPath: "polygon(0px 2%, 100% 0px, 100% 87%, 0% 100%)",
              borderTopLeftRadius: "var(--radii-lg)",
              borderTopRightRadius: "var(--radii-lg)"
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 bg-background/90 hover:bg-background border border-border rounded-full p-2 shadow-md transition-colors"
            aria-label="Close Dialog"
          >
            <X className="h-4 w-4 text-foreground" />
          </button>

          <div className="p-6">
            {/* Description */}
            <div className="flex items-center justify-center px-6 mt-4 mb-6">
              <p className="text-xl text-center font-medium">
                {currentCampaign.description}
              </p>
            </div>

            {/* Donation buttons */}
            <div className="flex flex-col items-center gap-3">
              {!showDifferentAmount ? (
                <>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 text-lg shadow-lg border-2 border-primary"
                    onClick={() => {
                      // Handle donation with preset amount
                      onDonate(currentCampaign.presetAmount)
                    }}
                  >
                    Donate {formatINR(currentCampaign.presetAmount)}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">OR</p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-colors border-muted-foreground text-muted-foreground"
                    onClick={() => setShowDifferentAmount(true)}
                  >
                    Choose a different amount
                  </Button>
                </>
              ) : (
                <div className="w-full space-y-3">
                  <p className="text-center font-medium">Choose your donation amount</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[500, 1000, 2500, 5000, 10000, 25000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        className="hover:bg-primary hover:text-primary-foreground border-muted-foreground text-muted-foreground transition-colors"
                        onClick={() => {
                          onDonate(amount)
                        }}
                      >
                        {formatINR(amount)}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowDifferentAmount(false)}
                    className="w-full hover:bg-muted text-muted-foreground border-muted-foreground"
                  >
                    ← Back
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
