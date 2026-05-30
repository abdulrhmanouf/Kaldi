import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Coffee,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronDown,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui';

const navItems = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/menu', labelKey: 'nav.menu' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/gallery', labelKey: 'nav.gallery' },
  { path: '/reviews', labelKey: 'nav.reviews' },
  { path: '/reservations', labelKey: 'nav.reservations' },
  { path: '/blog', labelKey: 'nav.blog' },
  { path: '/contact', labelKey: 'nav.contact' },
];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const isArabic = i18n.language === 'ar';

  const toggleLanguage = (lang: 'ar' | 'en') => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    setIsLangMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${
            isScrolled
              ? 'bg-cream/95 dark:bg-brand-900/95 backdrop-blur-lg shadow-soft'
              : 'bg-transparent'
          }
        `}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="relative"
              >
                <Coffee className="w-10 h-10 text-coffee dark:text-cream" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl lg:text-2xl font-bold text-coffee dark:text-cream font-cairo">
                  {t('hero.title')}
                </span>
                <span className="text-xs text-brand-400 hidden sm:block">
                  New Damietta, Egypt
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-4 py-2 group"
                  >
                    <span
                      className={`
                        font-medium font-cairo transition-colors
                        ${
                          isActive
                            ? 'text-coffee dark:text-cream'
                            : 'text-brand-500 dark:text-brand-400 group-hover:text-coffee dark:group-hover:text-cream'
                        }
                      `}
                    >
                      {t(item.labelKey)}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-coffee dark:bg-cream rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-1 px-3 py-2 rounded-full
                    text-brand-500 dark:text-brand-400 hover:bg-sand/30 dark:hover:bg-brand-800/50
                    transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm font-medium">{isArabic ? 'EN' : 'ع'}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute top-full mt-2 right-0 bg-white dark:bg-brand-800 rounded-xl shadow-soft-lg overflow-hidden min-w-[120px]"
                    >
                      <button
                        onClick={() => toggleLanguage('ar')}
                        className={`w-full px-4 py-2 text-right font-cairo transition-colors
                          ${
                            isArabic
                              ? 'bg-coffee text-white'
                              : 'text-charcoal dark:text-cream hover:bg-sand/30 dark:hover:bg-brand-700'
                          }`}
                      >
                        العربية
                      </button>
                      <button
                        onClick={() => toggleLanguage('en')}
                        className={`w-full px-4 py-2 text-right font-inter transition-colors
                          ${
                            !isArabic
                              ? 'bg-coffee text-white'
                              : 'text-charcoal dark:text-cream hover:bg-sand/30 dark:hover:bg-brand-700'
                          }`}
                      >
                        English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-full text-brand-500 dark:text-brand-400
                  hover:bg-sand/30 dark:hover:bg-brand-800/50 transition-colors"
                aria-label={theme === 'dark' ? t('common.lightMode') : t('common.darkMode')}
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full text-brand-500 dark:text-brand-400
                  hover:bg-sand/30 dark:hover:bg-brand-800/50 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-cream dark:bg-brand-900 shadow-soft-xl overflow-y-auto"
            >
              <div className="p-6 pt-24">
                {/* Nav Items */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={item.path}
                          className={`
                            flex items-center px-4 py-3 rounded-xl font-cairo font-medium
                            transition-all duration-300
                            ${
                              isActive
                                ? 'bg-coffee text-white shadow-soft'
                                : 'text-brand-500 dark:text-brand-400 hover:bg-sand/50 dark:hover:bg-brand-800/50'
                            }
                          `}
                        >
                          {t(item.labelKey)}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* QR Menu Quick Access */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6 pt-6 border-t border-sand dark:border-brand-800"
                >
                  <Button
                    variant="coffee"
                    fullWidth
                    onClick={() => navigate('/qr-menu')}
                  >
                    {t('nav.qrMenu')}
                  </Button>
                </motion.div>

                {/* Language Options */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex gap-2"
                >
                  <button
                    onClick={() => toggleLanguage('ar')}
                    className={`flex-1 py-3 rounded-xl font-cairo transition-colors
                      ${
                        isArabic
                          ? 'bg-coffee text-white'
                          : 'bg-sand/30 dark:bg-brand-800 text-brand-500'
                      }`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`flex-1 py-3 rounded-xl font-inter transition-colors
                      ${
                        !isArabic
                          ? 'bg-coffee text-white'
                          : 'bg-sand/30 dark:bg-brand-800 text-brand-500'
                      }`}
                  >
                    English
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
