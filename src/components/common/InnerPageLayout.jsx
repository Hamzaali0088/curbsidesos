import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Check } from "lucide-react";
import Container from "@/components/common/Container";

function ContactInfoCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-gray-200">
          <Image
            src="/st-images/brand/favicon.png"
            alt="Curbside SOS"
            width={60}
            height={60}
            className="object-contain p-2"
          />
        </div>
        <h2 className="mt-4 text-lg font-bold text-gray-900">Curbside SOS</h2>
        <p className="mt-1 text-sm text-gray-500">Contact Information</p>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex gap-3">
          <MapPin className="h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-gray-700">
            21103 Gratiot Ave. Eastpointe, MI 48021
          </p>
        </div>
        <div className="flex gap-3">
          <Phone className="h-5 w-5 shrink-0 text-primary" />
          <a
            href="tel:5865224277"
            className="text-sm text-gray-700 hover:text-primary"
          >
            (586) 522-4277
          </a>
        </div>
        <div className="flex gap-3">
          <Mail className="h-5 w-5 shrink-0 text-primary" />
          <a
            href="mailto:support@curbsidesos.com"
            className="text-sm text-gray-700 hover:text-primary"
          >
            support@curbsidesos.com
          </a>
        </div>
      </div>
    </div>
  );
}

function HelpNowCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <button
        type="button"
        className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
      >
        Get help now
      </button>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-gray-700">
        AMEX, Discover, Master Card, Visa accepted
      </p>
      <div className="mt-5 space-y-3 text-sm text-gray-800">
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 text-primary" />
          <span>Providers are required to have insurance</span>
        </div>
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 text-primary" />
          <span>Available in all 50 states, most requests quoted in 3 minutes</span>
        </div>
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 text-primary" />
          <span>Choose the fastest or most affordable provider</span>
        </div>
        <div className="flex items-start gap-3">
          <Check className="mt-0.5 h-4 w-4 text-primary" />
          <span>Track your provider&apos;s ETA on the map</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable inner page layout with left content and a sticky right card.
 *
 * Props:
 * - breadcrumbLabel: string - label for the current page in the breadcrumb.
 * - rightCardVariant: "contact" | "help" - which right card design to use.
 * - children: ReactNode - main page content rendered on the left.
 */
export default function InnerPageLayout({
  breadcrumbLabel,
  rightCardVariant = "contact",
  children,
}) {
  return (
    <Container className="py-8">
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">
          Roadside Assistance
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{breadcrumbLabel}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
        <div className="lg:col-span-2">{children}</div>
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {rightCardVariant === "help" ? <HelpNowCard /> : <ContactInfoCard />}
          </div>
        </div>
      </div>
    </Container>
  );
}

