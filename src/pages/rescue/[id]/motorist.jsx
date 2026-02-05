import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import Image from "next/image";
import ServiceIcon from "@/components/common/ServiceIcon";

function getServiceImage(service) {
  if (service === "basic-tow") return "/st-images/services/basic-tow.png";
  if (service === "flat-tire") return "/st-images/services/flat-tire.png";
  return "/st-images/services/basic-tow.png";
}

export default function RescueMotoristPage() {
  const router = useRouter();
  const { id, service } = router.query;
  const serviceImage = getServiceImage(service);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const isComplete =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.phone.trim() &&
    form.email.trim();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    router.push({
      pathname: `/rescue/${id}/confirm`,
      query: { service },
    });
  };

  return (
    <>
      <Head>
        <title>How can your Technician reach you? | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <Container className="py-10">
            <div className="mx-auto max-w-3xl">
              {/* Step indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-wide">
                  {/* Step 1 - completed */}
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                      ✓
                    </div>
                  {/* Step 2 - completed */}
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                    ✓
                  </div>
                  {/* Step 3 - active */}
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                    3
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    How can your Technician reach you?
                  </h1>
                  <p className="mt-2 text-gray-600">
                    They may need to contact you directly. In the meantime, we
                    will provide updates on your service.
                  </p>
                </div>
                {service && (
                  <div className="hidden items-center gap-2 sm:flex">
                    <ServiceIcon
                      src={serviceImage}
                      alt="Selected service"
                      size="sm"
                      className="border-none bg-primary/10"
                    />
                  </div>
                )}
              </div>

              <form
                className="mt-8 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-1 block text-sm font-medium text-gray-800"
                    >
                      First name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-1 block text-sm font-medium text-gray-800"
                    >
                      Last name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1 block text-sm font-medium text-gray-800"
                    >
                      Phone number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-gray-800"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      We&apos;ll send you a receipt.
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <button
                    type="submit"
                    disabled={!isComplete}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                      isComplete
                        ? "bg-primary text-white hover:bg-secondary"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    Request
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="block w-full text-center text-sm font-medium text-primary hover:text-secondary hover:underline"
                  >
                    Go back
                  </button>
                </div>
              </form>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
}

