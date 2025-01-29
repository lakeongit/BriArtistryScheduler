import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

const images = [
  {
    src: "/images/1.jpg",
    alt: "Beautiful bridal styling and preparation"
  },
  {
    src: "/images/2.jpg",
    alt: "Elegant bridal makeup session"
  },
  {
    src: "/images/3.jpg",
    alt: "Professional bridal hair styling"
  },
  {
    src: "/images/4.jpg",
    alt: "Sophisticated bridal beauty preparation"
  },
  {
    src: "/images/5.jpg",
    alt: "Glamorous bridal makeup application"
  },
  {
    src: "/images/6.jpg",
    alt: "Detailed bridal hair styling"
  },
  {
    src: "/images/7.jpg",
    alt: "Professional bridal beauty service"
  },
  {
    src: "/images/9.jpg",
    alt: "Elegant bridal styling session"
  },
  {
    src: "/images/10.jpg",
    alt: "Complete bridal beauty transformation"
  }
];

export default function Gallery() {
  const [imgError, setImgError] = useState<{[key: string]: boolean}>({});

  const handleImageError = (index: number) => {
    setImgError(prev => ({...prev, [index]: true}));
    console.error(`Failed to load image at index ${index}, path: ${images[index].src}`);
  };

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Bridal Gallery</h2>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  {!imgError[index] ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-[600px] object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-500">Image temporarily unavailable</p>
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}