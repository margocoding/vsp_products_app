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
          'focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:ring-offset-2 focus:ring-offset-transparent',
          {
            primary: 'bg-gradient-to-r from-red-900/60 to-red-950/60 hover:from-red-800/50 hover:to-red-900/50 text-red-200 shadow-md shadow-red-950/15 border border-red-800/25',
            secondary: 'bg-zinc-800/40 hover:bg-zinc-700/30 text-zinc-300 border border-zinc-700/30',
            ghost: 'hover:bg-red-500/3 text-zinc-400 hover:text-red-300',
            glass: 'bg-white/2 hover:bg-white/4 backdrop-blur-xl border border-white/6 text-zinc-300 hover:border-red-500/15'
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
