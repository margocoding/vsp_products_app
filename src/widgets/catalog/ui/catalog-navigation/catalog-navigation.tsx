import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface CatalogNavigationProps {
  currentPage: number;
  totalPages: number;
  isTransitioning: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

export function CatalogNavigation({
  currentPage,
  totalPages,
  isTransitioning,
  onPrev,
  onNext,
  onPageChange,
}: CatalogNavigationProps) {
  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <button
        onClick={onPrev}
        disabled={currentPage === 0 || isTransitioning}
        className="w-10 h-10 rounded-full bg-[rgba(10,10,12,0.6)] backdrop-blur-md border border-[rgba(255,43,43,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <ChevronLeft size={20} className="text-[#F5F5F5]" />
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          let pageNum: number;
          if (totalPages <= 5) {
            pageNum = i;
          } else if (currentPage < 3) {
            pageNum = i;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 5 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={i}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentPage === pageNum
                  ? "bg-[#FF2B2B] w-6 shadow-[0_0_10px_rgba(255,43,43,0.6)]"
                  : "bg-[rgba(255,43,43,0.3)] hover:bg-[rgba(255,43,43,0.5)]",
              )}
              aria-label={`Go to page ${pageNum + 1}`}
            />
          );
        })}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage >= totalPages - 1 || isTransitioning}
        className="w-10 h-10 rounded-full bg-[rgba(10,10,12,0.6)] backdrop-blur-md border border-[rgba(255,43,43,0.2)] flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-[rgba(255,43,43,0.5)] hover:shadow-[0_0_20px_rgba(255,43,43,0.3)] disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <ChevronRight size={20} className="text-[#F5F5F5]" />
      </button>
    </div>
  );
}

interface PageIndicatorProps {
  currentPage: number;
  totalPages: number;
}

export function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <div className="text-center mt-4 text-[#9CA3AF] text-xs">
      Страница{" "}
      <span className="text-[#F5F5F5] font-bold neon-text">
        {currentPage + 1}
      </span>{" "}
      из{" "}
      <span className="text-[#F5F5F5] font-bold neon-text">{totalPages}</span>
    </div>
  );
}
