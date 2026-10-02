import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  size?: "default" | "narrow" | "wide";
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  id,
  size = "default",
}) => {
  const sizeClasses = {
    narrow: "max-w-5xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
  };

  return (
    <div
      id={id}
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
};
