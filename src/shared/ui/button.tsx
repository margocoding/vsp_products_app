import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-red-900/30 focus:ring-offset-2 focus:ring-offset-transparent',
          {
            primary: 'bg-red-700 hover:bg-red-800 text-white shadow-md shadow-red-900/20',
            secondary: 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700',
            ghost: 'hover:bg-white/5 text-zinc-400 hover:text-white',
            glass: 'bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-zinc-300 hover:border-white/20'
          }[variant],
          {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-4 py-2 text-sm',
            lg: 'px-6 py-3 text-base'
          }[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
