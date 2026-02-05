import Container from "@/components/common/Container";
import Heading2 from "@/components/common/Heading2";
import Paragraph from "@/components/common/Paragraph";
import ServiceIcon from "@/components/common/ServiceIcon";

const services = [
  { name: "Flat Tire", image: "/st-images/services/flat-tire.png" },
  { name: "Won't Start", image: "/st-images/services/won_t-start.png" },
  { name: "Locked Out", image: "/st-images/services/locked-out.png" },
  { name: "Out of Gas", image: "/st-images/services/out-of-gas.png" },
  { name: "Basic Tow", image: "/st-images/services/basic-tow.png" },
  { name: "Winch Out", image: "/st-images/services/winch-out.png" },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-16 lg:py-24 max-w-3xl mx-auto">
      <Container>
        <div className="text-center">
          <Heading2>
            We&apos;ll get you back on the road
          </Heading2>
          < Paragraph className="">
            Stranded? Need a tow? Locked out? If you&apos;ve got a problem, we
            can help.
          </Paragraph>
          <p className="mt-4 text-gray-900 font-bold">
            <span className="mr-1">🇺🇸</span> 1,300+ providers in all 50 states
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-2 gap-12 sm:grid-cols-3 sm:gap-16">
          {services.map(({ name, image }) => (
            <div key={name} className="flex flex-col items-center text-center">
              <ServiceIcon
                src={image}
                alt={name}
                size="lg"
                className="border-[3px]"
              />
              <span className="mt-4 text-base border border-primary px-4 py-2 rounded-lg  font-semibold uppercase tracking-wide text-primary">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
