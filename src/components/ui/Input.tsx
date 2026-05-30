import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef, useState } from 'react';

interface InputProps extends Omit<HTMLMotionProps<'input'>, 'size'> {
  label?: string;
  error?: string;
  helper?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helper,
      leftIcon,
      rightIcon,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const baseStyles = `
      w-full rounded-xl bg-cream/80 dark:bg-brand-900/50
      border-2 transition-all duration-300
      placeholder:text-brand-400 dark:placeholder:text-brand-600
      focus:outline-none focus:ring-2 focus:ring-offset-1
    `;

    const sizes = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };

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
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute right-3 text-brand-400 dark:text-brand-500">
              {leftIcon}
            </span>
          )}
          <motion.input
            ref={ref}
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
              ${sizes[size]}
              ${borderColor}
              ${leftIcon ? 'pr-10' : ''}
              ${rightIcon ? 'pl-10' : ''}
              text-charcoal dark:text-cream
            `}
            {...props}
          />
          {rightIcon && (
            <span className="absolute left-3 text-brand-400 dark:text-brand-500">
              {rightIcon}
            </span>
          )}
        </div>
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

Input.displayName = 'Input';

export default Input;
