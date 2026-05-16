import { useEffect, useRef } from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

export function AnimatedBackground({ children }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 0.5;
        this.alpha = Math.random() * 0.5 + 0.2;
        const colors = ['#FF2B2B', '#D1001F', '#8A0000', '#ff4444'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;

        this.alpha += (Math.random() - 0.5) * 0.02;
        this.alpha = Math.max(0.1, Math.min(0.6, this.alpha));
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(255, 43, 43, 0.1)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] overflow-hidden">
      {/* Canvas for particle effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ zIndex: 0 }}
      />

      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0F1115] to-[#0a0a0f]" />

      {/* Large blur spheres - Red neon ambient */}
      <div
        className="absolute top-[-10%] left-[10%] w-[800px] h-[800px] bg-[#FF2B2B]/5 rounded-full blur-[150px] animate-pulse"
        style={{ animationDuration: '8s' }}
      />

      <div
        className="absolute bottom-[-10%] right-[5%] w-[700px] h-[700px] bg-[#D1001F]/6 rounded-full blur-[140px] animate-pulse"
        style={{ animationDuration: '10s', animationDelay: '2s' }}
      />

      <div
        className="absolute top-[40%] left-[60%] w-[500px] h-[500px] bg-[#8A0000]/8 rounded-full blur-[120px] animate-pulse"
        style={{ animationDuration: '12s', animationDelay: '4s' }}
      />

      {/* Horizontal light streaks */}
      <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF2B2B]/20 to-transparent blur-[2px]" />
      <div className="absolute top-[60%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D1001F]/15 to-transparent blur-[2px]" />
      <div className="absolute top-[80%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF2B2B]/10 to-transparent blur-[2px]" />

      {/* Vertical light beams */}
      <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#FF2B2B]/10 to-transparent blur-[3px]" />
      <div className="absolute right-[20%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#D1001F]/8 to-transparent blur-[3px]" />

      {/* Grid overlay - subtle tech pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 43, 43, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 43, 43, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Vignette effect - deeper shadows at edges */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(5,5,10,0.8)_100%)]" />

      {/* Scanline effect - subtle horizontal lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 43, 43, 0.03) 2px, rgba(255, 43, 43, 0.03) 4px)'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
