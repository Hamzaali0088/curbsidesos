import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRight, Send, Loader2 } from "lucide-react";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import Paragraph from "@/components/common/Paragraph";
import Image from "next/image";
import ServiceIcon from "@/components/common/ServiceIcon";
import servicesData from "@/data/services.json";

const services = servicesData.services;

export default function GetSupport() {
  const router = useRouter();
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [modalServiceId, setModalServiceId] = useState(null);
  const [activeTab, setActiveTab] = useState("services"); // 'services' | 'details'
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const getServiceById = (id) =>
    services.find((service) => service.id === id) || services[0];

  const openModal = (serviceId) => {
    setModalServiceId(serviceId);
  };

  const selectService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setActiveTab("details");
  };

  const closeModal = () => {
    setModalServiceId(null);
    setLocationError(null);
  };

  const allowCurrentLocation = () => {
    if (typeof window === "undefined" || !window.navigator?.geolocation) {
      setLocationError("Location is not supported in this browser.");
      return;
    }
    setLocationError(null);
    setLocationLoading(true);
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        const rescueId =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : "9512ce6c-a5e8-4e75-b169-44ce13323229";
        const serviceId = modalServiceId || "flat-tire";
        const location = {
          id: "current",
          address: "Current location",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        try {
          window.localStorage.setItem(
            `curbsidesos_rescue_${rescueId}_location`,
            JSON.stringify(location)
          );
        } catch (e) {
          console.error("Failed to store location", e);
        }
        setLocationLoading(false);
        closeModal();
        router.push(`/rescue/${rescueId}/location?service=${serviceId}`);
      },
      (err) => {
        setLocationLoading(false);
        if (err.code === 1) {
          setLocationError("Location permission denied. You can enter your address manually.");
        } else if (err.code === 2) {
          setLocationError("Location unavailable. Try entering your address manually.");
        } else {
          setLocationError("Unable to get location. Try entering your address manually.");
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    );
  };

  const openLocationManual = () => {
    const rescueId =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "9512ce6c-a5e8-4e75-b169-44ce13323229";
    closeModal();
    const serviceId = modalServiceId || "flat-tire";
    router.push(`/rescue/${rescueId}/location?service=${serviceId}`);
  };

  return (
    <>
      <Head>
        <title>Rescue | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900 max-w-2xl mx-auto">
        <Header contactNumber="(214) 396-4751"/>
        <main>
          <Container className="py-8">
            {/* Breadcrumbs */}
            <nav className="mb-8 text-sm text-gray-500">
              <Link href="/" className="hover:text-primary">
                Roadside Assistance
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Rescue</span>
            </nav>

            {/* Map Section */}
            <div className="mb-8 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <Image
                src="/st-images/map.png"
                alt="United States map"
                width={1280}
                height={440}
                className="h-auto w-full object-cover"
                priority
              />
            </div>


            {/* Main Content */}
            <div className="mx-auto max-w-full">
              {activeTab === "services" && (
                <>
                  <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    What help do you need?
                  </h1>
                  <p className="mt-2 text-center text-base text-gray-600 sm:text-lg">
                    Select from the available services below.
                  </p>

                  <div className="mt-8 space-y-3">
                    {services.map(({ id, name, icon }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => selectService(id)}
                        className={`flex w-full items-center gap-4 rounded-lg border px-4 py-2 text-left transition-colors ${
                          selectedServiceId === id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        <ServiceIcon src={icon} alt={name} size="md" />
                        <span className="flex-1 text-xl font-bold text-gray-900">
                          {name}
                        </span>
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "details" && selectedServiceId && (
                <>
                  {(() => {
                    const service = getServiceById(selectedServiceId);
                    return (
                      <div className="mt-4 space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
                          <div className=" flex items-center gap-3">
                            <ServiceIcon
                              src={service.icon}
                              alt={service.name}
                              size="md"
                            />
                            <span className="text-lg font-bold text-gray-900">
                              {service.name}
                            </span>
                          </div>
                        </div>
                          <p className="text-lg md:text-xl font-medium text-gray-700">
                            {service.situation.description}
                          </p>

                        <div className="space-y-3">
                          <button
                            type="button"
                            onClick={() => openModal(selectedServiceId)}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
                          >
                            Continue
                            <ChevronRight className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveTab("services")}
                            className="block w-full text-center text-sm font-medium text-primary hover:text-secondary hover:underline"
                          >
                            Go back
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}
            </div>
          </Container>
        </main>

        {/* Location Modal */}
        {modalServiceId && (
          <div className="">
            <div
              role="button"
              tabIndex={0}
              onClick={closeModal}
              onKeyDown={(e) => e.key === "Escape" && closeModal()}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              aria-label="Close modal"
            />
            <div
              className="fixed left-1/2   top-1/2 z-[70] w-full max-w-[350px] md:max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-8 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              aria-describedby="modal-description"
            >
              {/* Map Graphic */}
              <div className="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center  bg-white ">
                <Image
                  src="/st-images/location.png"
                  alt="Location"
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>

              <h2
                id="modal-title"
                className="text-start text-2xl pb-4 font-bold text-gray-900 "
              >
                We can help you with a {getServiceById(modalServiceId).name}
              </h2>
              <Paragraph
                id="modal-description"
                className="test-start"
              >
                Please share your location so we can quickly locate you and
                provide the help you need, exactly where you are.
              </Paragraph>

              <div className="mt-8 space-y-4">
                <button
                  type="button"
                  onClick={allowCurrentLocation}
                  disabled={locationLoading}
                  className="flex w-full items-center justify-center gap-2 text-sm md:text-base rounded-lg bg-primary px-4 py-3 font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {locationLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Getting location…
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Allow Current Location
                    </>
                  )}
                </button>
                {locationError && (
                  <p className="text-sm text-red-600" role="alert">
                    {locationError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={openLocationManual}
                  disabled={locationLoading}
                  className="block w-full text-center text-sm font-medium text-primary hover:text-secondary hover:underline disabled:opacity-70"
                >
                  Enter location manually
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
