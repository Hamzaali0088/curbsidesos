import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Container from "@/components/common/Container";

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
          <Container className="py-8">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary">
                Roadside Assistance
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Support</span>
            </nav>

            <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
              {/* Left: Support Content */}
              <div className="lg:col-span-2">
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
                    Curbside SOS is an open marketplace for roadside assistance
                    and towing. We connect motorists in need with licensed,
                    trusted providers in their area. Our platform emphasizes
                    transparency—you get real-time quotes and ETAs before
                    approving any service. No traditional road club memberships
                    required. Pay only for the services you use.
                  </p>
                </div>
              </div>

              {/* Right: Sticky Contact Info Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
                      <Image
                        src="/st-images/brand/favicon.png"
                        alt="Curbside SOS"
                        width={60}
                        height={60}
                        className="object-contain p-2"
                      />
                    </div>
                    <h2 className="mt-4 text-lg font-bold text-gray-900">
                      Curbside SOS
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Contact Information
                    </p>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex gap-3">
                      <MapPin className="h-5 w-5 shrink-0 text-primary" />
                      <p className="text-sm text-gray-700">
                        21103 Gratiot Ave. Eastpointe, MI 48021
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="h-5 w-5 shrink-0 text-primary" />
                      <a
                        href="tel:5865224277"
                        className="text-sm text-gray-700 hover:text-primary"
                      >
                        (586) 522-4277
                      </a>
                    </div>
                    <div className="flex gap-3">
                      <Mail className="h-5 w-5 shrink-0 text-primary" />
                      <a
                        href="mailto:support@curbsidesos.com"
                        className="text-sm text-gray-700 hover:text-primary"
                      >
                        support@curbsidesos.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
