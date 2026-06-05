import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { getPublishedContent } from "@/lib/firestore/client-content";
import Image from "next/image";

export default async function Portfolio() {
  const projectsData = await getPublishedContent("projects", 6);

  const projects = projectsData;

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <h3 className="text-[#f99c00] text-sm font-bold uppercase tracking-widest mb-3">
              Реализованные объекты
            </h3>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
              Наши работы
            </h2>
          </div>
          <Link href="/projects" className="group flex items-center gap-2 text-[#f99c00] font-bold hover:text-[#e08c00] transition-colors text-[15px]">
            Все реализованные объекты 
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project: any, idx: number) => (
            <Link href={`/projects/${project.slug || project.id}`} key={idx} className="group block relative rounded-sm">
              
              <div className="absolute top-[-2px] left-[-2px] w-3 h-3 border-t-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 z-30" />
              <div className="absolute top-[-2px] right-[-2px] w-3 h-3 border-t-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 z-30" />
              <div className="absolute bottom-[-2px] left-[-2px] w-3 h-3 border-b-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1.5 group-hover:translate-y-1.5 z-30" />
              <div className="absolute bottom-[-2px] right-[-2px] w-3 h-3 border-b-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1.5 z-30" />

              <div className="absolute top-1/2 left-[-2px] w-1.5 h-1.5 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
              <div className="absolute top-1/2 right-[-2px] w-1.5 h-1.5 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
              <div className="absolute left-1/2 top-[-2px] w-1.5 h-1.5 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
              <div className="absolute left-1/2 bottom-[-2px] w-1.5 h-1.5 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />

              <div className="relative h-[320px] overflow-hidden rounded-sm bg-[#1C2331] shadow-sm group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-shadow duration-500">
                
                <div className="absolute inset-0 bg-[#2A3245] group-hover:scale-110 transition-transform duration-700 ease-out z-0 flex items-center justify-center">
                   {project.image ? (
                     <Image 
                       src={project.image} 
                       alt={project.title?.ru || project.title || "Фото объекта"} 
                       fill 
                       className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                     />
                   ) : (
                     <span className="text-gray-500 text-sm font-medium tracking-wide">Фото объекта</span>
                   )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2331]/95 via-[#1C2331]/30 to-transparent z-10 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-white font-extrabold text-[19px] leading-snug mb-3 group-hover:text-[#f99c00] transition-colors duration-300 line-clamp-2">
                    {project.title?.ru || project.title}
                  </h4>
                  <div className="flex items-center text-[#f99c00] text-[13px] font-semibold tracking-wide">
                    <MapPin className="w-4 h-4 mr-1.5" /> {project.location?.ru || project.location || "Локация не указана"}
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
