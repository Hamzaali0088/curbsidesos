import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import Container from "@/components/common/Container";
import { Phone } from "lucide-react";

const sideMenuLinks = [
  { label: "Home", href: "/", index: 0  },
  { label: "Motorists", href: "/motorists", index: 1 },
  { label: "Service Providers", href: "/service-providers", index: 2 },
  { label: "911", href: "/911", index: 3 },
  { label: "Support", href: "/support", index: 4 },
  { label: "Glossary", href: "/glossary", index: 5 },
  { label: "FAQs", href: "/faqs", index: 6 },
  { label: "Services", href: "/services", index: 7 },
  { label: "Contact", href: "/contact", index: 8 },
  { label: "Terms of Service", href: "/terms", index: 9 },
  { label: "Privacy Policy", href: "/privacy", index: 10 },
];

const APP_STORE_URL = "https://apps.apple.com/us/app/curbside-sos/id1480296390";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.koombea.curbsidesos&hl=en_US";

const downloadLinks = [
  { label: "iOS", href: APP_STORE_URL, external: true },
  { label: "Android", href: GOOGLE_PLAY_URL, external: true },
];

export default function Header({ contactNumber }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
        <Container>
          <div className="flex h-14 md:h-16 items-center justify-between">
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
                      <Menu className="h-5 w-5 md:h-6 md:w-6" />
                    </button>

                    <Link href="/" className="flex items-center">
                      <Image
                        src="/st-images/brand/logo.png"
                        alt="Curbside SOS"
                        width={160}
                        height={40}
                        className="h-7 md:h-[45px] w-auto object-contain"
                      />
                    </Link>
                  </div>

                )}

              </div>

            </div>
            <nav className=" text-primary font-bold items-center gap-4 md:gap-8 flex">
              {contactNumber ? (
                <div className="flex items-center gap-2 text-black">
                  <Phone className="h-4 w-4" />
                  <a href={`tel:${contactNumber}`} className=" text-sm hover:text-secondary">
                    {contactNumber}
                  </a></div>) : (
                <>
                  <Link
                    href="/support"
                    className="text-sm hover:text-secondary hidden md:block"
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
        <nav className="flex flex-col overflow-y-auto py-2">
          {sideMenuLinks.map(({ label, href, index }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className={`px-4 py-0.5 ${index === 4 || index === 7 || index === 9 ? "pt-4" : "pt-0"} text-left text-base font-normal ${'var(--font-light-stack)'} ${router.pathname === href
                  ? "text-primary"
                  : "text-gray-900 hover:text-primary"
                }`}
            >
              {label}
            </Link>
          ))}
          <div className="mt-4 border-t border-gray-200 px-4 pt-4">
            <p className="text-sm font-bold text-[#4d6c7d]">Downloads</p>
            {downloadLinks.map(({ label, href, external }) =>
              external ? (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className={`block py-0.5 px-4 text-base font-normal text-gray-900 hover:text-primary ${'var(--font-light-stack)'}`}
                >
                  {label}ll
                </a>
              ) : (
                <Link
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  className="block py-0.5 px-4 text-base font-semibold text-gray-900 hover:text-primary ${'var(--font-light-stack)'}"
                >
                  {label}
                </Link>
              )
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}
