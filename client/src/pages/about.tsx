import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background py-16 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">About BriArtistry</h1>
          
          <div className="space-y-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Our Artistry</h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  At BriArtistry, we transform bridal beauty into an art form. Our passion lies in crafting 
                  sophisticated, personalized looks that celebrate your unique style and natural beauty. 
                  Through our mastery of airbrush makeup techniques, we create flawless, long-lasting finishes 
                  that capture the perfect balance between timeless elegance and contemporary charm.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Each bride's journey with us is as unique as their love story. From the moment of our first 
                  consultation to the final touches on your wedding day, our dedicated team of artists works 
                  to bring your vision to life, ensuring you radiate confidence and joy throughout your celebration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Our Expertise</h2>
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  We specialize in advanced airbrush makeup techniques and customized skincare treatments, 
                  ensuring that every bride receives a tailored beauty experience. Our comprehensive services 
                  are designed to enhance your natural features while providing the longevity and durability 
                  needed for your special day, from the first look to the last dance.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Our commitment to excellence extends beyond makeup application. We offer personalized 
                  skincare consultations and treatment plans, helping you achieve that perfect bridal glow 
                  from within.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-primary mb-4">Your Journey With Us</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Initial Consultation</h3>
                    <p className="text-gray-700">
                      Begin your journey by submitting our detailed wedding inquiry form, allowing us to 
                      understand your vision and requirements. We'll review your information and reach out 
                      to discuss your unique needs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Securing Your Date</h3>
                    <p className="text-gray-700">
                      Once we align on your vision, we'll guide you through our booking process, including 
                      deposit submission to secure your wedding date. This ensures our dedicated attention 
                      to your special day.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Beauty Consultation</h3>
                    <p className="text-gray-700">
                      Following your booking, we'll schedule an in-depth consultation to discuss your 
                      preferences, conduct trials, and create your perfect bridal look. This collaborative 
                      process ensures a stress-free and enjoyable experience leading up to your wedding.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center mt-12"
            >
              <p className="text-lg text-gray-700">
                We invite you to explore our bridal gallery and connect with us to begin your 
                journey to radiant bridal beauty. Let BriArtistry be part of transforming your 
                wedding day dreams into stunning reality.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
