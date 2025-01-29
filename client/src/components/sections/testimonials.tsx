import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Testimonial {
  id: number;
  customerName: string;
  content: string;
  photographerName?: string;
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

        <Carousel className="max-w-4xl mx-auto" opts={{ align: "center" }}>
          <CarouselContent>
            {testimonials?.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className="bg-white rounded-none p-8 mx-auto max-w-3xl">
                  <blockquote>
                    <p className="text-lg italic font-serif text-gray-700 mb-6">
                      "{testimonial.content}"
                    </p>
                    <footer className="text-sm text-gray-600 mt-4">
                      <div className="flex flex-col items-start gap-1">
                        <cite className="not-italic">
                          {testimonial.customerName} - Bride
                        </cite>
                        {testimonial.photographerName && (
                          <span className="text-sm">
                            Photographer - {testimonial.photographerName}
                          </span>
                        )}
                      </div>
                    </footer>
                  </blockquote>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === 0 ? "bg-gray-800" : "bg-gray-300"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </section>
  );
}