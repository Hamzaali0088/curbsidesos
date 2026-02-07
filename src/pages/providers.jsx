import Head from "next/head";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Container from "@/components/common/Container";
import Banner from "@/components/common/Banner";

const FEATURES = [
  {
    title: "No phone calls needed",
    description:
      "Get tow requests digitally, and share details with tow drivers with just one click",
  },
  {
    title: "Clear, accurate job details",
    description:
      "See a digital log of everything from vehicle issue to location directions",
  },
  {
    title: "Photo uploads",
    description:
      "Protect liability with on-site photos, attached to each tow job",
  },
  {
    title: "Real-time tracking",
    description:
      "Follow drivers en route, and get data on response time to reduce inaccurate perception",
  },
  {
    title: "Updatable active driver list",
    description:
      "Add and delete drivers, dispatchers, and more—you control it on your end",
  },
  {
    title: "Complete 911 history",
    description:
      "Search, categorize, and review all 911 jobs, including police case #, officer name, and dept",
  },
];

const YOUTUBE_VIDEO_ID = "KSzbzcCezY0";

export default function ProvidersPage() {
  return (
    <>
      <Head>
        <title>Service Providers | Curbside SOS</title>
        <meta
          name="description"
          content="Efficient police dispatches. Get more tow and roadside service jobs, with less busy work."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <Banner
            breadcrumbLabel="Service Providers"
            title="Service Providers"
            subtitle="Efficient police dispatches"
            description="Get more tow and roadside service jobs, with less busy work."
            ctaLabel="Get started"
            ctaHref="/contact"
            imageSrc="/st-images/service-provider.png"
            imageAlt="Tow truck and roadside service illustration"
          />

          <Container className="py-8">
            {/* Features */}
            <section className="mt-16 grid gap-8 sm:grid-cols-3 lg:mt-24">
              {FEATURES.map(({ title, description }) => (
                <div
                  key={title}
                  className="border-b border-gray-200 pb-6 last:border-0 sm:border-b-0 sm:pb-0"
                >
                  <h3 className="text-lg font-bold text-primary">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-700">
                    {description}
                  </p>
                </div>
              ))}
            </section>

            {/* Video */}
            <section className="mt-16 lg:mt-24">
              <div
                className="relative w-full overflow-hidden rounded-xl max-w-[700px] mx-auto bg-black shadow-lg"
                style={{ aspectRatio: "16/9" }}
              >
                <iframe
                  title="How to accept a job from 911 Dispatch on a computer desktop"
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <h3 className="mt-6 text-center text-xl font-bold text-gray-900">
                How to accept a job from 911 Dispatch on a computer desktop
              </h3>
            </section>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
