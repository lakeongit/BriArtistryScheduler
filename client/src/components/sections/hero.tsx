import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1512207724313-a4e675ec79ab)',
          filter: 'brightness(0.3)'
        }} 
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Transform Your Look with BriArtistry
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Professional makeup and hair styling services for weddings, special events, 
            and everyday glamour.
          </p>
          <div className="flex gap-4">
            <Link href="/booking">
              <Button size="lg" className="text-lg">
                Book Now
              </Button>
            </Link>
            <Link href="/#services">
              <Button variant="outline" size="lg" className="text-lg text-white border-white hover:text-primary hover:bg-white">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
