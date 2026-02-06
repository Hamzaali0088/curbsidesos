import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import Image from "next/image";
import ServiceIcon from "@/components/common/ServiceIcon";
import FloatingInput from "@/components/common/FloatingInput";
import servicesData from "@/data/services.json";

function getServiceConfig(serviceId) {
  const { services } = servicesData;
  return services.find((service) => service.id === serviceId) || services[0];
}

export default function RescueMotoristPage() {
  const router = useRouter();
  const { id, service } = router.query;
  const [situationData, setSituationData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const serviceIdFromQuery =
    typeof service === "string" && service.length > 0 ? service : null;

  const effectiveServiceId = useMemo(() => {
    if (serviceIdFromQuery) return serviceIdFromQuery;
    if (situationData && typeof situationData.serviceId === "string") {
      return situationData.serviceId;
    }
    return "flat-tire";
  }, [serviceIdFromQuery, situationData]);

  const serviceConfig = useMemo(
    () => getServiceConfig(effectiveServiceId),
    [effectiveServiceId]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !id) return;

    try {
      const situationRaw = window.localStorage.getItem(
        `curbsidesos_rescue_${id}_situation`
      );
      const vehicleRaw = window.localStorage.getItem(
        `curbsidesos_rescue_${id}_vehicle`
      );

      if (situationRaw) {
        setSituationData(JSON.parse(situationRaw));
      }
      if (vehicleRaw) {
        setVehicleData(JSON.parse(vehicleRaw));
      }
    } catch (e) {
      console.error("Failed to load persisted rescue data", e);
    }
  }, [id]);

  const isComplete =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.phone.trim() &&
    form.email.trim();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!isComplete) return;

    let domain = "curbsidesos.com";
    if (typeof window !== "undefined" && window.location?.hostname) {
      domain = window.location.hostname;
    }

    const contactName = `${form.firstName} ${form.lastName}`.trim();

    const descriptionParts = [];
    if (situationData) {
      descriptionParts.push(
        `Situation: ${JSON.stringify(situationData.answers || situationData)}`
      );
    }
    if (vehicleData) {
      const { year, make, model, color, awd } = vehicleData;
      const vehicleString = [year, make, model, color]
        .filter(Boolean)
        .join(" ");
      descriptionParts.push(
        `Vehicle: ${vehicleString}${awd ? " (AWD)" : ""}`
      );
    }

    const description = descriptionParts.join(" | ");

    const payload = {
      messages: {
        domain,
        contact_name: contactName,
        email: form.email,
        phone: form.phone,
        message: "Rescue request from motorist form",
        description,
        situation: situationData,
        vehicle: vehicleData,
      },
      queueName: "curbsidesos_com",
    };

    try {
      const res = await fetch(
        "https://rabbit.logicalcrm.com/api/add_in_queue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer AKIA3WTNB4VOJYIFVP7F",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        console.error("Failed to enqueue rescue request", await res.text());
      }
    } catch (e) {
      console.error("Error calling add_in_queue API", e);
    } finally {
      router.push({
        pathname: `/rescue/${id}/quotes`,
        query: { service },
      });
    }
  };

  return (
    <>
      <Head>
        <title>How can your Technician reach you? | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900 max-w-2xl mx-auto">
        <Header contactNumber="(214) 396-4751"/>
        <main>
          <Container className="pb-10 pt-4">
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
                {serviceConfig && (
                  <div className="hidden items-center gap-2 sm:flex">
                    <ServiceIcon
                      src={serviceConfig.icon}
                      alt={serviceConfig.name}
                      size="sm"
                      className="border-none bg-primary/10"
                      isBorder={false}
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
                <div className="grid gap-4 sm:grid-cols-1">

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
                    <div className="grid gap-4 sm:grid-cols-1">
                      
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

