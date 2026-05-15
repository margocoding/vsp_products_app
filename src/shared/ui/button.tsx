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
          'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg',
          'focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
          {
            primary: 'bg-gradient-to-r from-red-600 to-crimson hover:from-red-500 hover:to-red-400 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50',
            secondary: 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100 border border-zinc-700/50',
            ghost: 'hover:bg-red-500/10 text-zinc-300 hover:text-red-400',
            glass: 'bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-zinc-100 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/20'
          }[variant],
          {
            sm: 'px-3 py-1.5 text-sm',
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
