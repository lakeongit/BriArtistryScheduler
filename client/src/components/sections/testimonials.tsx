import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  id: number;
  customerName: string;
  content: string;
  date: string;
}

export default function Testimonials() {
  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Client Testimonials</h2>

        <Carousel className="max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials?.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="bg-white rounded-lg shadow p-8">
                  <blockquote>
                    <p className="text-lg italic text-gray-700 mb-4">
                      "{testimonial.content}"
                    </p>
                    <footer className="text-sm text-gray-600">
                      <cite className="font-semibold not-italic">
                        {testimonial.customerName}
                      </cite>
                    </footer>
                  </blockquote>
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