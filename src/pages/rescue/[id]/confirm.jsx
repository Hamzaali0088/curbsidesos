import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function RescueConfirmPage() {
  const router = useRouter();
  const { id, service } = router.query;

  useEffect(() => {
    if (!id) return;

    const query =
      typeof service === "string" && service.length > 0
        ? { service }
        : undefined;

    router.replace({
      pathname: `/rescue/${id}/quotes`,
      query,
    });
  }, [id, service, router]);

  return (
    <>
      <Head>
        <title>Redirecting… | Curbside SOS</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center bg-white text-gray-900">
        <p className="text-sm text-gray-600">
          Redirecting you to your rescue status…
        </p>
      </div>
    </>
  );
}
