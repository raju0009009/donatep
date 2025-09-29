'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Phone,
  MapPin,
  AlertTriangle,
  Heart,
  Home,
  Droplets,
  Soup,
  Users,
  Shield,
  Truck,
  Clock,
  Activity
} from 'lucide-react'

const emergencyContacts = [
  { name: 'Emergency Helpline', number: '1077', description: '24/7 Flood Emergency', icon: AlertTriangle },
  { name: 'Medical Emergency', number: '108', description: 'Ambulance Service', icon: Activity },
  { name: 'Disaster Management', number: '011-26701700', description: 'NDMA Control Room', icon: Shield },
  { name: 'Relief Coordinator', number: '+91-9810856789', description: 'Punjab Relief Team', icon: Phone }
]

const reliefCamps = [
  {
    name: 'Amritsar Relief Camp',
    location: 'Guru Nanak Dev University',
    capacity: '500 families',
    status: 'Active',
    available: 125,
    coordinates: '31.63°N, 74.87°E'
  },
  {
    name: 'Ludhiana Emergency Center',
    location: 'Punjab Agricultural University',
    capacity: '300 families',
    status: 'Active',
    available: 45,
    coordinates: '30.90°N, 75.85°E'
  },
  {
    name: 'Jalandhar Shelter',
    location: 'Devi Talab Mandir Complex',
    capacity: '200 families',
    status: 'Full Capacity',
    available: 0,
    coordinates: '31.32°N, 75.58°E'
  },
  {
    name: 'Patiala Relief Camp',
    location: 'Punjabi University Grounds',
    capacity: '400 families',
    status: 'Active',
    available: 180,
    coordinates: '30.34°N, 76.38°E'
  }
]

const urgentNeeds = [
  { icon: Droplets, label: 'Clean Water', priority: 'Critical', progress: 25, description: 'Water purification systems needed' },
  { icon: Soup, label: 'Food Supplies', priority: 'Critical', progress: 40, description: 'Non-perishable food items' },
  { icon: Heart, label: 'Medical Aid', priority: 'High', progress: 60, description: 'Emergency medical kits' },
  { icon: Home, label: 'Shelter Materials', priority: 'High', progress: 70, description: 'Temporary housing solutions' },
  { icon: Shield, label: 'Safety Equipment', priority: 'Medium', progress: 85, description: 'Protective gear and tools' },
  { icon: Users, label: 'Volunteers', priority: 'Medium', progress: 55, description: 'Medical and support staff' }
]

export default function EmergencyInfo() {
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'destructive'
      case 'High': return 'secondary'
      case 'Medium': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default'
      case 'Full Capacity': return 'destructive'
      case 'Limited': return 'secondary'
      default: return 'outline'
    }
  }

  const handleEmergencyCall = (number: string) => {
    window.open(`tel:${number}`, '_self')
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive/10 rounded-full">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Emergency Information
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Critical contacts and resources for flood-affected communities across Punjab
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="space-y-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <Phone className="w-6 h-6 text-destructive" />
                  </div>
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {emergencyContacts.map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <div key={index} className="p-4 bg-destructive/5 rounded-lg border border-destructive/20 hover:bg-destructive/10 transition-all duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-destructive" />
                          <div>
                            <h4 className="font-semibold text-foreground">{contact.name}</h4>
                            <p className="text-sm text-muted-foreground">{contact.description}</p>
                          </div>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-lg font-bold text-destructive">{contact.number}</p>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-xs"
                            onClick={() => handleEmergencyCall(contact.number)}
                          >
                            <Phone className="w-3 h-3 mr-1" />
                            Call Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0 bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="space-y-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  Relief Camps & Shelters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {reliefCamps.map((camp, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-background to-muted/20 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-foreground">{camp.name}</h4>
                        <Badge variant={getStatusVariant(camp.status)} className="text-xs">
                          {camp.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {camp.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span>Capacity: {camp.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Home className="w-4 h-4" />
                          <span>Available: {camp.available} spots</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{camp.coordinates}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Occupancy Rate</span>
                          <span className="text-xs font-medium text-foreground">
                            {Math.round(((parseInt(camp.capacity) - camp.available) / parseInt(camp.capacity)) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-gradient-to-br from-background to-muted/30">
          <CardHeader className="space-y-4">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-primary/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-primary" />
              </div>
              Urgent Needs & How to Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {urgentNeeds.map((need, index) => {
                const Icon = need.icon
                return (
                  <div key={index} className="text-center p-6 border rounded-lg bg-gradient-to-br from-background to-muted/20 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-full">
                        <Icon className={`w-8 h-8 ${need.priority === 'Critical' ? 'text-destructive' : 'text-primary'}`} />
                      </div>
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{need.label}</h4>
                    <Badge variant={getPriorityVariant(need.priority)} className="mb-3">
                      {need.priority}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-4">
                      {need.description}
                    </p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          need.priority === 'Critical' ? 'bg-destructive' :
                          need.priority === 'High' ? 'bg-secondary' : 'bg-primary'
                        }`}
                        style={{ width: `${need.progress}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {need.progress}% fulfilled
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Immediate Actions
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Donate to emergency relief funds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Volunteer at local relief centers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Share emergency contact information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Provide transportation for supplies</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-secondary-foreground" />
                  Support Resources
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Food and water supplies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Medical equipment and medicines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Clothing and blankets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-muted-foreground">Temporary shelter materials</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}