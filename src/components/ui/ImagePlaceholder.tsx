"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  aspectRatio?: "video" | "square" | "portrait" | "auto";
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  alt,
  className = "",
  fill = false,
  width,
  height,
  priority = false,
  aspectRatio = "auto",
}) => {
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    video: "aspect-[16/9]",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    auto: "",
  }[aspectRatio];

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 text-zinc-500 overflow-hidden ${aspectClass} ${className}`}
      >
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-medium">
          [Asset Placeholder]
        </span>
        <span className="text-[10px] text-zinc-600 mt-1 max-w-[80%] text-center truncate">
          {alt}
        </span>
      </div>

    );
  }

  if (fill) {
    return (
      <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width || 600}
        height={height || 400}
        priority={priority}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        onError={() => setHasError(true)}
      />
    </div>
  );
};
