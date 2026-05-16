import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'neon' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg relative overflow-hidden group',
          'focus:outline-none focus:ring-2 focus:ring-[#FF2B2B]/50 focus:ring-offset-2 focus:ring-offset-transparent',
          'active:scale-95',
          {
            primary: 'bg-gradient-to-r from-[#D1001F] to-[#FF2B2B] hover:from-[#FF2B2B] hover:to-[#D1001F] text-white shadow-lg shadow-[rgba(255,43,43,0.3)] hover:shadow-xl hover:shadow-[rgba(255,43,43,0.5)] hover:-translate-y-0.5',
            secondary: 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] text-[#F5F5F5] border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,43,43,0.3)] backdrop-blur-sm',
            ghost: 'hover:bg-[rgba(255,43,43,0.1)] text-[#9CA3AF] hover:text-[#FF2B2B] hover:shadow-[inset_0_0_20px_rgba(255,43,43,0.05)]',
            glass: 'bg-[rgba(15,15,18,0.5)] hover:bg-[rgba(15,15,18,0.7)] backdrop-blur-xl border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,43,43,0.3)] text-[#F5F5F5] hover:shadow-lg hover:shadow-[rgba(255,43,43,0.15)]',
            neon: 'bg-transparent text-[#FF2B2B] border-2 border-[#FF2B2B] hover:bg-[#FF2B2B] hover:text-white shadow-[0_0_15px_rgba(255,43,43,0.3)] hover:shadow-[0_0_30px_rgba(255,43,43,0.6)] hover:-translate-y-0.5',
            outline: 'bg-transparent text-[#F5F5F5] border border-[rgba(255,43,43,0.3)] hover:border-[#FF2B2B] hover:bg-[rgba(255,43,43,0.05)] hover:shadow-[0_0_20px_rgba(255,43,43,0.2)] hover:-translate-y-0.5'
          }[variant],
          {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base',
            xl: 'px-8 py-4 text-lg'
          }[size],
          className
        )}
        {...props}
      >
        {/* Animated glow effect on hover */}
        {(variant === 'primary' || variant === 'neon' || variant === 'outline') && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute top-0 left-[-100%] w-[100%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-[shimmer_1.5s_ease-in-out_infinite]" />
          </div>
        )}
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {props.children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
