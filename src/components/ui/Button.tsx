import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isExternal?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  className = "",
  isExternal = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4845A]/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none tracking-wide";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[#8B2E2E] text-[#FAF0E6] hover:bg-[#5C1A1A] shadow-md shadow-[#8B2E2E]/30 font-semibold",
    secondary:
      "bg-[#2A1014] text-[#FAF0E6] hover:bg-[#3D2018] border border-[#3D2018] shadow-sm",
    outline:
      "border border-[#3D2018] text-[#C4A882] hover:border-[#D4845A]/60 hover:text-[#D4845A] hover:bg-[#D4845A]/10 backdrop-blur-sm",
    ghost:
      "text-[#C4A882] hover:text-[#D4845A] hover:bg-[#2A1014]/50",
    gold:
      "bg-[#D4845A] text-[#1C0F0A] font-semibold hover:bg-[#E8C87A] shadow-md shadow-[#D4845A]/30",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          className={combinedClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
          <span>{children}</span>
          {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
    </button>
  );
};
