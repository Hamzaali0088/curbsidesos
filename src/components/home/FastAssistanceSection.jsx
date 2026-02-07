import Image from "next/image";
import Container from "@/components/common/Container";
import Heading2 from "../common/Heading2";

const steps = [
  {
    number: 1,
    title: "Dependable, professional help",
    description:
      "Requests are sent to nearby licensed service providers in our network, giving you an added layer of trust.",
  },
  {
    number: 2,
    title: "Transparency in price and wait time",
    description:
      "In a hurry? Choose the provider with the shortest ETA. On a budget? Pick the most reasonable quote. Roadside assistance, on your terms.",
  },
  {
    number: 3,
    title: "No-hassle payment",
    description:
      "Payment is easy and secure with Curbside SOS.",
  },
];

export default function FastAssistanceSection() {
  return (
    <section className="bg-[#FAFAFA] py-16 lg:py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/st-images/FirstAssistance.png"
              alt="Roadside assistance - customer and technician with vehicles"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <Heading2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Fast, trustworthy assistance
            </Heading2>
            <p className="mt-4 text-lg text-gray-600">
              With Curbside SOS, you&apos;re never stuck for long.
            </p>
            <ul className="mt-10 space-y-8">
              {steps.map(({ number, title, description }) => (
                <li key={number} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-white">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{title}</h3>
                    <p className="mt-1 text-gray-600">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
