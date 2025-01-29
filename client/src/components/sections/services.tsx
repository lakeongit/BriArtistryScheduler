import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export default function Services() {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const toggleServiceSelection = (service: Service) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(prev => prev.filter(s => s.id !== service.id));
    } else if (selectedServices.length < 3) {
      setSelectedServices(prev => [...prev, service]);
    }
  };

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
        <motion.div 
          className="flex flex-col items-center justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
          {selectedServices.length > 0 && (
            <Button
              onClick={() => setCompareModalOpen(true)}
              variant="outline"
              className="mt-4"
            >
              Compare Selected Services ({selectedServices.length})
            </Button>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card 
                className={`h-full transform hover:scale-[1.02] transition-all duration-300 hover:shadow-lg cursor-pointer ${
                  selectedServices.find(s => s.id === service.id) ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => toggleServiceSelection(service)}
              >
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

        <Dialog open={compareModalOpen} onOpenChange={setCompareModalOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Service Comparison</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {selectedServices.map(service => (
                <div key={service.id} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold text-primary">${service.price}</p>
                    <p className="text-sm text-gray-500">{service.duration} minutes</p>
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}