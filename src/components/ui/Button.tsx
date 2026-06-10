import { ButtonHTMLAttributes } from "react";

export default function Button({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button
        className={`
              flex items-center gap-2
              px-4 py-3
              text-xs tracking-[1.5px]
              uppercase font-medium
              transition-all duration-300
              border border-red-500/30
              hover:border-red-500/50
              active:scale-95
              disabled:opacity-50
              cursor-pointer
              ${className}
            `}
        {...props}
    >
        {children}
    </button>
}