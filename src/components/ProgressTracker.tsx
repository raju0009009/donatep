import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Target, Users, TrendingUp, Clock, Home, AlertTriangle, Heart } from 'lucide-react'

const fundraisingData = {
  goal: 50000000, // ₹5 Crore
  raised: 32450000, // ₹3.25 Crore
  donors: 15234,
  daysLeft: 15
}

const impactStats = [
  { icon: Users, label: 'People Helped', value: '12,500+', color: 'text-primary', description: 'Lives impacted' },
  { icon: Home, label: 'Homes Rebuilt', value: '850+', color: 'text-primary', description: 'Families sheltered' },
  { icon: Target, label: 'Villages Reached', value: '45', color: 'text-primary', description: 'Communities served' },
  { icon: TrendingUp, label: 'Relief Camps', value: '28', color: 'text-primary', description: 'Active centers' }
]

const urgentNeeds = [
  { item: 'Emergency Medical Supplies', priority: 'Critical', progress: 65, icon: AlertTriangle },
  { item: 'Food & Clean Water', priority: 'Critical', progress: 45, icon: Heart },
  { item: 'Temporary Shelter', priority: 'High', progress: 80, icon: Home },
  { item: 'Rebuilding Materials', priority: 'Medium', progress: 30, icon: Target }
]

export default function ProgressTracker() {
  const progressPercentage = (fundraisingData.raised / fundraisingData.goal) * 100

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'destructive'
      case 'High': return 'secondary'
      case 'Medium': return 'outline'
      default: return 'outline'
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-muted via-muted to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Target className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Fundraising Progress
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your generosity is making a real difference in the lives of flood-affected families
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-background to-muted/30">
            <CardHeader className="space-y-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                Campaign Goal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-3xl font-bold text-primary">
                    ₹{(fundraisingData.raised / 10000000).toFixed(2)} Crore
                  </span>
                  <span className="text-lg text-muted-foreground">
                    of ₹{(fundraisingData.goal / 10000000).toFixed(2)} Crore
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-foreground">Progress</span>
                    <span className="font-bold text-primary">{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-4" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-lg font-bold text-foreground">{fundraisingData.daysLeft}</div>
                      <div className="text-xs text-muted-foreground">days left</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-lg font-bold text-foreground">{fundraisingData.donors.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">donors</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-gradient-to-br from-background to-muted/30">
            <CardHeader className="space-y-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                Urgent Needs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {urgentNeeds.map((need, index) => {
                  const Icon = need.icon
                  return (
                    <div key={index} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-primary" />
                          <span className="font-medium text-foreground">{need.item}</span>
                        </div>
                        <Badge variant={getPriorityVariant(need.priority)} className="text-xs">
                          {need.priority}
                        </Badge>
                      </div>
                      <Progress value={need.progress} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">
                        {need.progress}% fulfilled
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {impactStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="text-center shadow-lg border-0 bg-gradient-to-br from-background to-muted/20 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="pt-8 pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Every donation counts towards rebuilding lives
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}