import React from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from 'lucide-react'
import { CheckCircle, XCircle } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface AcceptCardProps {
  id: string,
  images: string[];
  title: string;
  location: string;
  tokenPrice: number;
  apy: number;
  onApprove: (id: string) => void
  onDeny: (id: string) => void
}

export default function AcceptCard({
  id,
  images,
  title,
  location,
  tokenPrice,
  apy,
  onApprove,
  onDeny
}: AcceptCardProps) {
  return (
    <Card
      className={`
        w-[400px]
        overflow-hidden
        bg-zinc-900
        text-white
      `}
    >
      <CardContent className="p-0 relative">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-[4/3]">
                  <img
                    src={src}
                    alt={`Property image ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </CardContent>
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="flex items-center gap-2 text-zinc-400">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-zinc-400 text-sm">Token Price</div>
            <div className="text-2xl font-bold">${tokenPrice}</div>
          </div>
          <div className="text-right">
            <div className="text-zinc-400 text-sm">APY</div>
            <div className="text-xl font-semibold text-purple-400">{apy}%</div>
          </div>
        </div>
      </div>
      <CardFooter className="flex justify-center space-x-4">
        <Button 
          onClick={() => onDeny(id)} 
          className="bg-red-600 hover:bg-red-700 text-white"
          size="sm"
        >
          <XCircle className="mr-2 h-4 w-4" />
          Deny
        </Button>
        <Button 
          onClick={() => onApprove(id)} 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve
        </Button>
      </CardFooter>
    </Card>
  )
}