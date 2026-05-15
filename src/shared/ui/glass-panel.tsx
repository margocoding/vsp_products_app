import { cn } from '@/shared/lib/cn';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassPanel({ children, className, hover = false }: GlassPanelProps) {
  return (
    <div
      className={cn(
        'bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl',
        hover && 'hover:bg-white/10 hover:border-red-500/30 transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  );
}
