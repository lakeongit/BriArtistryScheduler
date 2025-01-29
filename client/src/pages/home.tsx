import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Gallery from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import { Chatbot } from "@/components/ui/chatbot";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <Chatbot />
    </div>
  );
}
