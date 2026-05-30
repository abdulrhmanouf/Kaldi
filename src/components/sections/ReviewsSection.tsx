import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { reviews } from '../../data/mockData';
import { SectionHeading, StarRating, Card, Button } from '../ui';
import { Quote, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';

export default function ReviewsSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const featuredReviews = reviews.filter(r => r.rating === 5).slice(0, 6);

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev < featuredReviews.length - 1 ? prev + 1 : 0));
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : featuredReviews.length - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-cream dark:bg-brand-900 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          titleKey="home.reviews"
          subtitleKey="reviews.subtitle"
        />

        {/* Main Featured Review */}
        <div className="max-w-4xl mx-auto mb-12 relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-brand-800 rounded-3xl p-8 md:p-12 shadow-soft-lg relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 w-16 h-16 text-sand/30 dark:text-brand-700" />

              {/* Avatar and name */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={featuredReviews[currentIndex].avatar}
                  alt={featuredReviews[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-sand dark:border-brand-700"
                />
                <div>
                  <h4 className="text-xl font-bold text-charcoal dark:text-cream font-cairo">
                    {featuredReviews[currentIndex].name}
                  </h4>
                  <StarRating
                    rating={featuredReviews[currentIndex].rating}
                    size="sm"
                    showNumber={false}
                  />
                </div>
              </div>

              {/* Review text */}
              <p className="text-lg md:text-xl text-brand-500 dark:text-brand-300 font-ibm leading-relaxed mb-6">
                "{isArabic
                  ? featuredReviews[currentIndex].text.ar
                  : featuredReviews[currentIndex].text.en}"
              </p>

              {/* Rating and date */}
              <div className="flex items-center justify-between text-sm text-brand-400">
                <span className="flex items-center gap-1">
                  {featuredReviews[currentIndex].verified && (
                    <span className="text-emerald-500 font-medium">
                      {t('reviews.verified')}
                    </span>
                  )}
                </span>
                <span>{featuredReviews[currentIndex].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="absolute inset-y-1/2 -translate-y-1/2 w-full flex items-center justify-between pointer-events-none px-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevReview}
              className="p-3 rounded-full bg-white dark:bg-brand-800 shadow-soft pointer-events-auto text-coffee dark:text-cream hover:bg-sand dark:hover:bg-brand-700 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextReview}
              className="p-3 rounded-full bg-white dark:bg-brand-800 shadow-soft pointer-events-auto text-coffee dark:text-cream hover:bg-sand dark:hover:bg-brand-700 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-coffee dark:bg-cream'
                    : 'bg-sand dark:bg-brand-700 hover:bg-coffee/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Secondary reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {reviews.slice(0, 3).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hover className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-charcoal dark:text-cream font-cairo">
                      {review.name}
                    </h4>
                    <StarRating rating={review.rating} size="sm" showNumber={false} />
                  </div>
                </div>
                <p className="text-brand-500 dark:text-brand-400 font-ibm text-sm line-clamp-3">
                  "{isArabic ? review.text.ar : review.text.en}"
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/reviews">
            <Button
              variant="outline"
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
