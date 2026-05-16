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
        hover && 'transition-all duration-300 ease-out hover:bg-[rgba(15,15,18,0.65)] hover:border-[rgba(255,43,43,0.25)] hover:shadow-xl hover:shadow-[rgba(255,43,43,0.12)] hover:-translate-y-0.5 hover:scale-[1.005] group',
        className
      )}
    >
      {/* Animated background spheres */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[-20%] right-[-10%] w-[200px] h-[200px] bg-[#FF2B2B]/5 rounded-full blur-[60px]"
          style={{ animation: 'breatheLight 8s ease-in-out infinite' }}
        />
        <div 
          className="absolute bottom-[-10%] left-[-5%] w-[180px] h-[180px] bg-[#D1001F]/4 rounded-full blur-[50px]"
          style={{ animation: 'breatheLight 10s ease-in-out infinite', animationDelay: '2s' }}
        />
      </div>
      
      {/* Subtle inner glow overlay */}
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255,43,43,0.02) 0%, transparent 50%, rgba(255,43,43,0.01) 100%)',
        }}
      />
      
      {/* Animated border sweep on hover */}
      <div className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-[-100%] w-[100%] h-[2px] bg-gradient-to-r from-transparent via-[#FF2B2B]/40 to-transparent group-hover:animate-[shimmer_2s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 right-[-100%] w-[100%] h-[1px] bg-gradient-to-l from-transparent via-[#FF2B2B]/30 to-transparent group-hover:animate-[shimmer_3s_ease-in-out_infinite]" />
      </div>
      
      {children}
    </div>
  );
}
