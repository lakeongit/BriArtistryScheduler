import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const images = [
  {
    url: "https://images.unsplash.com/photo-1512207724313-a4e675ec79ab",
    alt: "Makeup artist working"
  },
  {
    url: "https://images.unsplash.com/photo-1533562389935-457b1ae48a39",
    alt: "Professional makeup application"
  },
  {
    url: "https://images.unsplash.com/photo-1489924124654-85017dad789d",
    alt: "Wedding makeup"
  },
  {
    url: "https://images.unsplash.com/photo-1487412912498-0447578fcca8",
    alt: "Bridal hair styling"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Work</h2>
        
        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <AspectRatio ratio={16/9}>
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </AspectRatio>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
