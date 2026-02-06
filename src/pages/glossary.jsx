import Head from "next/head";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import InnerPageLayout from "@/components/common/InnerPageLayout";
import glossaryData from "@/data/glossary.json";

export default function GlossaryPage() {
  const { title, entries } = glossaryData;

  return (
    <>
      <Head>
        <title>Roadside Glossary | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <InnerPageLayout breadcrumbLabel="Glossary" rightCardVariant="help">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-base text-gray-700 sm:text-lg">
              Learn common terms you&apos;ll see when requesting roadside
              assistance or reviewing quotes from providers.
            </p>

            <dl className="mt-8 space-y-6">
              {entries.map(({ term, description }) => (
                <div
                  key={term}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <dt className="text-base font-semibold text-gray-900">
                    {term}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-gray-700">
                    {description}
                  </dd>
                </div>
              ))}
            </dl>
          </InnerPageLayout>
        </main>
        <Footer />
      </div>
    </>
  );
}

