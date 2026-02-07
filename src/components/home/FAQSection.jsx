import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Container from "@/components/common/Container";
import Paragraph from "@/components/common/Paragraph";

const faqs = [
  {
    question: "How does Curbside SOS work?",
    answer:
      "Submit your location and vehicle issue through our app or website. We match you with licensed providers nearby who send quotes and ETAs. You choose a provider and they come to you.",
  },
  {
    question: "Do providers carry insurance?",
    answer:
      "Yes. All providers in our network are licensed and insured. We verify credentials before they can accept jobs.",
  },
  {
    question: "What vehicles do you cover besides cars?",
    answer:
      "We cover cars, trucks, SUVs, motorcycles, and RVs. Select your vehicle type when requesting help.",
  },
  {
    question: "How long does it take for roadside assistance to arrive?",
    answer:
      "Most providers arrive within 15–30 minutes. You'll see ETAs when you receive quotes so you can choose the fastest option.",
  },
  {
    question:
      "Should I stay inside or outside of my vehicle while waiting for help?",
    answer:
      "If you're in a safe location, stay inside your vehicle with your seatbelt on. If you're on a busy road, move to a safe spot off the roadway if possible.",
  },
  {
    question: "Should I tip my roadside assistance provider?",
    answer:
      "Tipping is optional but appreciated. If you're happy with the service, a tip is a great way to show thanks.",
  },
];

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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <Container>
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            FAQs
          </h2>
          <div className="mt-10 border border-gray-300 rounded-lg overflow-hidden">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href="/faqs"
              className="text-sm font-medium text-gray-900 underline hover:text-primary"
            >
              SEE MORE
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
