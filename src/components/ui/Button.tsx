import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "neon";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, variant = "default", ...props }, ref) => {
    const base = `
      flex items-center justify-center gap-2
      px-4 py-3
      text-xs tracking-[1.5px] uppercase font-medium
      transition-all duration-300
      cursor-pointer
      active:scale-95
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      default: `
        glass-card
        border border-red-500/30
        text-white
        hover:border-red-500/60
        hover:shadow-[0_0_20px_rgba(255,32,32,0.15)]
        hover:text-red-400
      `,
      neon: `
        btn-neon
      `,
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;