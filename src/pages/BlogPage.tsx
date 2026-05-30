import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { blogPosts } from '../data/mockData';
import { BlogCategory } from '../types';
import { SectionHeading, Card, Input } from '../components/ui';
import {
  Search,
  Clock,
  User,
  Calendar,
  BookOpen,
  Flame,
  Coffee,
  Heart,
} from 'lucide-react';

const categoryConfig: Record<BlogCategory, { icon: React.ReactNode; color: string }> = {
  brewing: { icon: <Flame className="w-4 h-4" />, color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30' },
  beans: { icon: <Coffee className="w-4 h-4" />, color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' },
  lifestyle: { icon: <Heart className="w-4 h-4" />, color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30' },
  recipes: { icon: <BookOpen className="w-4 h-4" />, color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' },
  events: { icon: <Clock className="w-4 h-4" />, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' },
};

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<BlogCategory | 'all'>('all');
  const [, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const categories = [
    { id: 'all', label: t('blog.categories.all') },
    ...Object.keys(categoryConfig).map((key) => ({
      id: key,
      label: t(`blog.categories.${key}`),
    })),
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      !searchQuery ||
      post.title.ar.includes(searchQuery) ||
      post.title.en.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
          <SectionHeading titleKey="blog.title" subtitleKey="blog.subtitle" />

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto mt-8"
          >
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('blog.search')}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-8 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Categories */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(cat.id as BlogCategory | 'all')}
                className={`px-5 py-2 rounded-full font-cairo font-medium transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-coffee text-white shadow-soft'
                    : 'bg-sand/30 dark:bg-brand-800 text-brand-500 hover:bg-sand/50 dark:hover:bg-brand-700'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedPost(post)}
                >
                  <Card hover className="h-full cursor-pointer overflow-hidden">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={isArabic ? post.title.ar : post.title.en}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 right-3">
                        <span
                          className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            categoryConfig[post.category].color
                          }`}
                        >
                          {categoryConfig[post.category].icon}
                          {t(`blog.categories.${post.category}`)}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-sm text-brand-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime} min
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-charcoal dark:text-cream font-cairo mb-3 line-clamp-2">
                        {isArabic ? post.title.ar : post.title.en}
                      </h3>

                      <p className="text-brand-500 dark:text-brand-400 font-ibm text-sm mb-4 line-clamp-3">
                        {isArabic ? post.excerpt.ar : post.excerpt.en}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm text-coffee dark:text-sand">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="text-sm font-medium text-coffee dark:text-cream hover:underline">
                          {t('blog.readMore')}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <BookOpen className="w-16 h-16 mx-auto text-brand-300 mb-4" />
              <p className="text-lg text-brand-400 font-ibm">{t('common.noResults')}</p>
            </motion.div>
          )}
        </div>
      </section>
    </motion.main>
  );
}
