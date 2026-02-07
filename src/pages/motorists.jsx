import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Container from "@/components/common/Container";
import Banner from "@/components/common/Banner";
import ServiceIcon from "@/components/common/ServiceIcon";

const SERVICES = [
  { id: "flat-tire", name: "Flat tire", icon: "/st-images/services/flat-tire.png" },
  { id: "wont-start", name: "Won't start", icon: "/st-images/services/won_t-start.png" },
  { id: "locked-out", name: "Locked out", icon: "/st-images/services/locked-out.png" },
  { id: "out-of-gas", name: "Out of gas", icon: "/st-images/services/out-of-gas.png" },
  { id: "basic-tow", name: "Basic tow", icon: "/st-images/services/basic-tow.png" },
  { id: "winch-out", name: "Stuck", icon: "/st-images/services/winch-out.png" },
];

export default function MotoristsPage() {
  return (
    <>
      <Head>
        <title>Motorists | Curbside SOS</title>
        <meta
          name="description"
          content="Get roadside help in minutes not hours. Pick from all roadside assistance near you, then order, track, and pay online."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <Banner
            breadcrumbLabel="Motorists"
            title="Motorists"
            subtitle="Get roadside help in minutes not hours."
            description="Pick from all roadside assistance near you, then order, track, and pay online."
            ctaLabel="Get help now"
            ctaHref="/get-support"
            imageSrc="/st-images/motorists1.png"
            imageAlt="Roadside assistance technician"
            imageVariant="circle"
            wrapperClassName="bg-gray-50"
          />

          <Container>
            {/* Get rescued the modern way */}
            <section className="mt-20 flex flex-row gap-10 lg:items-center lg:gap-16">
              <div className="flex justify-center lg:justify-end">
                <div className="relative h-56 w-56  sm:h-80 sm:w-80">
                  <Image
                    src="/st-images/motorists2.png"
                    alt="Roadside assistance technician"
                    fill
                    className="object-contain p-6"
                    sizes="(max-width: 1200px) 320px, 384px"
                    priority
                  />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Get rescued the modern way, with ease, transparency, and
                  control.
                </h2>
                <p className="mt-6 text-lg font-semibold text-primary">
                  You don&apos;t need to wait hours or guess when help will
                  arrive.
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  We help you get roadside assistance in the fastest and most
                  reliable way possible. See prices and times from all tow
                  trucks near you with one click, and pick the best option for
                  you. Help will be on the way in minutes, for the fastest tow
                  around.
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  Track your tow truck driver on a map with real-time updates and
                  accurate ETAs until you see help arrive in your rearview
                  mirror. Pay securely online.
                </p>
                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  For roadside assistance when you have a flat tire, are out of
                  gas or locked out, or need a tow to a mechanic near you,
                  nothing is easier or quicker than Curbside SOS.
                </p>
              </div>
            </section>

            {/* Service icons */}
            <section className="mt-20  pb-16 ">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {SERVICES.map(({ id, name, icon }) => (
                  <Link
                    key={id}
                    href={`/get-support?service=${id}`}
                    className="flex flex-col items-center text-center transition-opacity hover:opacity-90"
                  >
                    <ServiceIcon
                      src={icon}
                      alt={name}
                      size="md"
                      className="border-2 border-gray-200"
                    />
                    <span className="mt-3 text-xs font-bold uppercase tracking-wide text-gray-800">
                      {name}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
