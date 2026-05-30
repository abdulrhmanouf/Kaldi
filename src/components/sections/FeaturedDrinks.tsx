import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { menuItems } from '../../data/mockData';
import { Card, SectionHeading, Button } from '../ui';
import { Star, Sparkles, ArrowLeft } from 'lucide-react';

export default function FeaturedDrinks() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const featuredItems = menuItems.filter(item => item.popular).slice(0, 5);

  return (
    <section className="py-24 bg-cream dark:bg-brand-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-coffee rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-coffee rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <SectionHeading
          titleKey="home.featuredDrinks"
          subtitleKey="menu.subtitle"
          align={isArabic ? 'right' : 'left'}
        />

        {/* Featured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="group relative overflow-hidden">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={isArabic ? item.name.ar : item.name.en}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {item.popular && (
                      <span className="px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3" fill="currentColor" />
                        {isArabic ? 'مميز' : 'Popular'}
                      </span>
                    )}
                    {item.new && (
                      <span className="px-3 py-1 bg-emerald-400 text-emerald-900 text-xs font-bold rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {isArabic ? 'جديد' : 'New'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-cairo text-charcoal dark:text-cream mb-2">
                    {isArabic ? item.name.ar : item.name.en}
                  </h3>
                  <p className="text-brand-500 dark:text-brand-400 font-ibm text-sm mb-4 line-clamp-2">
                    {isArabic ? item.description.ar : item.description.en}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-coffee dark:text-cream font-cairo">
                      {item.price.medium} {t('menu.currency')}
                    </span>
                    <span className="text-xs text-brand-400 font-ibm">
                      {isArabic ? 'متوسط' : 'Medium'}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/menu">
            <Button
              variant="outline"
              size="lg"
              rightIcon={<ArrowLeft className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />}
            >
              {t('common.viewAll')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
