import Image from "next/image";
import Container from "@/components/common/Container";
import Paragraph from "@/components/common/Paragraph";

const steps = [
  {
    title: "Tell us where you are",
    description:
      "Share your location and we'll match you with licensed, trusted providers nearby.",
    image: "/st-images/howisitwork/1.png",
  },
  {
    title: "Report the situation",
    description:
      "Tell us what's wrong with your vehicle, and we'll deliver quotes and ETAs in 3 minutes or less.",
    image: "/st-images/howisitwork/2.png",
  },
  {
    title: "Get assistance ASAP",
    description:
      "Your roadside assistance provider will be there in as soon as 30 minutes, on average.",
    image: "/st-images/howisitwork/3.png",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container className="!max-w-[1000px]">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            No matter where you are, with Curbside SOS reliable help is nearby.
          </p>
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-3">
          {steps.map(({ title, description, image }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="relative w-full max-w-[230px] aspect-[9/11] overflow-hidden border-b border-gray-200 ">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain border-b border-gray-200"
                />
              </div>
              <h3 className="mt-6  text-gray-900 font-bold text-md md:text-lg">{title}</h3>
              <Paragraph className="">{description}</Paragraph>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
