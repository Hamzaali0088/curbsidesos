import Image from "next/image";
import Container from "@/components/common/Container";
import Paragraph from "@/components/common/Paragraph";
import Heading2 from "@/components/common/Heading2";

export default function ProviderCTASection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative flex justify-center">
            <div className="relative w-full border-b border-gray-300 max-w-[320px] aspect-square overflow-hidden ">
              <Image
                src="/st-images/CTA.png"
                alt="Curbside SOS provider app"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <div className="text-center flex flex-col items-center">
            <Heading2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Are you a roadside assistance provider?
            </Heading2>
            <Paragraph className="pt-4">
              Download the Curbside SOS app and join our network today.
            </Paragraph>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <a
                href="https://apps.apple.com/us/app/curbside-sos/id1480296390"
                className="inline-block transition-opacity hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Download on the App Store"
              >
                <Image
                  src="/st-images/Downloadontheappstore.png"
                  alt="Download on the App Store"
                  width={160}
                  height={52}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.koombea.curbsidesos&hl=en_US"
                className="inline-block transition-opacity hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/st-images/Downloadonthegooglepay.png"
                  alt="Get it on Google Play"
                  width={160}
                  height={52}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
