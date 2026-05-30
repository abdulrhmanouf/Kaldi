import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { menuItems } from '../data/mockData';
import { MenuCategory } from '../types';
import {
  Coffee,
  Flame,
  Snowflake,
  Wine,
  Leaf,
  Cake,
  Croissant,
  QrCode,
  Table,
  Star,
  Sparkles,
} from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  all: <Coffee className="w-4 h-4" />,
  espresso: <Flame className="w-4 h-4" />,
  hot: <Coffee className="w-4 h-4" />,
  iced: <Snowflake className="w-4 h-4" />,
  signature: <Wine className="w-4 h-4" />,
  tea: <Leaf className="w-4 h-4" />,
  desserts: <Cake className="w-4 h-4" />,
  bakery: <Croissant className="w-4 h-4" />,
};

export default function QRMenuPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [, _setSelectedItem] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: t('menu.categories.all'), icon: categoryIcons.all },
    { id: 'espresso', label: t('menu.categories.espresso'), icon: categoryIcons.espresso },
    { id: 'hot', label: t('menu.categories.hot'), icon: categoryIcons.hot },
    { id: 'iced', label: t('menu.categories.iced'), icon: categoryIcons.iced },
    { id: 'signature', label: t('menu.categories.signature'), icon: categoryIcons.signature },
    { id: 'tea', label: t('menu.categories.tea'), icon: categoryIcons.tea },
    { id: 'desserts', label: t('menu.categories.desserts'), icon: categoryIcons.desserts },
    { id: 'bakery', label: t('menu.categories.bakery'), icon: categoryIcons.bakery },
  ];

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === activeCategory);

  const groupedItems: Record<string, typeof menuItems> = {};
  filteredItems.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream dark:bg-brand-900"
    >
      {/* Header */}
      <header className="sticky top-0 z-40 bg-cream/95 dark:bg-brand-900/95 backdrop-blur-lg border-b border-sand dark:border-brand-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Coffee className="w-8 h-8 text-coffee dark:text-cream" />
              <div>
                <h1 className="text-xl font-bold font-cairo text-coffee dark:text-cream">
                  {t('qrMenu.title')}
                </h1>
                <p className="text-xs text-brand-400">{t('qrMenu.subtitle')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-brand-400">
              <Table className="w-4 h-4" />
              <span>{t('qrMenu.table')} 5</span>
            </div>
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-16 z-30 bg-cream/95 dark:bg-brand-900/95 backdrop-blur-lg border-b border-sand dark:border-brand-800 overflow-x-auto">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(cat.id as MenuCategory | 'all')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-coffee text-white'
                    : 'bg-sand/30 dark:bg-brand-800 text-brand-500'
                }`}
              >
                {cat.icon}
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-6">
        {Object.entries(groupedItems).map(([category, items]) => (
          <motion.section
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold font-cairo text-charcoal dark:text-cream mb-4 flex items-center gap-2">
              {categoryIcons[category]}
              {t(`menu.categories.${category}`)}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="flex gap-4 bg-white dark:bg-brand-800 rounded-2xl p-4 shadow-soft"
                >
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={isArabic ? item.name.ar : item.name.en}
                      className="w-full h-full object-cover"
                    />
                    {(item.popular || item.new) && (
                      <div className="absolute top-1 right-1 flex flex-col gap-1">
                        {item.popular && (
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        )}
                        {item.new && (
                          <Sparkles className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-bold font-cairo text-charcoal dark:text-cream mb-1">
                      {isArabic ? item.name.ar : item.name.en}
                    </h3>
                    <p className="text-sm text-brand-400 font-ibm line-clamp-2 mb-2">
                      {isArabic ? item.description.ar : item.description.en}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {item.price.small && (
                          <span className="text-xs text-brand-400 font-ibm">
                            {t('menu.sizes.small')}: {item.price.small}
                          </span>
                        )}
                        <span className="font-bold text-coffee dark:text-cream font-cairo">
                          {item.price.medium} {t('menu.currency')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* Call Waiter Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-6 py-4 bg-coffee text-white rounded-full shadow-coffee-lg font-cairo font-bold"
        >
          <QrCode className="w-5 h-5" />
          {isArabic ? 'استدعاء النادل' : 'Call Waiter'}
        </motion.button>
      </div>
    </motion.main>
  );
}
