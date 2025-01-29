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
    src: "/attached_assets/1.jpeg",
    alt: "Beautiful bridal styling and preparation"
  },
  {
    src: "/attached_assets/2.jpeg",
    alt: "Elegant bridal makeup session"
  },
  {
    src: "/attached_assets/3.jpeg",
    alt: "Professional bridal hair styling"
  },
  {
    src: "/attached_assets/4.jpeg",
    alt: "Sophisticated bridal beauty preparation"
  },
  {
    src: "/attached_assets/5.jpeg",
    alt: "Glamorous bridal makeup application"
  },
  {
    src: "/attached_assets/6.jpeg",
    alt: "Detailed bridal hair styling"
  },
  {
    src: "/attached_assets/7.jpeg",
    alt: "Professional bridal beauty service"
  },
  {
    src: "/attached_assets/9.jpeg",
    alt: "Elegant bridal styling session"
  },
  {
    src: "/attached_assets/10.jpeg",
    alt: "Complete bridal beauty transformation"
  }
];

export default function Gallery() {
  const [imgError, setImgError] = useState<{[key: string]: boolean}>({});

  const handleImageError = (index: number) => {
    setImgError(prev => ({...prev, [index]: true}));
    console.error(`Failed to load image at index ${index}`);
  };

  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Bridal Gallery</h2>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative overflow-hidden rounded-lg">
                  {!imgError[index] ? (
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-[600px] object-cover"
                      loading="lazy"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Image failed to load</p>
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