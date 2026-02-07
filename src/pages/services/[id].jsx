import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Check } from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import InnerPageLayout from "@/components/common/InnerPageLayout";
import serviceDetailData from "@/data/service-detail.json";
import Paragraph from "@/components/common/Paragraph";

function getServiceDetail(serviceId) {
  const services = serviceDetailData?.services ?? {};
  return services[serviceId] ?? null;
}

export default function ServiceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const detail = id ? getServiceDetail(id) : null;

  if (router.isReady && id && !detail) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main className="flex min-h-[50vh] items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
            <Link href="/services" className="mt-4 inline-block text-primary hover:underline">
              Back to Roadside Assistance Services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!detail) {
    return null;
  }

  const { aboutCurbsideSos, emergencyResources } = serviceDetailData;
  const sections = detail.sections ?? [];

  const rightContent = (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm">
      <Link
        href={`/get-support?service=${detail.id}`}
        className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
      >
        Get help now
      </Link>
      <p className="mt-3 text-xs uppercase text-center tracking-wide text-gray-700">
        AMEX, Discover, Master Card, Visa accepted
      </p>
      <div className="mt-5 space-y-3 text-sm text-gray-800">
        {[
          "Providers are required to have insurance",
          "Available in all 50 states, most requests quoted in 3 minutes",
          "Choose the fastest or most affordable ",
          "Track your provider's ETA on map",
        ].map((text) => (
          <div key={text} className="flex items-start gap-2">
            <Check
              className="mt-0.5 h-4 min-w-4 shrink-0 text-black"
              strokeWidth={2.5}
              aria-hidden
            />
            <span className="font-medium">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>{detail.title} | Curbside SOS</title>
        <meta name="description" content={detail.intro?.[0] ?? detail.title} />
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <InnerPageLayout
            breadcrumbLabel={detail.name}
            breadcrumbMiddle="services"
            rightContent={rightContent}
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              {detail.heroImage && (
                <div className="relative mt-6 aspect-video w-full max-w-xs">
                  <Image
                    src={detail.heroImage}
                    alt={detail.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 1024px) 100vw, 73vw"
                    priority
                  />
                </div>
              )}
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                {detail.title}
              </h1>
            </div>


            {detail.intro?.length > 0 && (
              <div className="mt-8 space-y-4">
                {detail.intro.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-gray-700 sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}

            {sections.length > 0 && (
              <div className="mt-10 rounded-lg border border-gray-200 bg-gray-50/80 p-6">
                <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
                  In this article
                </p>
                <ul className="mt-3 list-none space-y-2">
                  {sections.map(({ id: sectionId, title }) => (
                    <li key={sectionId}>
                      <a
                        href={`#${sectionId}`}
                        className="text-base text-gray-700 hover:text-primary hover:underline"
                      >
                        {title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sections.length > 0 && (
              <div className="mt-12 space-y-10">
                {sections.map(({ id: sectionId, title, paragraphs }) => (
                  <section key={sectionId} id={sectionId} className="scroll-mt-24">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {title}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {paragraphs.map((text, i) => (
                        <p
                          key={i}
                          className="text-base leading-relaxed text-gray-700"
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {aboutCurbsideSos && (
              <section className="mt-16 ">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                  {aboutCurbsideSos.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-gray-700">
                  {aboutCurbsideSos.description}
                </p>
              </section>
            )}

            {emergencyResources?.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl  font-bold text-gray-900">
                  Emergency Automotive Assistance Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>


                    <div className="relative mx-auto mt-8 max-w-md aspect-4/3 w-full overflow-hidden">
                      <Image
                        src="/st-images/about.png"
                        alt="Roadside assistance services overview"
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 768px) 100vw, 42rem"
                      />
                    </div>
                    <ul className="mt-10 list-none space-y-8">
                      {emergencyResources?.slice(0, 3).map(({ serviceId, title, description }) => (
                        <li key={serviceId}>
                          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                          <Paragraph className="">
                            {description}
                          </Paragraph>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ul className="mt-10 list-none space-y-8">
                    {emergencyResources?.slice(3).map(({ serviceId, title, description }) => (
                      <li key={serviceId}>
                        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                        <Paragraph className="">
                          {description}
                        </Paragraph >
                      </li>
                    ))}
                  </ul>

                </div>

              </section>
            )}
          </InnerPageLayout>
        </main>
        <Footer />
      </div>
    </>
  );
}
