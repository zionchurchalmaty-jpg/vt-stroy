import { getContentByIdAdmin } from "@/lib/firestore/admin-content";
import { TestimonialForm } from "@/components/admin/testimonial-form";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await getContentByIdAdmin(params.id, "testimonials", true);
  if (!testimonial) notFound();

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6 md:p-10">
      <TestimonialForm initialData={testimonial} isEditing />
    </div>
  );
}