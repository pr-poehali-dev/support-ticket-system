import React from "react";
import * as LucideIcons from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  fallback?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  fallback = "Circle",
}) => {
  const IconComponent =
    (LucideIcons as any)[name] || (LucideIcons as any)[fallback];

  if (!IconComponent) {
    return <div className={`w-${size} h-${size} ${className}`} />;
  }

  return <IconComponent size={size} className={className} />;
};

export default Icon;
