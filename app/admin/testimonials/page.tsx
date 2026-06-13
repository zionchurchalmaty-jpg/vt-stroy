import { getAdminContent } from "@/lib/firestore/client-content";
import { ContentManager } from "@/components/admin/content-manager";
import { Metadata } from "next";

export const metadata: Metadata = { title: "Управление отзывами | Админка" };
export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const testimonials = await getAdminContent("testimonials");

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#202124] font-sans p-6 md:p-10">
      <ContentManager 
        initialItems={testimonials}
        contentType="testimonials" 
        title="Отзывы клиентов"
        createLink="/admin/testimonials/new"
      />
    </div>
  );
}