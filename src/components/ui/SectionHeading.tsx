import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface SectionHeadingProps {
  titleKey: string;
  subtitleKey?: string;
  align?: 'right' | 'center' | 'left';
  className?: string;
}

export default function SectionHeading({
  titleKey,
  subtitleKey,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const { t } = useTranslation();

  const alignments = {
    right: 'text-right items-start',
    center: 'text-center items-center',
    left: 'text-right md:text-left items-start',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${alignments[align]} mb-12 ${className}`}
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-charcoal dark:text-cream font-cairo"
      >
        {t(titleKey)}
      </motion.h2>
      {subtitleKey && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg md:text-xl text-brand-500 dark:text-brand-400 font-ibm max-w-2xl"
        >
          {t(subtitleKey)}
        </motion.p>
      )}
    </motion.div>
  );
}
