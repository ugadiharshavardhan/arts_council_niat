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
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D98C5B]/15 text-[#D98C5B] border border-[#D98C5B]/35 mb-3 shadow-sm">
          {badge}
        </span>
      )}
      {eyebrow && (
        <span className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#D98C5B] mb-2 font-mono">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-[#F5E6D3] font-serif leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-[#E7C59F] max-w-2xl font-light leading-relaxed">
          {description}
        </p>
      )}
      <div className={`mt-4 h-0.5 w-12 bg-[#D98C5B] rounded-full ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
};
