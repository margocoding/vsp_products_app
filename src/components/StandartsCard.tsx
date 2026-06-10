import { Plus } from 'lucide-react';

const standards = [
  'GOST R 51685-2013',
  'GOST 8161-75',
  'EN 13674-1',
];

export default function StandardsCard() {
  return (
    <div className="glass-card p-4">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs tracking-widest text-red-500 uppercase">
          STANDARDS
        </span>
        <button className="text-white/30 hover:text-red-500 transition-colors">
          <span className="text-xs">☆</span>
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {standards.map((std) => (
          <p key={std} className="text-[10px] text-white/50 tracking-wide">
            {std}
          </p>
        ))}
      </div>

      <button className="w-full py-2 border border-white/20 text-white/50 text-[10px] tracking-wider hover:border-red-500 hover:text-red-500 transition-all flex items-center justify-center gap-2">
        ALL STANDARDS
        <Plus size={12} />
      </button>
    </div>
  );
}