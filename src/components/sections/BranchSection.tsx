import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { SectionHeading, Button, Card } from '../ui';

export default function BranchSection() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <section className="py-24 bg-cream dark:bg-brand-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-32 -left-32 w-96 h-96"
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-coffee">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 3" />
          </svg>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <SectionHeading
          titleKey="home.branch.title"
          subtitleKey="home.branch.address"
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Map Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card variant="elevated" padding="none" className="h-full min-h-[400px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54212.8775!2d31.43!3d31.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7b5e5a5a5a5a5%3A0x5a5a5a5a5a5a5a5!2sNew%20Damietta%2C%20Egypt!5e0!3m2!1sen!2seg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kaldi Coffee Location"
                className="grayscale dark:grayscale dark:invert"
              />
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 flex items-center gap-2 bg-white dark:bg-brand-800 px-4 py-2 rounded-full shadow-soft hover:shadow-soft-lg transition-shadow text-coffee dark:text-cream"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="font-cairo text-sm">
                  {isArabic ? 'افتح في خرائط جوجل' : 'Open in Google Maps'}
                </span>
              </a>
            </Card>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            {/* Address */}
            <Card className="flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee/10 dark:bg-coffee/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-coffee dark:text-cream" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-cairo text-charcoal dark:text-cream mb-1">
                    {t('contact.info.address')}
                  </h3>
                  <p className="text-brand-500 dark:text-brand-400 font-ibm">
                    {t('home.branch.address')}
                    <br />
                    {isArabic ? 'بجوار المزرعة تاون' : 'Next to Almazara Town'}
                  </p>
                </div>
              </div>
            </Card>

            {/* Hours */}
            <Card className="flex-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee/10 dark:bg-coffee/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-coffee dark:text-cream" />
                </div>
                <div>
                  <h3 className="text-lg font-bold font-cairo text-charcoal dark:text-cream mb-1">
                    {t('home.branch.hours')}
                  </h3>
                  <div className="text-brand-500 dark:text-brand-400 font-ibm space-y-1">
                    <p className="flex justify-between gap-4">
                      <span>{t('home.branch.weekdays')}</span>
                      <span className="font-semibold text-charcoal dark:text-cream">8:00 AM - 11:00 PM</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>{t('home.branch.weekend')}</span>
                      <span className="font-semibold text-charcoal dark:text-cream">9:00 AM - 1:00 AM</span>
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="tel:+20123456789"
                  className="flex items-center justify-center gap-2 bg-coffee text-cream rounded-xl p-4 hover:bg-coffee-dark transition-colors shadow-soft"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-cairo">{t('contact.info.phone')}</span>
                </a>
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/20123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-500 text-white rounded-xl p-4 hover:bg-emerald-600 transition-colors shadow-soft"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-cairo">{t('contact.info.whatsapp')}</span>
              </motion.a>
            </div>

            {/* CTA */}
            <Button variant="primary" fullWidth>
              {isArabic ? 'احجز طاولتك الآن' : 'Reserve Your Table'}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
