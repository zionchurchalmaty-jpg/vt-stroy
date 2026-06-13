import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ContactBlock from "@/components/ContactBlock";
import Advantages from "@/components/Advantages";
import Portfolio from "@/components/Portfolio";
import Faq from "@/components/Faq";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <ContactBlock />
      <Advantages />
      <Portfolio />
      <Testimonials />
      <Faq />
    </main>
  );
}