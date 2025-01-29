import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

interface Testimonial {
  id: number;
  content: string;
  customerName: string;
  photographer: string;
  image: string;
}

export default function Testimonials() {
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials?.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <Card className="border-0 shadow-none bg-transparent">
                  <CardContent className="grid md:grid-cols-2 gap-8 items-center p-6">
                    <div className="order-2 md:order-1">
                      <blockquote className="text-lg italic mb-6">
                        "{testimonial.content}"
                      </blockquote>
                      <div className="space-y-1">
                        <p className="font-semibold">{testimonial.customerName}</p>
                        <p className="text-sm text-gray-500">
                          Photographer - {testimonial.photographer}
                        </p>
                      </div>
                    </div>
                    <div className="order-1 md:order-2">
                      <img 
                        src={testimonial.image} 
                        alt={`${testimonial.customerName}'s testimonial`}
                        className="w-full h-[400px] object-cover rounded-lg"
                      />
                    </div>
                  </CardContent>
                </Card>
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