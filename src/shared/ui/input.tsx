import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  variant?: 'default' | 'neon' | 'minimal';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-[rgba(15,15,18,0.5)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] focus:border-[rgba(255,43,43,0.5)] focus:ring-2 focus:ring-[#FF2B2B]/20 hover:border-[rgba(255,255,255,0.2)]',
      neon: 'bg-[rgba(10,10,13,0.6)] backdrop-blur-xl border border-[rgba(255,43,43,0.3)] focus:border-[#FF2B2B] focus:ring-2 focus:ring-[#FF2B2B]/30 hover:border-[#FF2B2B] hover:shadow-[0_0_15px_rgba(255,43,43,0.15)]',
      minimal: 'bg-transparent border-b border-[rgba(255,255,255,0.2)] focus:border-[#FF2B2B] rounded-none focus:ring-0 hover:border-[rgba(255,255,255,0.3)]'
    };

    return (
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#FF2B2B] transition-colors duration-300">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full backdrop-blur-xl transition-all duration-300",
            "text-[#F5F5F5] placeholder:text-[#6B7280]",
            "focus:outline-none",
            icon && "pl-10",
            variant === 'minimal' ? "px-0 py-2" : "px-4 py-2.5 rounded-lg",
            variants[variant],
            className,
          )}
          {...props}
        />
        
        {/* Animated glow line on focus */}
        {variant !== 'minimal' && (
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF2B2B] to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
