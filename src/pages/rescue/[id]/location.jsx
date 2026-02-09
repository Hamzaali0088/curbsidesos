import { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { MapPin, ChevronRight } from "lucide-react";
import Header from "@/components/home/Header";
import Container from "@/components/common/Container";
import ServiceIcon from "@/components/common/ServiceIcon";
import servicesData from "@/data/services.json";

const LocationMap = dynamic(
  () => import("@/components/rescue/LocationMap"),
  { ssr: false }
);

const DEFAULT_CENTER = [32.7767, -96.797];
const DEFAULT_ZOOM = 10;

function getServiceConfig(serviceId) {
  const { services } = servicesData;
  return (
    services.find((service) => service.id === serviceId) || services[0]
  );
}

export default function RescueLocationPage() {
  const router = useRouter();
  const { id, service } = router.query;
  const [locations, setLocations] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("/data/locations.json")
      .then((res) => res.json())
      .then((data) => setLocations(data))
      .catch(() => {});
  }, []);

  // Pre-fill from persisted location (e.g. after "Allow Current Location")
  useEffect(() => {
    if (typeof window === "undefined" || !id) return;
    try {
      const stored = window.localStorage.getItem(
        `curbsidesos_rescue_${id}_location`
      );
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed &&
          typeof parsed.latitude === "number" &&
          typeof parsed.longitude === "number"
        ) {
          setSelectedLocation(parsed);
          setQuery(parsed.address || "Current location");
        }
      }
    } catch (e) {
      console.error("Failed to read stored location", e);
    }
  }, [id]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return locations.slice(0, 8);
    const q = query.toLowerCase();
    return locations.filter((loc) =>
      loc.address.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [locations, query]);

  const serviceId =
    typeof service === "string" && service.length > 0 ? service : "flat-tire";
  const serviceConfig = getServiceConfig(serviceId);

  const mapCenter = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : DEFAULT_CENTER;
  const markerPosition = selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : null;

  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setQuery(loc.address);
    setShowSuggestions(false);
  };

  const handleContinue = () => {
    if (!selectedLocation) return;
    if (typeof window !== "undefined" && id && selectedLocation) {
      try {
        window.localStorage.setItem(
          `curbsidesos_rescue_${id}_location`,
          JSON.stringify(selectedLocation)
        );
      } catch (e) {
        console.error("Failed to persist location data", e);
      }
    }
    router.push(`/rescue/${id}/situation?service=${serviceId}`);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <>
      <Head>
        <title>Set your location | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900 max-w-2xl mx-auto">
        <Header contactNumber="(214) 396-4751"/>
        <main>
          <Container className="py-8">
            <div className="mx-auto max-w-full">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Set your location
                  </h1>
                  <p className="mt-2 text-gray-600">
                    This helps us connect you with the closest local Technician.
                  </p>
                </div>
                {serviceConfig && (
                  <div className="hidden items-center gap-2 sm:flex">
                    <ServiceIcon
                      src={serviceConfig.icon}
                      alt={serviceConfig.name}
                      size="sm"
                      isBorder={false}
                      className="bg-primary/10"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-inner">
                <LocationMap
                  center={mapCenter}
                  zoom={DEFAULT_ZOOM}
                  markerPosition={markerPosition}
                  className="h-[320px] w-full"
                />
              </div>

              <div className="relative mt-6">
                <label htmlFor="address" className="sr-only">
                  Enter address
                </label>
                <div className="flex items-center rounded-lg border border-gray-300 bg-white shadow-sm focus-within:ring-2 focus-within:ring-primary/30">
                  <span className="pl-3 text-gray-400" aria-hidden>
                    <MapPin className="h-5 w-5" />
                  </span>
                  <input
                    id="address"
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() =>
                      setTimeout(() => setShowSuggestions(false), 200)
                    }
                    placeholder="Enter address"
                    className="w-full border-0 py-3 pl-2 pr-4 text-gray-900 placeholder-gray-500 focus:ring-0"
                    autoComplete="off"
                  />
                </div>

                {showSuggestions && suggestions.length > 0 && (
                  <ul
                    className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
                    role="listbox"
                  >
                    {suggestions.map((loc) => (
                      <li
                        key={loc.id}
                        role="option"
                        aria-selected={selectedLocation?.id === loc.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSelectLocation(loc);
                        }}
                        className="cursor-pointer px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/10 hover:text-gray-900"
                      >
                        {loc.address}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={!selectedLocation}
                  className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-70 ${
                    selectedLocation
                      ? "bg-primary text-white hover:bg-secondary"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  Continue
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="block w-full text-center text-sm font-medium text-primary hover:text-secondary hover:underline"
                >
                  Go back
                </button>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </>
  );
}
