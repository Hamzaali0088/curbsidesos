import { useRef } from "react";
import {
  Header,
  HeroSection,
  MobileBottomDropup,
  ServicesSection,
  TestimonialsSection,
  FastAssistanceSection,
  HowItWorksSection,
  FAQSection,
  ProviderCTASection,
  Footer,
} from "@/components/home";

export default function Home() {
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      <main>
        <HeroSection ref={heroRef} />
        <ServicesSection />
        <TestimonialsSection />
        <FastAssistanceSection />
        <HowItWorksSection />
        <FAQSection />
        <ProviderCTASection />
        <Footer />
      </main>
      <MobileBottomDropup heroRef={heroRef} />
    </div>
  );
}
