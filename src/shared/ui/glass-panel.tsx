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
    default: 'bg-[rgba(15,15,18,0.55)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]',
    card: 'bg-[rgba(15,15,18,0.65)] backdrop-blur-2xl border border-[rgba(255,43,43,0.15)] shadow-lg shadow-[rgba(255,43,43,0.05)]',
    sidebar: 'bg-[rgba(10,10,13,0.7)] backdrop-blur-2xl border-r border-[rgba(255,43,43,0.1)]',
    navbar: 'bg-[rgba(5,5,8,0.85)] backdrop-blur-2xl border-b border-[rgba(255,43,43,0.2)] shadow-lg shadow-[rgba(255,43,43,0.1)]',
    accent: 'bg-[rgba(20,10,12,0.6)] backdrop-blur-2xl border border-[rgba(255,43,43,0.3)] shadow-lg shadow-[rgba(255,43,43,0.15)]'
  };

  return (
    <div
      className={cn(
        'rounded-xl',
        variants[variant],
        hover && 'transition-all duration-300 ease-out hover:bg-[rgba(15,15,18,0.75)] hover:border-[rgba(255,43,43,0.3)] hover:shadow-xl hover:shadow-[rgba(255,43,43,0.15)] hover:-translate-y-0.5 hover:scale-[1.005] group',
        className
      )}
    >
      {/* Subtle inner glow overlay */}
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,43,43,0.03) 0%, transparent 50%, rgba(255,43,43,0.02) 100%)',
        }}
      />
      
      {/* Animated border sweep on hover */}
      <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-100%] w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#FF2B2B]/50 to-transparent group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
      </div>
      
      {children}
    </div>
  );
}
