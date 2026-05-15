import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full bg-white/5 backdrop-blur-xl pl-3 border border-white/10 rounded-lg",
            "text-zinc-100 placeholder:text-zinc-500",
            "focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/30",
            "hover:border-white/20 transition-all duration-300",
            icon && "pl-10",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
