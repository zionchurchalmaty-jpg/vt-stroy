"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Content } from "@/lib/firestore/types";

interface TestimonialsSliderProps {
  testimonials: Content[];
}

export function TestimonialsSlider({ testimonials }: TestimonialsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex]);

  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Шапка секции */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <h3 className="text-[#f99c00] text-sm font-bold uppercase tracking-widest mb-3">
              Мнения заказчиков
            </h3>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1f2c] leading-tight">
              Отзывы клиентов
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center border-2 border-[#1a1f2c] text-[#1a1f2c] hover:bg-[#1a1f2c] hover:text-white transition-colors duration-300 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center border-2 border-[#1a1f2c] text-[#1a1f2c] hover:bg-[#1a1f2c] hover:text-white transition-colors duration-300 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden -mx-4 px-4 py-4">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
              >
                <div className="group relative bg-white p-8 md:p-10 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.07)] transition-shadow duration-300 h-full flex flex-col rounded-sm border border-gray-100">
                  
                  <div className="absolute top-[-1px] left-[-1px] w-3 h-3 border-t-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
                  <div className="absolute top-[-1px] right-[-1px] w-3 h-3 border-t-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  <div className="absolute bottom-[-1px] left-[-1px] w-3 h-3 border-b-[2px] border-l-[2px] border-[#f99c00] transition-transform duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
                  <div className="absolute bottom-[-1px] right-[-1px] w-3 h-3 border-b-[2px] border-r-[2px] border-[#f99c00] transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />

                  <div className="absolute top-1/2 left-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-1/2 right-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute left-1/2 top-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute left-1/2 bottom-[-2px] w-1 h-1 bg-[#f99c00] rounded-full -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#f99c00]" fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-gray-500 italic text-[15px] leading-relaxed mb-8 flex-grow">
                    {testimonial.content}
                  </p>

                  <div className="w-full h-[1px] bg-gray-100 mb-6" />

                  <div>
                    <h4 className="text-[#1a1f2c] font-bold text-[17px] mb-1">
                      {testimonial.title}
                    </h4>
                    {testimonial.role && (
                      <p className="text-[#f99c00] text-[13px] font-medium">
                        {testimonial.role}
                      </p>
                    )}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          <div className="flex h-1 bg-gray-200 w-24 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#f99c00] transition-all duration-500 ease-in-out"
              style={{ 
                width: `${maxIndex > 0 ? ((currentIndex / maxIndex) * 100) : 100}%` 
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}