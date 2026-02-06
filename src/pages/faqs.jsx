import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Head from "next/head";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import InnerPageLayout from "@/components/common/InnerPageLayout";
import Paragraph from "@/components/common/Paragraph";
import faqsData from "@/data/faqs.json";

function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b bg-white p-5 border-gray-300">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 text-left font-medium text-gray-900 transition-colors hover:text-primary"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-bold text-gray-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-5 pr-8 text-gray-600">
            <Paragraph>{answer}</Paragraph>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FaqsPage() {
  const categories = faqsData.categories || [];
  const [openByCategory, setOpenByCategory] = useState({});

  return (
    <>
      <Head>
        <title>Roadside FAQs | Curbside SOS</title>
      </Head>
      <div className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>
          <InnerPageLayout breadcrumbLabel="FAQs" rightCardVariant="help">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h1>
            <p className="mt-3 text-base text-gray-700 sm:text-lg">
              Find quick answers to common questions about getting roadside
              assistance through Curbside SOS.
            </p>

            <div className="mt-8 space-y-12">
              {categories.map((category) => {
                const openIndex = openByCategory[category.id] ?? null;

                return (
                  <section key={category.id}>
                    <h2 className="text-xl font-bold text-gray-900">
                      {category.title}
                    </h2>
                    <div className="mt-4 border border-gray-300 rounded-lg overflow-hidden">
                      {category.items.map((item, index) => (
                        <FAQItem
                          key={item.question}
                          question={item.question}
                          answer={item.answer}
                          isOpen={openIndex === index}
                          onToggle={() =>
                            setOpenByCategory((prev) => ({
                              ...prev,
                              [category.id]:
                                prev[category.id] === index ? null : index,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </InnerPageLayout>
        </main>
        <Footer />
      </div>
    </>
  );
}

