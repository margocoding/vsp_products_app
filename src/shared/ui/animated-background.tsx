interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
      
      {/* Large blur spheres - Soft Red - No animation for performance */}
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-800/10 rounded-full blur-[120px]"
      />
      
      {/* Large blur spheres - Soft Burgundy/Dark Red */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7f1d1d]/12 rounded-full blur-[100px]"
      />
      
      {/* Purple/Violet sphere - Softer */}
      <div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-900/8 rounded-full blur-[80px]"
      />
      
      {/* Additional crimson glow - Softer */}
      <div
        className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-crimson/6 rounded-full blur-[60px]"
      />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
