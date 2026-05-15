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
          'focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:ring-offset-2 focus:ring-offset-transparent',
          {
            primary: 'bg-gradient-to-r from-red-800/80 to-red-900/80 hover:from-red-700/70 hover:to-red-800/70 text-red-100 shadow-lg shadow-red-900/20 hover:shadow-red-800/30 border border-red-700/30',
            secondary: 'bg-zinc-800/60 hover:bg-zinc-700/50 text-zinc-200 border border-zinc-700/40',
            ghost: 'hover:bg-red-500/5 text-zinc-400 hover:text-red-300',
            glass: 'bg-white/3 hover:bg-white/5 backdrop-blur-xl border border-white/8 text-zinc-200 hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/10'
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
