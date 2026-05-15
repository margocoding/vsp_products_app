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
        'bg-white/4 backdrop-blur-xl border border-white/8 rounded-xl',
        hover && 'hover:bg-white/8 hover:border-red-500/20 transition-all duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}
