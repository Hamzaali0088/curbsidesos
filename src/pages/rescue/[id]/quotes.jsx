import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import servicesData from "@/data/services.json";
import ServiceIcon from "@/components/common/ServiceIcon";

const STEP_DURATION_MS = 4000;

const steps = [
  "skeleton",
  "highly_rated",
  "bring_fuel",
  "insured_techs",
  "track_technician",
  "no_quotes",
];

function getServiceConfig(serviceId) {
  const { services } = servicesData;
  return services.find((service) => service.id === serviceId) || services[0];
}

export default function RescueQuotesPage() {
  const router = useRouter();
  const { id, service: serviceFromQuery } = router.query;

  const serviceId =
    typeof serviceFromQuery === "string" && serviceFromQuery.length > 0
      ? serviceFromQuery
      : "out-of-gas";

  const serviceConfig = useMemo(
    () => getServiceConfig(serviceId),
    [serviceId]
  );

  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (activeStepIndex >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setActiveStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, STEP_DURATION_MS);

    return () => clearTimeout(timer);
  }, [activeStepIndex]);

  const progressPercent =
    (activeStepIndex / (steps.length - 1)) * 100;

  const activeStep = steps[activeStepIndex];

  const renderStepContent = () => {
    switch (activeStep) {
      case "skeleton":
        return (
          <div className="mt-16 flex flex-col items-center gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-40 rounded-full bg-gray-200 animate-pulse" />
            </div>
            <div className="w-full space-y-3">
              <div className="h-3 w-full rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-[92%] rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-[85%] rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-[78%] rounded-full bg-gray-200 animate-pulse" />
              <div className="h-3 w-[70%] rounded-full bg-gray-200 animate-pulse" />
            </div>
          </div>
        );
      case "highly_rated":
        return (
          <div className="mt-14 space-y-10">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Highly rated
              </h2>
            </div>
            <div className="mx-auto flex max-w-md items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm">
                <span className="text-lg font-bold text-[#4285F4]">G</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Google Reviews
                </p>
                <p className="text-xs text-gray-600">
                  4.2 / 5.0 average rating
                </p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Trusted by
              </h3>
              <div className="mt-3 flex flex-wrap justify-center gap-6 text-sm font-semibold text-gray-700">
                <span>GEICO</span>
                <span>Allstate</span>
                <span>Nation Safe Drivers</span>
              </div>
            </div>
          </div>
        );
      case "bring_fuel":
        return (
          <div className="mt-10 space-y-6">
            <div className="flex flex-col items-center gap-6 rounded-2xl bg-[#F7F5FF] px-6 py-10">
              <div className="h-40 w-full max-w-md rounded-2xl bg-linear-to-r from-orange-100 via-amber-50 to-orange-100" />
              <p className="max-w-xl text-center text-sm text-gray-700">
                A Technician will bring a few gallons of fuel for your tank
                so that you can drive to a nearby service station to fill up.
              </p>
            </div>
          </div>
        );
      case "insured_techs":
        return (
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
              <span className="text-4xl">✓</span>
            </div>
            <p className="max-w-md text-center text-sm text-gray-700">
              All Technicians are fully insured and background checked.
            </p>
          </div>
        );
      case "track_technician":
        return (
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex h-40 w-40 items-center justify-center rounded-full bg-primary/10">
              <div className="h-24 w-24 rounded-full bg-green-100" />
            </div>
            <p className="max-w-md text-center text-sm text-gray-700">
              Track your Technician while they&apos;re en route and get live
              ETA updates.
            </p>
            <p className="text-xs text-gray-500">Finishing up…</p>
          </div>
        );
      case "no_quotes":
      default:
        return (
          <div className="mt-10 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                No quotes received
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Unfortunately, there are no nearby Technicians available right now.
              </p>
            </div>
            <div className="h-72 w-full overflow-hidden rounded-2xl border border-gray-200">
              <div className="h-full w-full bg-[url('https://maps.gstatic.com/mapfiles/api-3/images/google4.png')] bg-cover bg-center opacity-40" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                disabled
                className="flex-1 rounded-lg bg-gray-200 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wide text-gray-500"
              >
                Select Technician
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof id === "string") {
                    router.push(`/rescue/${id}/location`);
                  } else {
                    router.push("/get-support");
                  }
                }}
                className="flex-1 rounded-lg border border-primary px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-primary hover:bg-primary hover:text-white"
              >
                Restart request
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Getting your rescue set up | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header contactNumber="(214) 396-4751" />
        <main>
          <Container className="py-10">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Getting your rescue set up
                  </h1>
                  <p className="mt-2 text-gray-600">
                    We&apos;re gathering pricing and timing from nearby Technicians.
                  </p>
                </div>
                {serviceConfig && (
                  <div className="flex items-center gap-2">
                    <ServiceIcon
                      src={serviceConfig.icon}
                      alt={serviceConfig.name}
                      size="sm"
                      className="border-none bg-primary/10"
                    />
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-700">
                      {serviceConfig.name}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 h-[3px] w-full rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-4000 ease-linear"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {renderStepContent()}
            </div>
          </Container>
        </main>
      </div>
    </>
  );
}

