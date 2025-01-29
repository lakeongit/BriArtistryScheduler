import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Gallery from "@/components/sections/gallery";
import Testimonials from "@/components/sections/testimonials";
import { Chatbot } from "@/components/ui/chatbot";
import { FAQ } from "@/components/sections/faq";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Chatbot />
    </div>
  );
}