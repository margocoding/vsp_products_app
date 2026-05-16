import { cn } from "@/shared/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "used" | "new" | "available" | "neon" | "glow";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Badge({
  children,
  variant = "default",
  className,
  size = "md",
}: BadgeProps) {
  const sizes = {
    sm: "px-1.5 py-0.5 text-[10px]",
    md: "px-2 py-0.5 text-xs",
    lg: "px-3 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded backdrop-blur-sm relative overflow-hidden",
        "transition-all duration-300 hover:scale-105",
        {
          default:
            "bg-[rgba(255,255,255,0.05)] text-[#9CA3AF] border border-[rgba(255,255,255,0.1)]",
          used: "bg-[rgba(245,158,11,0.15)] text-[#FBBF24] border border-[rgba(245,158,11,0.3)] shadow-[0_0_10px_rgba(245,158,11,0.1)]",
          new: "bg-[rgba(16,185,129,0.25)] text-[#34D399] border border-[rgba(16,185,129,0.3)] shadow-[0_0_10px_rgba(16,185,129,0.1)]",
          available:
            "bg-[rgba(255,43,43,0.15)] text-[#FF2B2B] border border-[rgba(255,43,43,0.3)] shadow-[0_0_10px_rgba(255,43,43,0.15)]",
          neon: "bg-transparent text-[#FF2B2B] border border-[#FF2B2B] shadow-[0_0_15px_rgba(255,43,43,0.3)]",
          glow: "bg-[rgba(255,43,43,0.2)] text-[#FF2B2B] border border-[rgba(255,43,43,0.4)] shadow-[0_0_20px_rgba(255,43,43,0.4)]",
        }[variant],
        sizes[size],
        className,
      )}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-1">{children}</span>
    </span>
  );
}
