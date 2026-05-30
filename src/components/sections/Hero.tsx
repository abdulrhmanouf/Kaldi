import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Coffee, MapPin } from 'lucide-react';
import { Button } from '../ui';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/133782/pexels-photo-133782.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-coffee-dark/70 via-coffee-dark/50 to-coffee-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/50 to-transparent" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 right-10 lg:right-20 z-10 opacity-20"
      >
        <Coffee className="w-32 h-32 lg:w-48 lg:h-48 text-cream" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute bottom-1/4 left-10 lg:left-20 z-10 opacity-10"
      >
        <Coffee className="w-40 h-40 lg:w-64 lg:h-64 text-cream" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-20 container mx-auto px-4 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/10 backdrop-blur-md border border-cream/20 mb-8"
        >
          <MapPin className="w-4 h-4 text-sand" />
          <span className="text-cream/90 font-ibm text-sm">New Damietta, Egypt</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream font-cairo mb-6"
        >
          <span className="block">{t('hero.title')}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl lg:text-3xl text-cream/80 font-ibm mb-4 max-w-3xl mx-auto"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sand text-lg md:text-xl font-cairo mb-10"
        >
          {t('hero.tagline')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/menu">
            <Button
              variant="primary"
              size="lg"
              className="min-w-[200px]"
              leftIcon={<Coffee className="w-5 h-5" />}
            >
              {t('hero.ctaMenu')}
            </Button>
          </Link>
          <Link to="/contact">
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] border-cream/30 text-cream hover:bg-cream hover:text-coffee-dark"
              leftIcon={<MapPin className="w-5 h-5" />}
            >
              {t('hero.ctaVisit')}
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-cream/60"
        >
          <span className="text-sm font-ibm">
            {isArabic ? 'اكتشف المزيد' : 'Discover More'}
          </span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
