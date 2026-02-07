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
      "Assign tow operators digitally in seconds, while maintaining a tow rotation.",
  },
  {
    title: "Accurate tracking history",
    description:
      "Search and review every detail on every job, including photos.",
  },
  {
    title: "Real-time tracking",
    description: "See up-to-date progress at a glance.",
  },
  {
    title: "Field dispatches",
    description:
      "Officers on site can dispatch and monitor tows with ease.",
  },
];

const YOUTUBE_VIDEO_ID = "iXJprEuQ5qg";

export default function Page911() {
  return (
    <>
      <Head>
        <title>911 | Curbside SOS</title>
        <meta name="description" content="Fast, transparent 911 dispatches. Get stranded vehicles off the road faster, with Curbside SOS." />
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <Banner
            breadcrumbLabel="911"
            title="911"
            subtitle="Fast, transparent 911 dispatches"
            description="Get stranded vehicles off the road faster, with Curbside SOS."
            ctaLabel="Get started"
            ctaHref="/contact"
            imageSrc="/st-images/911.png"
            imageAlt="911 dispatch - police and tow illustration"
          />

          <Container className="py-8">
            {/* Features */}
            <section className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-24">
              {FEATURES.map(({ title, description }) => (
                <div key={title} className="border-b border-gray-200 pb-6 last:border-0 sm:pb-0 sm:border-b-0">
                  <h3 className="text-lg font-bold text-primary">{title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-gray-700">
                    {description}
                  </p>
                </div>
              ))}
            </section>

            <div className="mt-10 flex justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
              >
                Get started
              </Link>
            </div>

            {/* Video */}
            <section className="mt-16 lg:mt-24">
              <div className="relative w-full overflow-hidden rounded-xl max-w-[700px] mx-auto bg-black shadow-lg" style={{ aspectRatio: "16/9" }}>
                <iframe
                  title="Dispatch to Local Tow Companies with Curbside SOS"
                  src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <h3 className="mt-6 text-center text-xl font-bold text-gray-900">
                Dispatch to Local Tow Companies with Curbside SOS
              </h3>
            </section>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
