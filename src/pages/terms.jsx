import Head from "next/head";
import Link from "next/link";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import Container from "@/components/common/Container";
import { LAST_MODIFIED, SECTIONS } from "@/data/terms-of-service";

export default function TermsPage() {
  return (
    <>
      <Head>
        <title>Terms of Service | Curbside SOS</title>
        <meta
          name="description"
          content="Terms of Service for the Curbside SOS platform. Last modified April 22, 2025."
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
              <span className="text-gray-900">Terms of Service</span>
            </nav>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Last Modified: {LAST_MODIFIED}
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
