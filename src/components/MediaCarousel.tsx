'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Autoplay from 'embla-carousel-autoplay'

export default function MediaCarousel() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Punjab Flood Crisis
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Witness the devastating impact of the floods and join us in providing relief to affected communities.
          </p>
        </div>

        {/* Images Carousel - Single image with auto-rotation */}
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Flood Impact Gallery</h3>
          <Carousel
            opts={{
              align: "center",
              loop: true
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              })
            ]}
            className="w-full max-w-2xl mx-auto [&_[data-slot=carousel-item]]:pl-0"
          >
            <CarouselContent>
              <CarouselItem key="flood1">
                <Card className="border-2 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src="/flood1.png"
                        alt="Punjab Flood Impact 1"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem key="flood2">
                <Card className="border-2 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src="/flood1.png"
                        alt="Punjab Flood Relief Efforts"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem key="flood3">
                <Card className="border-2 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src="/flood1.png"
                        alt="Punjab Community Support"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </AspectRatio>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
          
        </div>

        {/* YouTube Video Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">Relief Efforts Video</h3>
          <Card className="border-2 shadow-lg">
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src="https://www.youtube.com/embed/giW3VF70hqs"
                  title="Punjab Flood Relief Video"
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Watch our flood relief efforts and see how your donations help
          </p>
        </div>
      </div>
    </section>
  )
}