import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showNumber = true,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const textSize = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[...Array(maxRating)].map((_, index) => {
          const filled = index < rating;
          return (
            <motion.button
              key={index}
              type="button"
              disabled={!interactive}
              whileHover={interactive ? { scale: 1.2 } : undefined}
              whileTap={interactive ? { scale: 0.9 } : undefined}
              onClick={() => interactive && onChange?.(index + 1)}
              className={`${interactive ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <Star
                className={`
                  ${sizes[size]}
                  transition-colors duration-200
                  ${
                    filled
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-transparent text-sand dark:text-brand-600'
                  }
                `}
              />
            </motion.button>
          );
        })}
      </div>
      {showNumber && (
        <span className={`${textSize[size]} text-brand-500 dark:text-brand-400 font-medium mr-1`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
