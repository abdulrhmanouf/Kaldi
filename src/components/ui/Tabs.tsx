import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = 'pills',
  size = 'md',
  className = '',
}: TabsProps) {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const variants = {
    pills: {
      container: 'gap-2',
      tab: 'rounded-full transition-all duration-300',
      active: 'bg-coffee text-white shadow-soft',
      inactive: 'bg-transparent text-brand-500 dark:text-brand-400 hover:bg-sand/50 dark:hover:bg-brand-800/50',
      indicator: null,
    },
    underline: {
      container: 'gap-6 border-b-2 border-sand dark:border-brand-800',
      tab: 'relative transition-all duration-300 border-b-2 border-transparent',
      active: 'text-coffee dark:text-cream border-coffee',
      inactive: 'text-brand-400 hover:text-coffee',
      indicator: (
        <motion.div
          layoutId="tab-indicator"
          className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-coffee dark:bg-cream"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      ),
    },
    cards: {
      container: 'gap-2',
      tab: 'rounded-xl transition-all duration-300 border-2',
      active: 'bg-coffee text-white border-coffee shadow-soft',
      inactive: 'bg-white dark:bg-brand-900 border-sand dark:border-brand-700 text-brand-500 hover:border-coffee/50',
      indicator: null,
    },
  };

  const config = variants[variant];

  return (
    <div className={`flex flex-wrap ${config.container} ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            whileHover={{ scale: isActive ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative flex items-center gap-2
              ${sizes[size]}
              ${config.tab}
              ${isActive ? config.active : config.inactive}
            `}
          >
            {tab.icon && (
              <span className="inline-flex items-center justify-center">
                {tab.icon}
              </span>
            )}
            <span className="font-medium font-cairo">{tab.label}</span>
            {isActive && variant === 'underline' && config.indicator}
          </motion.button>
        );
      })}
    </div>
  );
}
