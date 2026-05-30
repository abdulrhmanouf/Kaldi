import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode, forwardRef } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'coffee';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      isLoading,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-semibold rounded-xl transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-coffee text-white
        hover:bg-coffee-dark
        focus:ring-coffee
        shadow-soft hover:shadow-coffee
      `,
      secondary: `
        bg-sand text-coffee-dark
        hover:bg-cream
        focus:ring-sand
        shadow-soft
      `,
      outline: `
        border-2 border-coffee text-coffee
        bg-transparent hover:bg-coffee hover:text-white
        focus:ring-coffee
      `,
      ghost: `
        text-coffee bg-transparent
        hover:bg-sand/30
        focus:ring-coffee
      `,
      coffee: `
        bg-gradient-coffee text-white
        hover:opacity-90
        focus:ring-coffee
        shadow-coffee hover:shadow-coffee-lg
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const darkVariants = {
      primary: 'dark:bg-brand-400 dark:hover:bg-brand-500',
      secondary: 'dark:bg-brand-800 dark:text-cream dark:hover:bg-brand-700',
      outline: 'dark:border-brand-400 dark:text-cream dark:hover:bg-brand-600',
      ghost: 'dark:text-cream dark:hover:bg-brand-800/50',
      coffee: 'dark:bg-gradient-coffee-dark',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${darkVariants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{children}</span>
          </span>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
