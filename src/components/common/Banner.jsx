import Image from "next/image";
import Link from "next/link";
import Container from "@/components/common/Container";

/**
 * Page banner with breadcrumb and hero (title, subtitle, description, CTA, optional image).
 * Used on 911, Motorists, and Service Providers pages.
 *
 * @param {string} breadcrumbLabel - Current page name in breadcrumb (e.g. "911", "Motorists")
 * @param {string} title - Main heading (h1)
 * @param {string} [subtitle] - Subheading below title (h2 or prominent text)
 * @param {string} description - Body paragraph
 * @param {string} ctaLabel - Button text (e.g. "Get started", "Get help now")
 * @param {string} ctaHref - Button link
 * @param {string} [imageSrc] - Optional hero image path
 * @param {string} [imageAlt] - Alt text for image
 * @param {"default"|"circle"} [imageVariant="default"] - "default" = aspect box, "circle" = fixed circular
 * @param {string} [wrapperClassName] - Optional class for hero section wrapper (e.g. "bg-gray-50")
 */
export default function Banner({
  breadcrumbLabel,
  title,
  subtitle,
  description,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
  imageVariant = "default",
  wrapperClassName = "",
}) {
  const heroGrid = (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <h2 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl">
            {subtitle}
          </h2>
        )}
        <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
          {description}
        </p>
        <Link
          href={ctaHref}
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-secondary"
        >
          {ctaLabel}
        </Link>
      </div>

      {imageSrc && (
        <div
          className={
            imageVariant === "circle"
              ? "relative flex justify-center lg:justify-center"
              : "relative aspect-4/3 w-full overflow-hidden rounded-xl lg:aspect-auto lg:min-h-[320px]"
          }
        >
          {imageVariant === "circle" ? (
            <div className="relative h-64 w-64 shrink-0 overflow-hidden rounded-full   sm:h-80 sm:w-80 lg:h-96 lg:w-96">
              <Image
                src={imageSrc}
                alt={imageAlt ?? title}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 320px, 384px"
                priority
              />
            </div>
          ) : (
            <Image
              src={imageSrc}
              alt={imageAlt ?? title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          )}
        </div>
      )}
    </div>
  );

  return (
    < div className="bg-gray-50">
      <Container className="pt-8 pb-4">
        <nav className="mb-8 text-sm text-gray-500" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary">
            Roadside Assistance
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{breadcrumbLabel}</span>
        </nav>

        {wrapperClassName ? (
          <div className={wrapperClassName}>
            <Container className="py-0">{heroGrid}</Container>
          </div>
        ) : (
          heroGrid
        )}
      </Container>
    </div>
  );
}
