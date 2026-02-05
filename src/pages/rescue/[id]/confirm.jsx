import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";

export default function RescueConfirmPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Head>
        <title>Confirm rescue | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <Container className="py-12">
            <div className="mx-auto max-w-md text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Location set
              </h1>
              <p className="mt-2 text-gray-600">
                Rescue ID: {id}. Next step: confirm and connect with a
                technician.
              </p>
              <Link
                href="/get-support"
                className="mt-6 inline-block text-primary hover:underline"
              >
                ← Back to Get Support
              </Link>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
}
