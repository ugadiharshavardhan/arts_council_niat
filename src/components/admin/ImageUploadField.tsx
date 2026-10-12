"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  Image as ImageIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Link as LinkIcon,
  Cloud,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { uploadImageToSupabase, deleteImageFromSupabase } from "@/lib/dataService";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  folder: "members" | "events" | "winners";
  presets?: string[];
  aspectRatio?: "landscape" | "portrait" | "square";
  helperText?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  folder,
  presets = [],
  aspectRatio = "portrait",
  helperText,
}: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showManualUrl, setShowManualUrl] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSupabaseImage =
    value && value.includes("/storage/v1/object/public/arts-council/");

  const handleFile = async (file: File) => {
    if (!file) return;

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("File exceeds the 10MB upload limit");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select an image file (JPEG, PNG, WebP, SVG, GIF)");
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);
    setUploadSuccess(false);

    try {
      // Passes current image as oldImageUrl so server removes old file from bucket
      const result = await uploadImageToSupabase(file, folder, value);

      if (result.success && result.url) {
        onChange(result.url);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 4000);
      } else {
        setErrorMessage(result.error || "Failed to upload image to Supabase");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "An unexpected error occurred during upload");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleClearImage = async () => {
    if (value && isSupabaseImage) {
      // Purge from storage
      deleteImageFromSupabase(value);
    }
    onChange("");
    setUploadSuccess(false);
    setErrorMessage(null);
  };

  // Determine aspect ratio class
  const aspectClass =
    aspectRatio === "portrait"
      ? "aspect-[3/4] w-24 sm:w-28"
      : aspectRatio === "landscape"
      ? "aspect-[16/9] w-36 sm:w-44"
      : "aspect-square w-24 sm:w-28";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono uppercase tracking-wider text-[#E7C59F]">
          {label}
        </label>
        {isSupabaseImage && (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#D98C5B] bg-[#23120A] px-2 py-0.5 rounded border border-[#6B3B23]">
            <Cloud className="w-3 h-3 text-[#D98C5B]" />
            <span>Supabase Cloud Storage</span>
          </span>
        )}
      </div>

      {/* Main Upload Dropzone & Preview Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative p-4 rounded-xl border transition-all duration-200 bg-[#23120A] ${
          isDragging
            ? "border-[#D98C5B] bg-[#4E2E1E]/50 ring-2 ring-[#D98C5B]/40"
            : "border-[#6B3B23] hover:border-[#D98C5B]/60"
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Preview Box */}
          <div
            className={`relative rounded-lg overflow-hidden bg-[#180C07] border border-[#6B3B23] shrink-0 flex items-center justify-center ${aspectClass}`}
          >
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Image Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-[#E7C59F]/40 p-2 text-center">
                <ImageIcon className="w-6 h-6 mb-1" />
                <span className="text-[9px] font-mono uppercase tracking-wider">
                  No Image
                </span>
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-[#23120A]/85 backdrop-blur-xs flex flex-col items-center justify-center z-10">
                <Loader2 className="w-6 h-6 text-[#D98C5B] animate-spin mb-1" />
                <span className="text-[10px] font-mono text-[#E7C59F]">
                  Uploading...
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons & Status */}
          <div className="flex-1 w-full flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {/* Hidden native input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                  onChange={handleFileChange}
                  className="hidden"
                  id={`file-input-${folder}-${label.replace(/\s+/g, "-")}`}
                />

                {/* Upload Button */}
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D98C5B] text-[#23120A] text-xs font-mono font-bold hover:bg-[#E79E70] transition-colors cursor-pointer shadow-sm disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Uploading to Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>{value ? "Replace with New Image" : "Upload to Supabase"}</span>
                    </>
                  )}
                </button>

                {/* Clear / Delete Button */}
                {value && (
                  <button
                    type="button"
                    onClick={handleClearImage}
                    title="Remove image"
                    className="p-1.5 rounded-lg bg-[#23120A] text-[#E7C59F] hover:text-[#E76F51] hover:bg-[#4E2E1E] border border-[#6B3B23] transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <p className="text-[11px] font-mono text-[#E7C59F]/70">
                Drop image here or click upload. Stored in Supabase bucket{" "}
                <code className="text-[#D98C5B]">arts-council/{folder}</code>.
              </p>
            </div>

            {/* Success Badge */}
            {uploadSuccess && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mt-2 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded">
                <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Uploaded and synchronized to Supabase Storage!</span>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-1.5 text-xs font-mono text-rose-400 mt-2 bg-rose-950/40 border border-rose-800/40 px-2.5 py-1 rounded">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Collapsible Manual URL & Presets Bar */}
        <div className="mt-3 pt-3 border-t border-[#6B3B23]/70">
          <button
            type="button"
            onClick={() => setShowManualUrl(!showManualUrl)}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#E7C59F]/80 hover:text-[#D98C5B] transition-colors cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>
              {showManualUrl ? "Hide manual URL & presets" : "Enter manual URL or choose preset"}
            </span>
            {showManualUrl ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>

          {showManualUrl && (
            <div className="mt-2.5 space-y-2">
              <input
                type="text"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
                placeholder="e.g. /images/... or https://..."
                className="w-full px-3 py-1.5 rounded-lg bg-[#180C07] border border-[#6B3B23] text-xs text-[#F5E6D3] focus:border-[#D98C5B] focus:outline-none font-mono"
              />

              {presets.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-[#E7C59F]/60">Presets:</span>
                  {presets.map((preset, idx) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => onChange(preset)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                        value === preset
                          ? "bg-[#D98C5B] text-[#23120A] border-[#D98C5B] font-bold"
                          : "bg-[#180C07] text-[#E7C59F] border-[#6B3B23] hover:border-[#D98C5B]/50"
                      }`}
                    >
                      Preset #{idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {helperText && (
        <p className="text-[11px] font-mono text-[#E7C59F]/60">{helperText}</p>
      )}
    </div>
  );
}
