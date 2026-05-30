import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, useState } from 'react';

interface TextareaProps extends HTMLMotionProps<'textarea'> {
  label?: string;
  error?: string;
  helper?: string;
  rows?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helper, rows = 4, className = '', ...props },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyles = `
      w-full rounded-xl bg-cream/80 dark:bg-brand-900/50
      border-2 transition-all duration-300 resize-none
      placeholder:text-brand-400 dark:placeholder:text-brand-600
      focus:outline-none focus:ring-2 focus:ring-offset-1
    `;

    const borderColor = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : isFocused
      ? 'border-coffee focus:border-coffee focus:ring-coffee'
      : 'border-sand dark:border-brand-700 hover:border-coffee/50';

    return (
      <div className={`relative ${className}`}>
        {label && (
          <motion.label
            initial={false}
            animate={{
              y: isFocused || props.value ? -24 : 0,
              scale: isFocused || props.value ? 0.85 : 1,
            }}
            className="absolute right-4 top-3 origin-right bg-cream dark:bg-brand-900 px-1 text-brand-500 dark:text-brand-400 pointer-events-none"
          >
            {label}
          </motion.label>
        )}
        <motion.textarea
          ref={ref}
          rows={rows}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            ${baseStyles}
            ${borderColor}
            px-4 py-3
            text-charcoal dark:text-cream
          `}
          {...props}
        />
        {(error || helper) && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-brand-400'}`}
          >
            {error || helper}
          </motion.p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
