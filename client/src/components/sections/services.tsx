import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Services() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="h-full transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold text-primary">${service.price}</p>
                    <p className="text-sm text-gray-500">{service.duration} minutes</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}