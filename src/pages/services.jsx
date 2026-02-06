import Head from "next/head";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import InnerPageLayout from "@/components/common/InnerPageLayout";
import ServiceIcon from "@/components/common/ServiceIcon";
import servicesData from "@/data/services.json";

const services = servicesData.services || [];

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>All Roadside Services | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <InnerPageLayout breadcrumbLabel="All Roadside Services" rightCardVariant="help">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              All Roadside Services
            </h1>
            <p className="mt-3 text-base text-gray-700 sm:text-lg">
              Explore the roadside assistance services available through the
              Curbside SOS network.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {services.map(({ id, name, description, icon }) => (
                <div
                  key={id}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                >
                  <ServiceIcon src={icon} alt={name} size="md" />
                  <div>
                    <h2 className="text-base font-bold text-gray-900">{name}</h2>
                    {description && (
                      <p className="mt-1 text-sm leading-relaxed text-gray-700">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </InnerPageLayout>
        </main>
        <Footer />
      </div>
    </>
  );
}

