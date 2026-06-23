import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";
import { AlertCircle } from "lucide-react";

type BaseProps = {
  label?: string;
  icon?: ReactNode;
  error?: string;
  wrapperClassName?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    textarea?: false;
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    textarea: true;
  };

type Props = InputProps | TextareaProps;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (props, ref) => {
    const {
      label,
      icon,
      error,
      wrapperClassName = "",
      className = "",
      textarea,
      ...rest
    } = props;

    const inputClasses = `
      input-neon w-full py-2.5 text-sm transition-all duration-300
      ${icon ? "pl-10 pr-4" : "px-4"}
      ${textarea ? "resize-none" : ""}
      ${error ? "border-red-500/60 shadow-[0_0_10px_rgba(255,40,40,0.15)]" : ""}
      ${className}
    `;

    return (
      <div className={`relative group ${wrapperClassName}`}>
        {label && (
          <label className="block text-[10px] text-white/40 tracking-widest uppercase mb-1.5 ml-1">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <span
              className={`
                absolute left-3 pointer-events-none
                transition-colors duration-300
                ${textarea ? "top-3" : "top-1/2 -translate-y-1/2"}
                text-white/30 group-focus-within:text-red-500
              `}
            >
              {icon}
            </span>
          )}

          {textarea ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              className={inputClasses}
              {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={inputClasses}
              {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
        </div>

        {error && (
          <div className="flex items-center gap-1.5 mt-1.5 ml-1 animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle size={10} className="text-red-500" />
            <p className="text-[10px] text-red-500 tracking-wider font-medium">
              {error}
            </p>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;