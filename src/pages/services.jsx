  import Head from "next/head";
  import Image from "next/image";
  import Link from "next/link";
  import Header from "@/components/home/Header";
  import Footer from "@/components/home/Footer";
  import InnerPageLayout from "@/components/common/InnerPageLayout";
  import servicesData from "@/data/services.json";
  import { ArrowRight, ChevronRight } from "lucide-react";

  const BRING_EQUIPMENT_IMAGES = {
    "flat-tire": "/st-images/bring_equipment/flat-tire.png",
    "wont-start": "/st-images/bring_equipment/won_t-start.png",
    "locked-out": "/st-images/bring_equipment/locked-out.png",
    "out-of-gas": "/st-images/bring_equipment/out-fo-gas.webp",
    "basic-tow": "/st-images/bring_equipment/basic-tow.png",
    "winch-out": "/st-images/bring_equipment/winch-out.png",
  };

  const SAFETY_INTRO =
    "This safety guide provides crucial advice for stranded motorists, detailing steps from assessing your situation to safely getting help, including utilizing Curbside SOS for instant connection to roadside assistance. It emphasizes the importance of preparing an emergency kit, ensuring visibility, and maintaining safety while awaiting professional help, aiming to equip drivers with the knowledge to handle unexpected breakdowns or accidents.";

  const SERVICE_CONTENT = {
    "flat-tire": {
      caption:
        "A roadside assistance technician helps change the tire for a motorist outside a supermarket.",
      description:
        "Don't wait until you're stranded on the side of the road with a flat tire or other tire-related issue. Curbside SOS provides instant assistance to stranded motorists, connecting you to a nationwide network of over 4000 independent roadside assistance providers, so you can get local help, when you need it.",
      buttonLabel: "Read The Flat Tire Guide",
      },
    "wont-start": {
      caption:
        "A roadside assistance technician helps jump start a car for a motorist in a city.",
      description:
        "This guide delves into vehicle battery health and jump-start procedures. Curbside SOS offers a connection to over 4000 roadside assistance providers for drivers encountering battery and jump-start issues, alongside expert advice on prolonging battery life and recognizing when professional help is needed.",
      buttonLabel: "Read The BatteryGuide",
    },
    "locked-out": {
      caption:
        "A roadside assistance technician helps a motorist locked out of their car in the countryside.",
      description:
        "In an ideal world, you could prevent a car lockout from ever happening to you, and this guide offers information, tips, and advice for how to do just that. It also covers what to do if you do get locked out of your vehicle, and how to get the professional help you need.",
      buttonLabel: "Read The Locked Out Guide",
    },
    "out-of-gas": {
      caption:
        "A roadside assistance technician fills the gas tank for a motorist in the countryside.",
      description:
        "In the event your vehicle runs out of gas, Curbside SOS can quickly connect you to local professional roadside assistance providers, through our nationwide network of more than 4,000. But before you get to that point, read our comprehensive guide, filled with essential knowledge and strategies to calmly and safely handle the situation.",
      buttonLabel: "Read The Out of Gas Guide",
    },
    "basic-tow": {
      caption:
        "A roadside assistance technician lifting a stranded motorist's car onto a tow truck on the highway.",
      description:
        "This guide offers comprehensive insights on towing services for stranded motorists, including when to seek towing, ensuring roadside safety, understanding vehicle-specific towing needs, and the various types of tow trucks available.",
      buttonLabel: "Read The Basic Tow Guide",
    },
    "winch-out": {
      caption:
        "A roadside assistance technician uses a winch out to help a motorist stuck in the snow.",
      description:
        "This Curbside SOS guide provides practical advice for motorists who find their vehicle stuck due to various reasons, such as mechanical failures or challenging terrain, and also details steps to prepare for the tow truck's arrival.",
      buttonLabel: "Read The Winch Out Guide",
    },
  };

  const ABOUT_CURBSIDE_SOS = {
    title: "About Curbside SOS",
    description:
      "Curbside SOS is an open marketplace for motorists who require roadside assistance & towing help but don't want all of the costs & complications that come with road club memberships. We connect motorists in need with emergency assistance professionals to allow them to directly quote how much they would charge for the job in real time with more transparency and tracking than alternatives, getting you back on the road as quickly as possible, for less than you'd think.",
  };

  const services = servicesData.services || [];

  function getBringEquipmentImage(serviceId) {
    return (
      BRING_EQUIPMENT_IMAGES[serviceId] ??
      "/st-images/bring_equipment/flat-tire.png"
    );
  }

  function getServiceContent(serviceId) {
    return (
      SERVICE_CONTENT[serviceId] ?? {
        caption: "",
        description: "Get help from a nearby Technician.",
      }
    );
  }

  export default function ServicesPage() {
    return (
      <>
        <Head>
          <title>Roadside Assistance Services | Curbside SOS</title>
        </Head>
        <div className="min-h-screen bg-white text-gray-900">
          <Header />
          <main>
            <InnerPageLayout
              breadcrumbLabel="Roadside Assistance Services"
              rightCardVariant="help"
            >
              <h1 className="text-5xl font-bold tracking-tight text-gray-900">
                Roadside Assistance Services
              </h1>
              <h2 className="mt-6 text-4xl font-semibold text-gray-900">
                Safety tips
              </h2>
              <p className="mt-3 text-base leading-relaxed text-gray-700 sm:text-lg">
                {SAFETY_INTRO}
              </p>

              <div className="mt-12 space-y-14">
                {services.map((service) => {
                  const imageSrc = getBringEquipmentImage(service.id);
                  const content = getServiceContent(service.id);
                  return (
                    <section
                      key={service.id}
                      className="border-b border-gray-200 pb-4"
                    >
                      <h2 className="text-4xl font-bold text-gray-900">
                            {service.name}
                          </h2>
                      <div className="flex flex-row gap-0 ">
                        <div className="min-w-[40%] flex justify-center items-end">
                          <Image
                            src={imageSrc}
                            alt={content.caption || service.name}
                            width={500}
                            height={500}
                            className="w-full h-auto"
                          />
                        </div>
                        <div className="flex flex-col justify-center px-6 ">
                          
                          <p className="text-base leading-tight text-gray-700">
                            {content.description}
                          </p>
                          <Link
                            href={`/services/${service.id}`}
                            className="mt-6 inline-flex uppercase w-fit items-center gap-1 text-sm font-semibold text-primary hover:text-secondary"
                          >
                            {content.buttonLabel}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </section>
                  );
                })}
              </div>

              <section className="mt-16">
                <h2 className="text-4xl font-bold text-gray-900">
                  {ABOUT_CURBSIDE_SOS.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-gray-700">
                  {ABOUT_CURBSIDE_SOS.description}
                </p>
              </section>
            </InnerPageLayout>
          </main>
          <Footer />
        </div>
      </>
    );
  }

