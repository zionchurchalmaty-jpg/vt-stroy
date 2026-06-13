import { getPublishedContent } from "@/lib/firestore/client-content";
import { TestimonialsSlider } from "./TestimonialsSlider";

export default async function Testimonials() {
  const testimonials = await getPublishedContent("testimonials");

  if (!testimonials || testimonials.length === 0) {
    return null; 
  }

  return <TestimonialsSlider testimonials={testimonials} />;
}