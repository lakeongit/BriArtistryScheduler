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
    url: "/attached_assets/5f3c3f_0a8de2dd0d7148cdac8ba08bb4092652~mv2.avif",
    alt: "Elegant bridal makeup with natural glowing finish"
  },
  {
    url: "/attached_assets/5f3c3f_0ae9c8a047fd408cbc5a971b9ab66382~mv2.avif",
    alt: "Bridal hair styling with intricate details"
  },
  {
    url: "/attached_assets/5f3c3f_4d548c5a1ee9400c871efa9f7cadf88e~mv2.avif",
    alt: "Classic bridal updo with floral accessories"
  },
  {
    url: "/attached_assets/5f3c3f_6a4e3bab3d834cf8af3d1c470ceb5dd1~mv2.avif",
    alt: "Sophisticated bridal makeup look"
  },
  {
    url: "/attached_assets/5f3c3f_9da154c9ca2c4552b017bbf28d8fc340~mv2.avif",
    alt: "Romantic bridal hairstyle with soft waves"
  },
  {
    url: "/attached_assets/5f3c3f_829c4f98d6574cff8e25b33aba42d44b~mv2.avif",
    alt: "Modern bridal makeup with perfect skin finish"
  },
  {
    url: "/attached_assets/5f3c3f_64800fbd354b4c23ab4b2285661bb7dc~mv2.avif",
    alt: "Elegant bridal portrait showcasing makeup artistry"
  },
  {
    url: "/attached_assets/5f3c3f_a19f47d5ec62417f94ad3081368a81af~mv2.avif",
    alt: "Natural bridal beauty look"
  },
  {
    url: "/attached_assets/5f3c3f_e3550632100d4d2f9c3d6d89dfd7fd71~mv2.avif",
    alt: "Glamorous bridal makeup with dramatic eyes"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Bridal Gallery</h2>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <AspectRatio ratio={4/5}>
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                </AspectRatio>
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