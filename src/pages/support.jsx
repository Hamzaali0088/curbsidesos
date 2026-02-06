import Head from "next/head";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import InnerPageLayout from "@/components/common/InnerPageLayout";

const knowledgeBaseLinks = [
  {
    category: "Curbside SOS Dispatch on mobile:",
    links: [
      {
        label: "How to save Curbside SOS Dispatch to your home screen (Android)",
        href: "/kb/save-to-home-android",
      },
      {
        label: "How to save Curbside SOS Dispatch to your home screen (iPhone)",
        href: "/kb/save-to-home-iphone",
      },
    ],
  },
  {
    category: "Managing Dispatch on the Curbside SOS platform:",
    links: [
      {
        label: "How to re-assign a driver",
        href: "/kb/reassign-driver",
      },
    ],
  },
];

export default function Support() {
  return (
    <>
      <Head>
        <title>Support | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <InnerPageLayout breadcrumbLabel="Support" rightCardVariant="contact">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Support
            </h1>

            {/* Knowledge Base Section */}
            <div className="mt-8">
              {knowledgeBaseLinks.map(({ category, links }) => (
                <div key={category} className="mb-8">
                  <p className="text-base font-bold text-gray-900 sm:text-lg">
                    {category}
                  </p>
                  <ul className="mt-4 list-disc space-y-2 pl-5">
                    {links.map(({ label, href }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-primary hover:text-secondary hover:underline"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* About Curbside SOS Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                About Curbside SOS
              </h2>
              <p className="mt-4 leading-relaxed text-gray-700">
                Curbside SOS is an open marketplace for roadside assistance and
                towing. We connect motorists in need with licensed, trusted
                providers in their area. Our platform emphasizes transparency—you
                get real-time quotes and ETAs before approving any service. No
                traditional road club memberships required. Pay only for the
                services you use.
              </p>
            </div>
          </InnerPageLayout>
        </main>
        <Footer />
      </div>
    </>
  );
}
