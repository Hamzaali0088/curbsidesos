import { useState, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { ChevronRight } from "lucide-react";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import ServiceIcon from "@/components/common/ServiceIcon";
import FloatingInput from "@/components/common/FloatingInput";
import servicesData from "@/data/services.json";

function getServiceConfig(serviceId) {
  const { services } = servicesData;
  return services.find((service) => service.id === serviceId) || services[0];
}

export default function RescueVehiclePage() {
  const router = useRouter();
  const { id, service } = router.query;
  const serviceId =
    typeof service === "string" && service.length > 0 ? service : "flat-tire";
  const serviceConfig = useMemo(
    () => getServiceConfig(serviceId),
    [serviceId]
  );

  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    awd: false,
  });

  const isComplete =
    form.make.trim() &&
    form.model.trim() &&
    form.year.trim() &&
    form.color.trim();

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (!isComplete) return;
    // Persist vehicle details so they can be sent with the final API request
    if (typeof window !== "undefined" && id) {
      try {
        window.localStorage.setItem(
          `curbsidesos_rescue_${id}_vehicle`,
          JSON.stringify(form)
        );
      } catch (e) {
        console.error("Failed to persist vehicle data", e);
      }
    }
    router.push({
      pathname: `/rescue/${id}/motorist`,
      query: { service },
    });
  };

  return (
    <>
      <Head>
        <title>What type of car do you have? | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900 max-w-2xl mx-auto">
        <Header contactNumber="(214) 396-4751"/>
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
                  <div className="ml-2 flex-1 h-[2px] bg-primary" />
                  
                  {/* Step 2 - active */}
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-white">
                        2
                      </div>
                      <div className="ml-2 flex-1 h-[2px] bg-gray-200" />
                  {/* Step 3 - upcoming */}
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-500">
                    3
                  </div>
                </div>
              </div>

              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    What type of car do you have?
                  </h1>
                  <p className="mt-2 text-gray-600">
                    This will help your Technician locate you when they arrive
                    on the scene.
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
                  handleContinue();
                }}
              >
                <div className="grid gap-4 sm:grid-cols-1">
                  <FloatingInput
                    id="make"
                    label="Make"
                    value={form.make}
                    onChange={(e) => handleChange("make", e.target.value)}
                    required
                  />
                  <FloatingInput
                    id="model"
                    label="Model"
                    value={form.model}
                    onChange={(e) => handleChange("model", e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-1">
                  <FloatingInput
                    id="year"
                    label="Year"
                    value={form.year}
                    onChange={(e) => handleChange("year", e.target.value)}
                    required
                  />
                  <FloatingInput
                    id="color"
                    label="Color"
                    value={form.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    required
                  />
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <input
                    id="awd"
                    type="checkbox"
                    checked={form.awd}
                    onChange={(e) => handleChange("awd", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label
                    htmlFor="awd"
                    className="text-sm font-medium text-gray-800"
                  >
                    All-wheel drive (AWD)
                  </label>
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
                    Continue
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

