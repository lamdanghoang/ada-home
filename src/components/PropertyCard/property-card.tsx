import React from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Ban } from 'lucide-react'
import {   
  Carousel,   
  CarouselContent,   
  CarouselItem,   
  CarouselNext,   
  CarouselPrevious, 
} from "@/components/ui/carousel"
import { useRouter } from 'next/navigation'

interface PropertyCardProps {
  images: string[];
  title: string;
  location: string;
  tokenPrice: number;
  apy: number;
  status: 'available' | 'sold';
}

export default function PropertyCard({ 
  images, 
  title, 
  location, 
  tokenPrice, 
  apy, 
  status = 'available' 
}: PropertyCardProps) {
  const isDisabled = status === 'sold';
  const router = useRouter();

  return (
    <Card 
      className={`
        w-[400px] 
        overflow-hidden 
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-zinc-900'} 
        text-white
      `}
    >
      <CardContent className="p-0 relative">
        {isDisabled && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
            <div className="flex items-center bg-red-500 text-white px-4 py-2 rounded">
              <Ban className="mr-2" />
              Sold
            </div>
          </div>
        )}
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
      <CardFooter className="p-6 pt-0">
        <Button 
          disabled={isDisabled}
          className={`
            w-full 
            ${isDisabled 
              ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' 
              : 'bg-purple-500 hover:bg-purple-600'
            } 
            text-white
          `}
          onClick={() => router.push('/detail')}
        >
          {isDisabled ? 'Sold Out' : 'View Details'}
        </Button>
      </CardFooter>
    </Card>
  )
}