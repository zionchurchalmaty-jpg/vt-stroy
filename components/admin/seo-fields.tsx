"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { SEOData } from "@/lib/firestore/types";

interface SEOFieldsProps {
  value: SEOData;
  onChange: (seo: SEOData) => void;
  defaultTitle?: string;
  image?: string;
}

export function SEOFields({ value, onChange, defaultTitle }: SEOFieldsProps) {
  const updateField = <K extends keyof SEOData>(
    field: K,
    fieldValue: SEOData[K],
  ) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <h3 className="font-medium text-navy">SEO Settings</h3>

      <div className="space-y-2">
        <Label htmlFor="metaTitle">Meta Title</Label>
        <Input
          id="metaTitle"
          value={value.metaTitle || ""}
          onChange={(e) => updateField("metaTitle", e.target.value)}
          placeholder={defaultTitle || "Leave empty to use post title"}
        />
        {/* Character counter for search engine optimization */}
        <p className="text-xs text-muted-foreground">
          {(value.metaTitle || defaultTitle || "").length}/60 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="metaDescription">Meta Description</Label>
        <Textarea
          id="metaDescription"
          value={value.metaDescription || ""}
          onChange={(e) => updateField("metaDescription", e.target.value)}
          placeholder="A brief description for search engines..."
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          {(value.metaDescription || "").length}/160 characters
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="canonicalUrl">Canonical URL</Label>
        <Input
          id="canonicalUrl"
          value={value.canonicalUrl || ""}
          onChange={(e) => updateField("canonicalUrl", e.target.value)}
          placeholder="https://example.com/original-page"
        />
        <p className="text-xs text-muted-foreground">
          Leave empty unless this content exists elsewhere
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="noIndex">Hide from Search Engines</Label>
          <p className="text-xs text-muted-foreground">
            Prevent this page from being indexed
          </p>
        </div>
        <Switch
          id="noIndex"
          checked={value.noIndex || false}
          onCheckedChange={(checked) => updateField("noIndex", checked)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="schemaMarkup">Код JSON-LD</Label>
        <Textarea
          id="schemaMarkup"
          value={value.schemaMarkup || ""}
          onChange={(e) => onChange({ ...value, schemaMarkup: e.target.value })}
          className="min-h-[150px] font-mono text-xs"
        />
      </div>
    </div>
  );
}
