import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { reviews } from '../data/mockData';
import { SectionHeading, Card, StarRating, Button } from '../components/ui';
import { Star, Quote, TrendingUp, UserCheck, MessageSquare, Award } from 'lucide-react';

export default function ReviewsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const stats = [
    { icon: Star, value: avgRating.toFixed(1), label: t('reviews.avgRating'), color: 'text-amber-500' },
    { icon: UserCheck, value: reviews.filter(r => r.verified).length, label: t('reviews.verified'), color: 'text-emerald-500' },
    { icon: MessageSquare, value: reviews.length, label: t('reviews.totalReviews'), color: 'text-blue-500' },
    { icon: TrendingUp, value: '98%', label: isArabic ? 'معدل الرضا' : 'Satisfaction Rate', color: 'text-purple-500' },
  ];

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }));

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
          <SectionHeading titleKey="reviews.title" subtitleKey="reviews.subtitle" />

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <p className="text-3xl font-bold text-charcoal dark:text-cream font-cairo">
                    {stat.value}
                  </p>
                  <p className="text-sm text-brand-400 font-ibm">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Rating Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto mt-8"
          >
            <Card>
              <div className="space-y-3">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="w-8 text-sm text-brand-400">{rating}</div>
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <div className="flex-1 h-2 bg-sand dark:bg-brand-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full bg-amber-400 rounded-full"
                      />
                    </div>
                    <div className="w-8 text-sm text-brand-400 text-center">{count}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-12 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-sand"
                      />
                      <div>
                        <h4 className="font-bold text-charcoal dark:text-cream font-cairo">
                          {review.name}
                        </h4>
                        <StarRating rating={review.rating} size="sm" showNumber={false} />
                      </div>
                    </div>
                    <Quote className="w-8 h-8 text-sand/30 dark:text-brand-700" />
                  </div>

                  {/* Content */}
                  <p className="text-brand-500 dark:text-brand-400 font-ibm leading-relaxed flex-1">
                    "{isArabic ? review.text.ar : review.text.en}"
                  </p>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-sand dark:border-brand-700 flex items-center justify-between">
                    <span className="text-sm text-brand-400 font-ibm">
                      {review.date}
                    </span>
                    {review.verified && (
                      <span className="flex items-center gap-1 text-xs text-emerald-500 font-medium">
                        <Award className="w-3 h-3" />
                        {t('reviews.verified')}
                      </span>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Write Review CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Card className="inline-block">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-coffee dark:text-cream" />
                <h3 className="text-xl font-bold text-charcoal dark:text-cream font-cairo mb-2">
                  {t('reviews.writeReview')}
                </h3>
                <p className="text-brand-400 font-ibm mb-4">
                  {isArabic
                    ? 'ساعدنا في تحسين خدماتنا بمشاركة تجربتك'
                    : 'Help us improve by sharing your experience'}
                </p>
                <Button variant="primary">
                  {t('reviews.writeReview')}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
