"use client"

export interface Campaign {
  id: string
  title: string
  description: string
  mainImage: string
  logo: string // Can be image URL or Lucide icon name
  presetAmount: number
  isActive: boolean
  priority: number
}

export function useCampaigns() {
  const campaigns: Campaign[] = [
    {
      id: "flood-relief-punjab",
      title: "Flood Relief Punjab",
      description: "Your donations will make a world of difference",
      mainImage: "/flood1.png",
      logo: "droplets",
      presetAmount: 19999,
      isActive: true,
      priority: 1
    },
    {
      id: "emergency-medical-aid",
      title: "Emergency Medical Aid",
      description: "Help provide critical medical supplies to affected families",
      mainImage: "/flood1.png",
      logo: "heart-pulse",
      presetAmount: 9999,
      isActive: true,
      priority: 2
    },
    {
      id: "food-relief-campaign",
      title: "Food Relief Campaign",
      description: "Provide meals to families displaced by floods",
      mainImage: "/flood1.png",
      logo: "soup",
      presetAmount: 4999,
      isActive: true,
      priority: 3
    }
  ]

  const getActiveCampaigns = (): Campaign[] => {
    return campaigns
      .filter(campaign => campaign.isActive)
      .sort((a, b) => a.priority - b.priority)
  }

  const getCampaignById = (id: string): Campaign | undefined => {
    return campaigns.find(campaign => campaign.id === id)
  }

  const getRandomCampaign = (): Campaign | undefined => {
    const activeCampaigns = getActiveCampaigns()
    if (activeCampaigns.length === 0) return undefined

    const randomIndex = Math.floor(Math.random() * activeCampaigns.length)
    return activeCampaigns[randomIndex]
  }

  return {
    campaigns,
    getActiveCampaigns,
    getCampaignById,
    getRandomCampaign
  }
}