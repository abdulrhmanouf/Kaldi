import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading, Card, Button, Input, Textarea } from '../components/ui';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Facebook,
  Twitter,
  ExternalLink,
} from 'lucide-react';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/kaldi.coffee', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/kaldi.coffee', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/kaldi.coffee', label: 'Twitter' },
    { icon: MessageCircle, href: 'https://wa.me/20123456789', label: 'WhatsApp' },
  ];

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
          <SectionHeading titleKey="contact.title" subtitleKey="contact.subtitle" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-8 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <h3 className="text-2xl font-bold text-charcoal dark:text-cream font-cairo mb-6">
                  {isArabic ? 'أرسل لنا رسالة' : 'Send us a message'}
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    label={t('contact.form.name')}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                  />

                  <Input
                    type="email"
                    label={t('contact.form.email')}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                  />

                  <Input
                    type="tel"
                    label={t('contact.form.phone')}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder={t('contact.form.phonePlaceholder')}
                  />

                  <Textarea
                    label={t('contact.form.message')}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={5}
                    required
                  />

                  <Button
                    type="submit"
                    variant="coffee"
                    fullWidth
                    isLoading={isSubmitting}
                    leftIcon={<Send className="w-5 h-5" />}
                  >
                    {isSubmitted
                      ? t('contact.form.success')
                      : t('contact.form.send')}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Info Cards */}
              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee/10 dark:bg-coffee/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-coffee dark:text-cream" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-2">
                    {t('contact.info.address')}
                  </h4>
                  <p className="text-brand-500 dark:text-brand-400 font-ibm mb-2">
                    {t('home.branch.address')}
                    <br />
                    {isArabic ? 'بجوار المزرعة تاون' : 'Next to Almazara Town'}
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-coffee dark:text-sand font-medium text-sm hover:underline"
                  >
                    {t('contact.map.directions')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee/10 dark:bg-coffee/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-coffee dark:text-cream" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-2">
                    {t('contact.info.phone')}
                  </h4>
                  <a
                    href="tel:+20123456789"
                    className="text-brand-500 dark:text-brand-400 font-ibm hover:text-coffee dark:hover:text-cream transition-colors"
                    dir="ltr"
                  >
                    +20 123 456 789
                  </a>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee/10 dark:bg-coffee/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-coffee dark:text-cream" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-2">
                    {t('contact.info.email')}
                  </h4>
                  <a
                    href="mailto:hello@kaldi.coffee"
                    className="text-brand-500 dark:text-brand-400 font-ibm hover:text-coffee dark:hover:text-cream transition-colors"
                  >
                    hello@kaldi.coffee
                  </a>
                </div>
              </Card>

              <Card className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-coffee/10 dark:bg-coffee/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-coffee dark:text-cream" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-2">
                    {t('contact.hours.title')}
                  </h4>
                  <div className="text-brand-500 dark:text-brand-400 font-ibm space-y-1">
                    <p className="flex justify-between gap-4">
                      <span>{t('home.branch.weekdays')}</span>
                      <span className="font-semibold text-charcoal dark:text-cream">8:00 - 23:00</span>
                    </p>
                    <p className="flex justify-between gap-4">
                      <span>{t('home.branch.weekend')}</span>
                      <span className="font-semibold text-charcoal dark:text-cream">9:00 - 01:00</span>
                    </p>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-bold text-charcoal dark:text-cream font-cairo mb-4">
                  {t('contact.social')}
                </h4>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-sand/30 dark:bg-brand-800 hover:bg-coffee hover:text-white
                        flex items-center justify-center text-brand-500 dark:text-brand-400 hover:text-white transition-colors"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/20123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl p-4 transition-colors shadow-soft"
              >
                <MessageCircle className="w-6 h-6" />
                <span className="font-cairo text-lg">
                  {t('contact.info.whatsapp')}
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card variant="elevated" padding="none" className="overflow-hidden">
              <div className="relative h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54212.8775!2d31.43!3d31.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7b5e5a5a5a5a5%3A0x5a5a5a5a5a5a5a5!2sNew%20Damietta%2C%20Egypt!5e0!3m2!1sen!2seg!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kaldi Coffee Location"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-brand-800 rounded-xl p-4 shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-coffee/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-coffee dark:text-cream" />
                    </div>
                    <div>
                      <h4 className="font-cairo font-bold text-charcoal dark:text-cream">Kaldi Coffee</h4>
                      <p className="text-sm text-brand-400 font-ibm">{t('home.branch.address')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
