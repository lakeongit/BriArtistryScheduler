import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export const FAQ = () => {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Find answers to common questions about our beauty services
          </p>
        </div>
        <div className="mx-auto max-w-3xl mt-8 md:mt-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="booking-process">
              <AccordionTrigger>What is the booking process?</AccordionTrigger>
              <AccordionContent>
                Our booking process begins with the submission of our wedding inquiry form, where you provide detailed information about your wedding. Once we receive your inquiry, securing your date is the next step. This involves submitting a deposit to confirm our services for your special day. Following that, we schedule a consultation to discuss your preferences, ensuring a tailored and stress-free experience leading up to your wedding.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="time-needed">
              <AccordionTrigger>How Long Will You Need on the Day?</AccordionTrigger>
              <AccordionContent>
                Typically, our wedding makeup applications take approximately 30-40 minutes per person. We structure this timeframe thoughtfully within a schedule that aligns with your hairstylist's plans and accommodates your desired completion time. This approach ensures a smooth and enjoyable beauty preparation on your wedding day.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="consultation">
              <AccordionTrigger>I'm interested in scheduling a consult or bridal preview. What is that process?</AccordionTrigger>
              <AccordionContent>
                While our standard practice is to book consultations or bridal previews three months before the wedding day, we're more than happy to accommodate earlier requests. If you prefer an earlier consultation or a phone call, simply let us know, and we'll arrange it according to your convenience.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
