import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import Image from "next/image";
import ServiceIcon from "@/components/common/ServiceIcon";
import FloatingInput from "@/components/common/FloatingInput";

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
      <div className="min-h-screen bg-white text-gray-900 max-w-2xl mx-auto">
        <Header contactNumber="(214) 396-4751"/>
        <main>
          <Container className="py-10">
            <div className="mx-auto max-w-full">
              {/* Step indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-wide">
                  {/* Step 1 - completed */}
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                      ✓
                    </div>
                    <div className="ml-2 flex-1 h-[2px] bg-primary" />
                  {/* Step 2 - completed */}
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                    ✓
                  </div>
                  <div className="ml-2 flex-1 h-[2px] bg-primary" />
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

                    <FloatingInput  
                      id="firstName"
                      label="First name *"
                      type="text"
                      value={form.firstName}
                      onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                    <FloatingInput
                      id="lastName"
                      label="Last name *"
                      type="text"
                      value={form.lastName}
                      onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                </div>

                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      
                    <FloatingInput
                      id="phone"
                      label="Phone number *"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    <FloatingInput
                      id="email"
                      label="Email *"
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    </div>
                    
                  <p className="mt-1 text-xs text-gray-500">
                    We&apos;ll send you a receipt.
                  </p>
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

