import Head from "next/head";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Container from "@/components/common/Container";
import {
  LAST_UPDATED,
  EFFECTIVE_DATE,
  SECTIONS,
} from "@/data/privacy-policy";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Curbside SOS</title>
        <meta
          name="description"
          content="Privacy Policy for Curbside SOS. How we collect and use personal information. Last updated June 26, 2024."
        />
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <Container className="py-8">
            <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary">
                Roadside Assistance
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Privacy Policy</span>
            </nav>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Privacy Policy
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Effective as of {EFFECTIVE_DATE}. Last updated {LAST_UPDATED}.
            </p>

            <article className="mt-10 space-y-12">
              {SECTIONS.map(({ title, paragraphs }) => (
                <section key={title}>
                  <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
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
            </article>
          </Container>
        </main>
        <Footer />
      </div>
    </>
  );
}
