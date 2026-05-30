import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { menuItems } from '../data/mockData';
import { MenuCategory } from '../types';
import { SectionHeading, Card, Tabs, Modal } from '../components/ui';
import {
  Search,
  Star,
  Sparkles,
  Heart,
  X,
  Coffee,
  Flame,
  Snowflake,
  Wine,
  Leaf,
  Cake,
  Croissant,
  Filter,
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

export default function MenuPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'priceAsc' | 'priceDesc'>('default');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const filteredItems = useMemo(() => {
    let items = menuItems;

    // Filter by search
    if (searchQuery) {
      items = items.filter(
        (item) =>
          item.name.ar.includes(searchQuery) ||
          item.name.en.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== 'all') {
      items = items.filter((item) => item.category === activeCategory);
    }

    // Sort
    if (sortBy === 'priceAsc') {
      items = [...items].sort((a, b) => a.price.medium - b.price.medium);
    } else if (sortBy === 'priceDesc') {
      items = [...items].sort((a, b) => b.price.medium - a.price.medium);
    }

    return items;
  }, [searchQuery, activeCategory, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const selectedItemData = menuItems.find((item) => item.id === selectedItem);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-sand/40 to-transparent dark:from-charcoal/40 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading titleKey="menu.title" subtitleKey="menu.subtitle" />

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('menu.search')}
                className="w-full pr-12 pl-4 py-4 rounded-2xl bg-white dark:bg-brand-800 border-2 border-sand dark:border-brand-700 text-charcoal dark:text-cream font-ibm focus:outline-none focus:border-coffee transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-charcoal dark:hover:text-cream"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-8 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <Card className="sticky top-28">
                <h3 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-4">
                  {t('menu.categories.all')}
                </h3>
                <Tabs
                  tabs={categories}
                  activeTab={activeCategory}
                  onChange={(id) => setActiveCategory(id as MenuCategory | 'all')}
                  variant="cards"
                  size="md"
                />
                <div className="mt-6 pt-6 border-t border-sand dark:border-brand-700">
                  <h3 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-4">
                    {t('menu.sortBy')}
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full px-4 py-3 rounded-xl bg-sand/30 dark:bg-brand-800 text-charcoal dark:text-cream font-ibm border-2 border-sand dark:border-brand-700 focus:outline-none focus:border-coffee"
                  >
                    <option value="default">{t('menu.popular')}</option>
                    <option value="priceAsc">{t('menu.priceAsc')}</option>
                    <option value="priceDesc">{t('menu.priceDesc')}</option>
                  </select>
                </div>
              </Card>
            </motion.aside>

            {/* Mobile Filter Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white dark:bg-brand-800 rounded-xl shadow-soft mb-4"
            >
              <Filter className="w-5 h-5 text-coffee dark:text-cream" />
              <span className="font-cairo text-charcoal dark:text-cream">
                {t('menu.filter')}
              </span>
              {(activeCategory !== 'all' || sortBy !== 'default') && (
                <span className="w-2 h-2 rounded-full bg-coffee" />
              )}
            </motion.button>

            {/* Mobile Filter Modal */}
            <Modal
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              title={t('menu.filter')}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-4">
                    {t('menu.sortBy')}
                  </h3>
                  <Tabs
                    tabs={categories}
                    activeTab={activeCategory}
                    onChange={(id) => setActiveCategory(id as MenuCategory | 'all')}
                    variant="pills"
                    size="sm"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-4">
                    {t('menu.sortBy')}
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full px-4 py-3 rounded-xl bg-sand/30 dark:bg-brand-800 text-charcoal dark:text-cream font-ibm border-2 border-sand dark:border-brand-700 focus:outline-none focus:border-coffee"
                  >
                    <option value="default">{t('menu.popular')}</option>
                    <option value="priceAsc">{t('menu.priceAsc')}</option>
                    <option value="priceDesc">{t('menu.priceDesc')}</option>
                  </select>
                </div>
              </div>
            </Modal>

            {/* Menu Grid */}
            <div className="flex-1">
              {/* Categories - Mobile Scroll */}
              <div className="lg:hidden overflow-x-auto mb-6 -mx-4 px-4">
                <div className="flex gap-2">
                  {categories.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveCategory(cat.id as MenuCategory | 'all')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors
                        ${
                          activeCategory === cat.id
                            ? 'bg-coffee text-white'
                            : 'bg-sand/30 dark:bg-brand-800 text-brand-500 dark:text-brand-400'
                        }`}
                    >
                      {cat.icon}
                      <span className="font-cairo">{cat.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Items Grid */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Card
                        hover
                        className="group relative overflow-hidden cursor-pointer"
                        onClick={() => setSelectedItem(item.id)}
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={item.image}
                            alt={isArabic ? item.name.ar : item.name.en}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/60 to-transparent" />

                          {/* Badges */}
                          <div className="absolute top-3 right-3 flex gap-2">
                            {item.popular && (
                              <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3" fill="currentColor" />
                                {isArabic ? 'مميز' : 'Popular'}
                              </span>
                            )}
                            {item.new && (
                              <span className="px-2 py-1 bg-emerald-400 text-emerald-900 text-xs font-bold rounded-full flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                {isArabic ? 'جديد' : 'New'}
                              </span>
                            )}
                          </div>

                          {/* Favorite Button */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(item.id);
                            }}
                            className="absolute top-3 left-3 p-2 rounded-full bg-white/80 dark:bg-brand-800/80 backdrop-blur-sm"
                          >
                            <Heart
                              className={`w-5 h-5 transition-colors ${
                                favorites.includes(item.id)
                                  ? 'fill-red-500 text-red-500'
                                  : 'text-brand-400'
                              }`}
                            />
                          </motion.button>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-2 line-clamp-1">
                            {isArabic ? item.name.ar : item.name.en}
                          </h3>
                          <p className="text-brand-500 dark:text-brand-400 font-ibm text-sm mb-4 line-clamp-2">
                            {isArabic ? item.description.ar : item.description.en}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-coffee dark:text-cream font-cairo">
                              {item.price.medium} {t('menu.currency')}
                            </span>
                            {item.price.small && item.price.large && (
                              <div className="text-xs text-brand-400 font-ibm">
                                <span className="px-2 py-1 rounded bg-sand/50 dark:bg-brand-800/50">
                                  {item.price.small}-{item.price.large}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* No Results */}
              {filteredItems.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Coffee className="w-16 h-16 mx-auto text-brand-300 mb-4" />
                  <p className="text-lg text-brand-400 font-ibm">
                    {t('common.noResults')}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Item Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItemData ? (isArabic ? selectedItemData.name.ar : selectedItemData.name.en) : ''}
        size="lg"
      >
        {selectedItemData && (
          <div className="space-y-6">
            <div className="relative rounded-2xl overflow-hidden h-64">
              <img
                src={selectedItemData.image}
                alt={isArabic ? selectedItemData.name.ar : selectedItemData.name.en}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/30 to-transparent" />
            </div>

            <div>
              <p className="text-brand-500 dark:text-brand-400 font-ibm text-lg leading-relaxed">
                {isArabic ? selectedItemData.description.ar : selectedItemData.description.en}
              </p>
            </div>

            {/* Nutrition Info */}
            {(selectedItemData.calories || selectedItemData.caffeine) && (
              <div className="grid grid-cols-2 gap-4">
                {selectedItemData.calories && (
                  <div className="bg-sand/30 dark:bg-brand-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-brand-400 font-ibm mb-1">{t('menu.calories')}</p>
                    <p className="text-2xl font-bold text-charcoal dark:text-cream font-cairo">
                      {selectedItemData.calories}
                    </p>
                  </div>
                )}
                {selectedItemData.caffeine && (
                  <div className="bg-sand/30 dark:bg-brand-800 rounded-xl p-4 text-center">
                    <p className="text-sm text-brand-400 font-ibm mb-1">{t('menu.caffeine')}</p>
                    <p className="text-2xl font-bold text-charcoal dark:text-cream font-cairo">
                      {selectedItemData.caffeine}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Sizes & Prices */}
            <div className="border-t border-sand dark:border-brand-700 pt-6">
              <h4 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-4">
                {t('menu.sizes.medium')}
              </h4>
              <div className="flex gap-4">
                {selectedItemData.price.small && (
                  <div className={`flex-1 p-4 rounded-xl border-2 ${sortBy === 'priceAsc' ? 'border-sand dark:border-brand-700' : 'border-sand dark:border-brand-700'}`}>
                    <p className="text-sm text-brand-400 font-ibm mb-1">{t('menu.sizes.small')}</p>
                    <p className="text-xl font-bold text-charcoal dark:text-cream">
                      {selectedItemData.price.small} {t('menu.currency')}
                    </p>
                  </div>
                )}
                <div className="flex-1 p-4 rounded-xl border-2 border-coffee bg-coffee/5">
                  <p className="text-sm text-brand-400 font-ibm mb-1">{t('menu.sizes.medium')}</p>
                  <p className="text-xl font-bold text-coffee dark:text-cream">
                    {selectedItemData.price.medium} {t('menu.currency')}
                  </p>
                </div>
                {selectedItemData.price.large && (
                  <div className="flex-1 p-4 rounded-xl border-2 border-sand dark:border-brand-700">
                    <p className="text-sm text-brand-400 font-ibm mb-1">{t('menu.sizes.large')}</p>
                    <p className="text-xl font-bold text-charcoal dark:text-cream">
                      {selectedItemData.price.large} {t('menu.currency')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Allergens */}
            {selectedItemData.allergens && selectedItemData.allergens.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-brand-400 font-ibm">{t('menu.allergens')}:</span>
                {selectedItemData.allergens.map((allergen) => (
                  <span
                    key={allergen}
                    className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full"
                  >
                    {allergen}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </motion.main>
  );
}
