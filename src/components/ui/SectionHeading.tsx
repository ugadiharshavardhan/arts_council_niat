import React from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  badge?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  badge,
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={`flex flex-col mb-10 md:mb-16 ${alignmentClasses[align]} ${className}`}>
      {badge && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-400/10 text-amber-300 border border-amber-400/20 mb-3">
          {badge}
        </span>
      )}
      {eyebrow && (
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-amber-400/90 mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-zinc-100 font-serif leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      )}
      <div className={`mt-4 h-0.5 w-12 bg-amber-400/60 rounded-full ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
};
