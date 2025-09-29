import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Punjab Flood Relief</h3>
            <p className="text-background/80 mb-4">
              United in compassion, working together to rebuild and restore hope for flood-affected communities across Punjab.
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Heart className="w-5 h-5" />
              <span>Every donation counts</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-background/80">
              <li><a href="#" className="hover:text-accent transition-colors">Donate Now</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Emergency Contacts</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Relief Camps</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">Impact Report</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <span>Emergency: 1077</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <span>relief@punjabfloodhelp.org</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Chandigarh, Punjab</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Official Partners</h4>
            <div className="space-y-2">
              <div className="text-background/80">
                <ExternalLink className="w-4 h-4 inline mr-2" />
                <span>Punjab Government</span>
              </div>
              <div className="text-background/80">
                <ExternalLink className="w-4 h-4 inline mr-2" />
                <span>NDMA</span>
              </div>
              <div className="text-background/80">
                <ExternalLink className="w-4 h-4 inline mr-2" />
                <span>Indian Red Cross</span>
              </div>
              <div className="text-background/80">
                <ExternalLink className="w-4 h-4 inline mr-2" />
                <span>Local NGOs</span>
              </div>
            </div>
          </div>
        </div>

        <Card className="bg-foreground/90 border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-background/80 mb-2">
                  This is a genuine relief effort. All donations are tax-exempt under section 80G.
                </p>
                <p className="text-sm text-background/60">
                  Government Registration No: PBF/2024/RELIEF/001
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-background/60">Verified by</p>
                  <p className="text-accent font-semibold">Punjab Disaster Management</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="border-t border-border mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 Punjab Flood Relief Fund. All rights reserved. |
            <a href="#" className="hover:text-accent mx-2">Privacy Policy</a> |
            <a href="#" className="hover:text-accent mx-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  )
}