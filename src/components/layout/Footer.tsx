import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Coffee,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Heart,
} from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

const quickLinks = [
  { path: '/menu', labelKey: 'nav.menu' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/gallery', labelKey: 'nav.gallery' },
  { path: '/reviews', labelKey: 'nav.reviews' },
  { path: '/reservations', labelKey: 'nav.reservations' },
  { path: '/blog', labelKey: 'nav.blog' },
  { path: '/loyalty', labelKey: 'nav.loyalty' },
  { path: '/qr-menu', labelKey: 'nav.qrMenu' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/kaldi.coffee', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/kaldi.coffee', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/kaldi.coffee', label: 'Twitter' },
  { icon: MessageCircle, href: 'https://wa.me/20123456789', label: 'WhatsApp' },
];

export default function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer className="relative bg-coffee-dark dark:bg-charcoal text-cream overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 opacity-10"
        >
          <Coffee className="w-64 h-64" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-10 left-10 opacity-5"
        >
          <Coffee className="w-96 h-96" />
        </motion.div>
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-brand-700/50">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold font-cairo mb-3">
              {t('footer.newsletter.title')}
            </h3>
            <p className="text-brand-300 mb-6">
              {t('footer.newsletter.subtitle')}
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('home.newsletter.placeholder')}
                  className="w-full"
                />
              </div>
              <Button type="submit" variant="primary" className="sm:w-auto">
                {isSubscribed ? t('home.newsletter.success') : t('home.newsletter.button')}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="text-cream"
              >
                <Coffee className="w-10 h-10" />
              </motion.div>
              <span className="text-2xl font-bold font-cairo">
                {t('hero.title')}
              </span>
            </Link>
            <p className="text-brand-300 font-ibm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-brand-700/50 hover:bg-cream hover:text-coffee-dark
                    flex items-center justify-center text-cream transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-lg font-bold font-cairo mb-6">{t('footer.quickLinks')}</h4>
            <nav className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-brand-300 hover:text-cream transition-colors font-ibm"
                >
                  {t(link.labelKey)}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-bold font-cairo mb-6">{t('footer.contact')}</h4>
            <div className="space-y-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-brand-300 hover:text-cream transition-colors"
              >
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="font-ibm">{t('home.branch.address')}</span>
              </a>
              <a
                href="tel:+20123456789"
                className="flex items-center gap-3 text-brand-300 hover:text-cream transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span className="font-ibm" dir="ltr">+20 123 456 789</span>
              </a>
              <a
                href="mailto:hello@kaldi.coffee"
                className="flex items-center gap-3 text-brand-300 hover:text-cream transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span className="font-ibm">hello@kaldi.coffee</span>
              </a>
              <div className="flex items-start gap-3 text-brand-300">
                <Clock className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="font-ibm">
                  <p>{t('home.branch.weekdays')}: 8:00 - 23:00</p>
                  <p>{t('home.branch.weekend')}: 9:00 - 01:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Map Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-bold font-cairo mb-6">{t('contact.map.title')}</h4>
            <div className="relative rounded-2xl overflow-hidden h-48 bg-brand-700/30">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54212.8775!2d31.43!3d31.42!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7b5e5a5a5a5a5%3A0x5a5a5a5a5a5a5a5!2sNew%20Damietta%2C%20Egypt!5e0!3m2!1sen!2seg!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(85%)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kaldi Coffee Location"
              />
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-transparent hover:bg-cream/10 transition-colors flex items-center justify-center"
              >
                <span className="bg-coffee-dark/90 text-cream px-4 py-2 rounded-full font-cairo text-sm">
                  {t('contact.map.directions')}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-700/50">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-brand-400 text-sm font-ibm">
            <p>
              {t('footer.rights')} © {new Date().getFullYear()} {t('hero.title')}
            </p>
            <p className="flex items-center gap-1">
              {t('footer.madeWith')} <Heart className="w-4 h-4 text-red-500 inline fill-red-500" /> Egypt
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
