import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1512207724313-a4e675ec79ab';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative min-h-[80vh] flex items-center">
      {!imageLoaded ? (
        <div className="absolute inset-0 bg-gray-200">
          <Skeleton className="w-full h-full" />
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1512207724313-a4e675ec79ab?auto=format&q=80)',
            filter: 'brightness(0.4)',
            opacity: imageLoaded ? 1 : 0
          }} 
        />
      )}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your Look with BriArtistry
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-200 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Professional makeup and hair styling services for weddings, special events, 
            and everyday glamour.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/booking">
              <Button 
                size="lg" 
                className="text-lg w-full sm:w-auto hover:opacity-90 transition-all duration-200 shadow-lg"
                aria-label="Book an appointment now"
              >
                Book Now
              </Button>
            </Link>
            <Link href="/#services">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg w-full sm:w-auto text-white border-white hover:text-primary hover:bg-white transition-all duration-200"
                aria-label="View our services"
              >
                View Services
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}