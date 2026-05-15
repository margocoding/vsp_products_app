import { cn } from '@/shared/lib/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'used' | 'new' | 'available';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-medium backdrop-blur-sm',
        {
          default: 'bg-zinc-800/50 text-zinc-300 border border-zinc-700/50',
          used: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
          new: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
          available: 'bg-red-500/20 text-red-400 border border-red-500/30'
        }[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
