"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "./auth-provider";
import { createContent, updateContent, deleteContent } from "@/lib/firestore/client-content";
import type { Content } from "@/lib/firestore/types";
import { Loader2, Save, Trash2, Star } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface TestimonialFormProps {
  initialData?: Content;
  isEditing?: boolean;
}

export function TestimonialForm({ initialData, isEditing = false }: TestimonialFormProps) {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState(initialData?.title || "");
  const [role, setRole] = useState(initialData?.role || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [rating, setRating] = useState<number>(initialData?.rating || 5);
  
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!user) return;
    if (!title.trim() || !content.trim()) {
      setError("Имя и текст отзыва обязательны");
      return;
    }

    setError(null);
    setSaving(true);

    try {
      const input: any = {
        contentType: "testimonials",
        title: title.trim(),
        role: role.trim(),
        content: content.trim(),
        rating,
        status: "published",
      };

      if (isEditing && initialData) {
        await updateContent(initialData.id, input);
      } else {
        await createContent(input, user.uid, user.displayName || user.email || "Admin");
      }

      router.push("/admin/testimonials");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData) return;
    setDeleting(true);
    try {
      await deleteContent(initialData.id, "testimonials");
      router.push("/admin/testimonials");
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
      setDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between bg-white p-4 md:px-6 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-xl font-extrabold text-gray-900">
          {isEditing ? "Редактирование отзыва" : "Добавление отзыва"}
        </h1>
        <div className="flex items-center gap-3">
          {isEditing && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200">
                  <Trash2 className="mr-2 h-4 w-4" /> Удалить
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Удалить этот отзыв?</AlertDialogTitle>
                  <AlertDialogDescription>Это действие нельзя отменить.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                    {deleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button size="sm" onClick={handleSubmit} disabled={saving} className="bg-[#f99c00] hover:bg-[#e08c00] text-gray-900 font-bold px-6">
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />} Сохранить
          </Button>
        </div>
      </div>

      {error && <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 border border-red-100">{error}</div>}

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Имя клиента</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Алибек Джаксыбеков" className="bg-gray-50 focus-visible:ring-[#f99c00]" />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700 font-bold">Должность / Компания (необязательно)</Label>
            <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Директор ТОО «СтройГрупп»" className="bg-gray-50 focus-visible:ring-[#f99c00]" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-bold">Оценка</Label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button key={num} type="button" onClick={() => setRating(num)} className="focus:outline-none">
                <Star className={`w-8 h-8 ${rating >= num ? "text-[#f99c00] fill-current" : "text-gray-300"}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 font-bold">Текст отзыва</Label>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Напишите отзыв здесь..." rows={5} className="bg-gray-50 focus-visible:ring-[#f99c00]" />
        </div>
      </div>
    </div>
  );
}