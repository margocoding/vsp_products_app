import { cn } from '@/shared/lib/cn';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'default' | 'card' | 'sidebar' | 'navbar' | 'accent';
}

export function GlassPanel({ 
  children, 
  className, 
  hover = false,
  variant = 'default'
}: GlassPanelProps) {
  const variants = {
    default: 'bg-[rgba(15,15,18,0.45)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)]',
    card: 'bg-[rgba(15,15,18,0.55)] backdrop-blur-2xl border border-[rgba(255,43,43,0.12)] shadow-lg shadow-[rgba(255,43,43,0.04)]',
    sidebar: 'bg-[rgba(10,10,13,0.6)] backdrop-blur-2xl border-r border-[rgba(255,43,43,0.08)]',
    navbar: 'bg-[rgba(5,5,8,0.75)] backdrop-blur-2xl border-b border-[rgba(255,43,43,0.15)] shadow-lg shadow-[rgba(255,43,43,0.08)]',
    accent: 'bg-[rgba(20,10,12,0.5)] backdrop-blur-2xl border border-[rgba(255,43,43,0.25)] shadow-lg shadow-[rgba(255,43,43,0.12)]'
  };

  return (
    <div
      className={cn(
        'rounded-xl relative overflow-hidden',
        variants[variant],
        hover && 'transition-all duration-300 ease-out hover:bg-[rgba(15,15,18,0.65)] hover:border-[rgba(255,43,43,0.25)] hover:shadow-xl hover:shadow-[rgba(255,43,43,0.12)] hover:-translate-y-0.5 group',
        className
      )}
    >
      {/* Subtle inner glow overlay on hover */}
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,43,43,0.02) 0%, transparent 50%, rgba(255,43,43,0.01) 100%)',
        }}
      />
      
      {children}
    </div>
  );
}
