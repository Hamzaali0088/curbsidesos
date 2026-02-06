import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import servicesData from "@/data/services.json";
import ServiceIcon from "@/components/common/ServiceIcon";
import Image from "next/image";
import { Star } from "lucide-react";

const STEP_DURATION_MS = 4000;

const LocationMap = dynamic(
  () => import("@/components/rescue/LocationMap"),
  { ssr: false }
);

const DEFAULT_CENTER = [32.7767, -96.797];
const DEFAULT_ZOOM = 10;

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
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [markerPosition, setMarkerPosition] = useState(null);

  useEffect(() => {
    if (!id || typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(
        `curbsidesos_rescue_${id}_location`
      );
      if (!stored) return;
      const loc = JSON.parse(stored);
      if (loc && typeof loc.latitude === "number" && typeof loc.longitude === "number") {
        const coords = [loc.latitude, loc.longitude];
        setMapCenter(coords);
        setMarkerPosition(coords);
      }
    } catch (e) {
      console.error("Failed to read stored location", e);
    }
  }, [id]);

  useEffect(() => {
    if (activeStepIndex >= steps.length - 1) return;

    const timer = setTimeout(() => {
      setActiveStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, STEP_DURATION_MS);

    return () => clearTimeout(timer);
  }, [activeStepIndex]);

  const progressPercent = (activeStepIndex / (steps.length - 1)) * 100;

  const activeStep = steps[activeStepIndex];

  const renderStepContent = () => {
    switch (activeStep) {
        case "skeleton":
          return (
            <div className="mt-16 flex flex-col items-center gap-10">
              <div className="flex flex-col items-center gap-4">
                <div className="h-30 w-30 rounded-full bg-gray-200 animate-pulse" />
              </div>
              <div className="w-full space-y-3 flex flex-col items-center justify-center">
                <div className="h-7 w-[300px] rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-7 w-[200px] rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-7 w-[200px] rounded-lg bg-gray-200 animate-pulse" />
                <div className="h-7 w-[150px] rounded-lg bg-gray-200 animate-pulse" />
              </div>
            </div>
          );
        case "highly_rated":
          return (
            <div className="mt-14 space-y-10 max-w-sm mx-auto">
              <div className="text-center mx-auto w-fit">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 px-2">
                  Highly rated
                </h2>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center justify-center gap-2">
                  <Image src="/st-images/google.png" alt="Google" width={100} height={100} className="w-10 h-10" />
                  <div className="text-xs text-gray-600 text-center">
                    <h4 className="flex items-center justify-start text-yellow-500"><Star fill style={{ color: "#FAAF03" }} className="w-4 h-4 text-yellow-500 " /><Star fill style={{ color: "#FAAF03" }} className="w-4 h-4 text-yellow-500 " strokeWidth={1} /><Star fill style={{ color: "#FAAF03" }} className="w-4 h-4 text-yellow-500 " strokeWidth={1} /><Star fill style={{ color: "#FAAF03" }} className="w-4 h-4 text-yellow-500 " strokeWidth={1} /><Star fill style={{ color: "#FAAF03" }} className="w-4 h-4 text-yellow-500 " strokeWidth={1} /> </h4>
                    <h4>4.2 / 5.0 average rating</h4>
                  </div>
                </div>
              </div>
              <div className="text-center flex flex-col items-center justify-center gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide border-b border-gray-200 pb-2 text-gray-500">
                  Trusted by
                </h3>
                <Image src="/st-images/geico.png" alt="Trusted by" width={100} height={100} className="w-auto h-18 -mb-5" />
                <Image src="/st-images/allstate.png" alt="Trusted by" width={100} height={100} className="w-auto h-10" />
                <Image src="/st-images/nsd.png" alt="Trusted by" width={100} height={100} className="w-auto h-10" />
              </div>
            </div>
          );
        case "bring_fuel":
          return (
            <div className="mt-10 space-y-6">
              <div className="flex flex-col items-center gap-6 rounded-2xl px-6 py-10">
                <Image src="/st-images/out-of-gas-v1@2x.webp" alt="Fuel" width={1000} height={1000} className="w-full h-auto" />
                <p className=" text-start text-lg text-gray-700">
                  A Technician will bring a few gallons of fuel for your tank
                  so that you can drive to a nearby service station to fill up.
                </p>
              </div>
            </div>
          );
        case "insured_techs":
          return (
            <div className="mt-10 flex flex-col items-center gap-6">
              <Image src="/st-images/technician-insured-illustration-v1@2x.webp" alt="Insured Technicians" width={1000} height={1000} className="w-[200px] h-auto" />
              <p className="max-w-md text-center text-lg text-gray-700">
                All Technicians are fully insured and background checked.
              </p>
            </div>
          );
        case "track_technician":
          return (
            <div className="mt-10 flex flex-col items-center gap-6">
              <Image src="/st-images/location.png" alt="Track Technician" width={1000} height={1000} className="w-[200px] h-auto" />
              <p className="max-w-md text-center text-lg text-gray-700">
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
                <LocationMap
                  center={mapCenter}
                  zoom={DEFAULT_ZOOM}
                  markerPosition={markerPosition}
                  className="h-full w-full"
                />
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
        <div className="min-h-screen bg-white text-gray-900 max-w-2xl mx-auto">
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
                        isBorder={false}
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

