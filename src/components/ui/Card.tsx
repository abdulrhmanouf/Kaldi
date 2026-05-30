import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'elevated' | 'outline';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: ReactNode;
}

export default function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  children,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-2xl overflow-hidden';

  const variants = {
    default: 'bg-white dark:bg-brand-900 shadow-soft',
    glass: 'bg-white/80 dark:bg-brand-900/60 backdrop-blur-lg shadow-soft',
    elevated: 'bg-white dark:bg-brand-900 shadow-soft-lg',
    outline: 'border-2 border-sand dark:border-brand-700 bg-white/50 dark:bg-brand-900/50',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'cursor-pointer transition-shadow duration-300 hover:shadow-soft-lg hover:-translate-y-1'
    : '';

  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
