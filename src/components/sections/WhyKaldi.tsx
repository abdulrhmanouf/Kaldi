import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Coffee, Heart, Users, Leaf, Award, Sparkles, Clock } from 'lucide-react';

const features = [
  {
    icon: Coffee,
    titleKey: 'about.values.quality.title',
    descKey: 'about.values.quality.desc',
    color: 'text-amber-500',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  {
    icon: Heart,
    titleKey: 'about.values.passion.title',
    descKey: 'about.values.passion.desc',
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  {
    icon: Users,
    titleKey: 'about.values.community.title',
    descKey: 'about.values.community.desc',
    color: 'text-blue-500',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: Leaf,
    titleKey: 'about.values.sustainability.title',
    descKey: 'about.values.sustainability.desc',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
];

const highlights = [
  { icon: Award, value: '12+', labelKey: 'home.stats.awards' },
  { icon: Clock, value: '6+', labelKey: 'home.stats.yearsExperience' },
  { icon: Coffee, value: '15+', labelKey: 'home.stats.coffeeBlend' },
  { icon: Users, value: '5000+', labelKey: 'home.stats.happyCustomers' },
];

export default function WhyKaldi() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <section className="py-24 bg-sand/30 dark:bg-charcoal relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="coffee-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#8B6B4A" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#coffee-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal dark:text-cream font-cairo mb-4">
            {t('home.whyKaldi')}
          </h2>
          <p className="text-lg text-brand-500 dark:text-brand-400 font-ibm max-w-2xl mx-auto">
            {isArabic
              ? 'نقدم تجربة قهوة لا مثيل لها تجمع بين الجودة والعاطفة والمجتمع'
              : 'We deliver an unparalleled coffee experience combining quality, passion, and community'}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-brand-900/50 rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-charcoal dark:text-cream font-cairo mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-brand-500 dark:text-brand-400 font-ibm leading-relaxed">
                {t(feature.descKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-coffee rounded-3xl p-8 md:p-12 shadow-coffee-lg relative overflow-hidden"
        >
          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-64 h-64 opacity-10"
          >
            <Sparkles className="w-full h-full text-cream" />
          </motion.div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {highlights.map((item, index) => (
              <motion.div
                key={item.labelKey}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <item.icon className="w-8 h-8 text-sand" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-cream font-cairo mb-2">
                  {item.value}
                </div>
                <div className="text-sand/80 font-ibm">
                  {t(item.labelKey)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
