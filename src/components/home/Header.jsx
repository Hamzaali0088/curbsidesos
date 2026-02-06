import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import Container from "@/components/common/Container";
import { Phone } from "lucide-react";

const sideMenuLinks = [
  { label: "Home", href: "/" },
  { label: "Motorists", href: "/motorists" },
  { label: "Service Providers", href: "/providers" },
  { label: "911", href: "/911" },
  { label: "Support", href: "/support" },
  { label: "Glossary", href: "/glossary" },
  { label: "FAQs", href: "/faqs" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

const downloadLinks = [
  { label: "iOS", href: "/download/ios" },
  { label: "Android", href: "/download/android" },
];

export default function Header({ contactNumber }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">

              <div>
                {contactNumber ? (
                  <Link href="/" className="flex items-center">
                    <Image
                      src="/st-images/brand/logo.png"
                      alt="Curbside SOS"
                      width={160}
                      height={40}
                      className="h-[30px] w-auto object-contain"
                    />
                  </Link>
                ) : (
                  < div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(true)}
                      className="rounded p-2 text-gray-600 hover:bg-gray-100"
                      aria-label="Open menu"
                    >
                      <Menu className="h-6 w-6" />
                    </button>

                    <Link href="/" className="flex items-center">
                      <Image
                        src="/st-images/brand/logo.png"
                        alt="Curbside SOS"
                        width={160}
                        height={40}
                        className="h-[45px] w-auto object-contain"
                      />
                    </Link>
                  </div>

                )}



              </div>

            </div>
            <nav className="hidden text-primary font-bold items-center gap-8 lg:flex">
              {contactNumber ? (
                <div className="flex items-center gap-2 text-black">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${contactNumber}`} className=" text-sm hover:text-secondary">
                    {contactNumber}
                  </a></div>) : (
                <>
                  <Link
                    href="/support"
                    className="text-sm hover:text-secondary"
                  >
                    SUPPORT
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm hover:text-secondary"
                  >
                    CONTACT
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-lg border-[0.5px] border-primary bg-white px-4 py-[7px] text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                  >
                    LOGIN
                  </Link>
                </>
              )}

            </nav>
          </div>
        </Container>
      </header>

      {/* Side menu overlay */}
      <div
        role="button"
        tabIndex={isMenuOpen ? 0 : -1}
        onClick={closeMenu}
        onKeyDown={(e) => e.key === "Escape" && closeMenu()}
        className={`fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm transition-opacity duration-700 ease-in-out ${isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        aria-label="Close menu"
        aria-hidden={!isMenuOpen}
      />
      <aside
        className={`fixed left-0 top-0 z-[70] h-full w-[min(320px,85vw)] bg-white shadow-xl transition-transform duration-700 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        aria-label="Navigation menu"
        aria-hidden={!isMenuOpen}
      >
        <div className="flex h-16 items-center justify-end border-b border-gray-200 px-4">
          <button
            type="button"
            onClick={closeMenu}
            className="rounded p-2 text-gray-600 hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col overflow-y-auto py-6">
          {sideMenuLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`px-6 py-3 text-left text-base font-medium ${router.pathname === href
                  ? "text-primary"
                  : "text-gray-900 hover:text-primary"
                }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-4 border-t border-gray-200 px-6 pt-4">
            <p className="text-sm font-bold text-gray-900">Downloads</p>
            {downloadLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                className="block py-2 text-base font-medium text-gray-900 hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
}
