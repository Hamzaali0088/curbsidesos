import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import Container from "@/components/common/Container";
import Paragraph from "../common/Paragraph";

const partnerLinks = [
  { label: "Roadside providers", href: "/service-providers" },
  { label: "Police Dispatch", href: "/911" },
  { label: "Motorists", href: "/motorists" },
];

const supportLinks = [
  { label: "Contact us", href: "/contact" },
  { label: "Knowledge Base", href: "/faqs" },
];

const APP_STORE_URL = "https://apps.apple.com/us/app/curbside-sos/id1480296390";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.koombea.curbsidesos&hl=en_US";

const downloadLinks = [
  { label: "iOS", href: APP_STORE_URL, external: true },
  { label: "Android", href: GOOGLE_PLAY_URL, external: true },
];

const roadsideLinks = [
  { label: "Roadside Help & FAQs", href: "/faqs" },
  { label: "Glossary", href: "/glossary" },
  { label: "All Roadside Services", href: "/services" },
];

const serviceList = [
  { label: "Flat tire", href: "/get-support?service=flat-tire" },
  { label: "Won't start", href: "/get-support?service=wont-start" },
  { label: "Locked out", href: "/get-support?service=locked-out" },
  { label: "Out of gas", href: "/get-support?service=out-of-gas" },
  { label: "Basic tow", href: "/get-support?service=basic-tow" },
  { label: "Stuck", href: "/get-support?service=winch-out" },
];

export default function Footer() {

  const classNameofLink = "text-lg text-[#4D6C7D] leading-5.5 hover:text-primary"
  return (
    <footer className="bg-gray-100 text-gray-800">
      <Container className="py-5">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1"> 
            <Link href="/" className="flex items-center bg-transparent">
              <Image
                src="/st-images/brand/logo.png"
                alt="Curbside SOS"
                width={160}
                height={40}
                className="h-[45px] w-auto object-contain  bg-transparent"
              />
            </Link>
            <Paragraph className="mt-4">
              We help people retake control of roadside by rebuilding trust and
              removing the obstacles to get moving again.
            </Paragraph>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-700 transition-colors hover:bg-primary hover:text-white"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-700 transition-colors hover:bg-primary hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-700 transition-colors hover:bg-primary hover:text-white"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Partner</h3>
            <ul className="mt-4 space-y-2">
              {partnerLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-700 hover:text-primary hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-700 hover:text-primary hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 font-bold text-gray-900">Downloads</h3>
            <ul className="mt-4 space-y-2">
              {downloadLinks.map(({ label, href, external }) => (
                <li key={label}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-700 hover:text-primary hover:underline"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-sm text-gray-700 hover:text-primary hover:underline"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Roadside resources</h3>
            <ul className="mt-4 space-y-2">
              {roadsideLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-700 hover:text-primary hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-3 space-y-1 pl-0 text-sm text-gray-700">
              {serviceList.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="hover:text-primary hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-300 pt-8">
          <div className="flex flex-col gap-4 text-sm text-gray-700 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-4">
              <Link href="/terms" className="hover:text-primary hover:underline">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-primary hover:underline">
                Privacy Policy
              </Link>
              <Link href="/sitemap.xml" className="hover:text-primary hover:underline">
                XML sitemap
              </Link>
            </div>
            <div className="text-gray-700">
              <p>21103 Gratiot Ave Eastpointe, MI 48021</p>
              <p>
                Support{" "}
                <a href="tel:5865224277" className="hover:text-primary hover:underline">
                  (586) 522-4277
                </a>
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-700">
            Copyright © 2026 Curbside SOS Inc. All Rights Reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}
