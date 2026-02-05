import { Star } from "lucide-react";
import Container from "@/components/common/Container";
import Heading2 from "@/components/common/Heading2";
import Paragraph from "@/components/common/Paragraph";

const testimonials = [
  {
    title: "Heaven sent",
    body: "This service was Heaven sent!! Claudio was very kind and patient with me, and he fixed our flat quickly. I will happily call you again if I ever need roadside assistance! Thank you!!!",
    source: "Google Reviews",
  },
  {
    title: "Best decision I could had made",
    body: "When I tell you these guys were all some!! I couldn't ask for a better service and dedication to get the job fix!! They even went the extra mile to make sure I was ok until my partner arrive because I was afraid of driving my spare!! Choosing them was the best decision I could had made during an emergency!!",
    source: "Google Reviews",
  },
  {
    title: "Showed up 15 minutes",
    body: "Absolute lifesavers! Showed up 15 minutes after I submitted my request online!",
    source: "Google Reviews",
  },
  {
    title: "Fast service and multiple pricing",
    body: "Awesome how I can get fast service and multiple pricing all in one place!!! Going to cancel my insurance roadside assistance! Curbside SOS is way better and faster. Highly recommend trying out.",
    source: "Google Reviews",
  },
  {
    title: "Would highly recommend",
    body: "My technician was impressive, polite, friendly, and competent. Would highly recommend.",
    source: "Google Reviews",
  },
  {
    title: "I am sold",
    body: "Was a little hesitant at first bc I'd never used Curbside SOS before, but now I am sold. Service was easy, quick and solved my issue beautifully. I had a dead battery and needed a jump. Booked online at a great price and help arrived within 30 minutes. If I need roadside assistance again in the future I will definitely use Curbside SOS!",
    source: "Google Reviews",
  },
];

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className="h-5 w-5 fill-[#FAAF03] text-[#FAAF03]"
          aria-hidden
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <Heading2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Customer testimonials
        </Heading2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ title, body, source }, index) => (
            <article
              key={title}
              className="animate-fade-in-up rounded-xl border border-gray-200 bg-white p-5 opacity-0 transition-all duration-700 ease-in-out hover:shadow-md"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StarRating />
              <h3 className="my-3 font-bold text-gray-900 text-lg md:text-[22px]">&quot;{title}&quot;</h3>
              <Paragraph className="">
                {body}
              </Paragraph>
              <p className="mt-4 text-xs text-gray-500">{source}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
