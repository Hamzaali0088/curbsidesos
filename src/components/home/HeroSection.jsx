import { forwardRef } from "react";
import Link from "next/link";
import Container from "@/components/common/Container";

const HeroSection = forwardRef(function HeroSection(_, ref) {
  return (
    <section
      ref={ref}
      className="relative overflow-hidden max-h-[500px] bg-white py-8 md:py-20 lg:py-28"
    >
      {/* Hero background from public/st-images/background (SVG built from path) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.02]"
        style={{
          backgroundImage: "url('/st-images/background.svg')",
        }}
      />
      <Container className="relative">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-[40px] font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-[54px]">
            Reliable roadside 
            <span className="relative inline-block">
              <span>assistance—fast</span>
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 sm:text-xl">
            Get quotes with ETAs from local insured providers—in three minutes or
            less.
          </p>
          <div className="mt-10">
            <Link
              href="/rescue"
              className="inline-block rounded-lg bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-colors hover:bg-secondary"
            >
              Get Help Now
            </Link>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            No membership necessary. Pay only for services you receive.
          </p>
        </div>
      </Container>
    </section>
  );
});

export default HeroSection;
