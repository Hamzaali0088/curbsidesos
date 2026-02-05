import {
  Header,
  HeroSection,
  ServicesSection,
  TestimonialsSection,
  FastAssistanceSection,
  HowItWorksSection,
  FAQSection,
  ProviderCTASection,
  Footer,
} from "@/components/home";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <FastAssistanceSection />
        <HowItWorksSection />
        <FAQSection />
        <ProviderCTASection />
        <Footer />
      </main>
    </div>
  );
}
