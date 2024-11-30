'use client'

import * as React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const slides = [
  {
    image: '/real2.png?height=600&width=1200',
    title: 'Invest in Real Estate',
    subtitle: '& start earning a passive rental income',
    description: 'Buy and invest in fractional properties from across the globe in stable economies, earn rent and become a financially smart landlord.'
  },
  {
    image: '/real3.png?height=600&width=1200',
    title: 'Global Properties',
    subtitle: '& diverse investment opportunities',
    description: 'Access premium real estate markets worldwide with our curated selection of high-potential properties.'
  },
  {
    image: '/real4.png?height=600&width=1200',
    title: 'Smart Investing',
    subtitle: '& professional portfolio management',
    description: 'Let our experts handle the complexities while you focus on growing your wealth through strategic real estate investments.'
  }
]

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = React.useState(0)
  
    const previousSlide = () => {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }
  
    React.useEffect(() => {
      const timer = setInterval(nextSlide, 5000)
      return () => clearInterval(timer)
    }, [])
  
    return (
      <div className="relative bg-[#0F0F20] h-[600px] w-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-transform duration-500 ease-in-out",
              index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white max-w-4xl mx-auto drop-shadow-xl">
                <span className="block">{slide.title}</span>
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200">
                  {slide.subtitle}
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-white max-w-2xl mx-auto drop-shadow-lg font-medium">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
  
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 text-white"
          onClick={previousSlide}
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
  
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
  
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                index === currentSlide ? "bg-white" : "bg-white/50"
              )}
              onClick={() => setCurrentSlide(index)}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }
  