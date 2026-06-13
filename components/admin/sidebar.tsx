"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  LogOut,
  Globe,
  Menu,
  X,
  FolderOpen,
  Star,
} from "lucide-react";

const navItems = [
  { name: "Обзор", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Проекты", href: "/admin/projects", icon: FolderOpen },
  { name: "Записи (Блог)", href: "/admin/content", icon: FileText },
  { name: "Отзывы", href: "/admin/testimonials", icon: Star },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <>
      {/* Mobile top navigation bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#1C2331] text-white border-b border-gray-800 px-4 flex items-center justify-between z-[60]">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-black text-lg tracking-wider"
        >
          VT STROY
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-[#f99c00]" />
          ) : (
            <Menu className="w-6 h-6 text-[#f99c00]" />
          )}
        </button>
      </div>

      {/* Backdrop for mobile navigation */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-[55] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-[#1C2331] text-gray-300 border-r border-gray-800 flex flex-col z-[56] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 hidden lg:flex items-center border-b border-gray-800 px-6">
          <Link
            href="/admin"
            className="flex items-center gap-3 font-black text-xl text-white tracking-widest hover:text-[#f99c00] transition-colors"
          >
            VT STROY
          </Link>
        </div>

        <div className="h-16 lg:hidden" />

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-bold rounded-lg transition-all ${
                  isActive
                    ? "bg-[#f99c00] text-gray-900 shadow-md"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${isActive ? "text-gray-900" : "text-gray-400"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-1.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg w-full transition-colors"
          >
            <Globe className="w-5 h-5 text-[#f99c00]" />
            Открыть сайт
          </Link>

          <button
            onClick={handleLogOut}
            type="button"
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-400 hover:bg-red-500/10 hover:text-red-500 rounded-lg w-full transition-colors text-left"
          >
            <LogOut className="w-5 h-5" />
            Выйти
          </button>
        </div>
      </aside>
    </>
  );
}
