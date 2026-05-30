import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading, Card, Button, Input, Textarea } from '../components/ui';
import { Calendar, Clock, Users, Phone, User, CheckCircle, Coffee } from 'lucide-react';

export default function ReservationsPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    phone: '',
    occasion: 'casual',
    specialRequests: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
    '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const occasions = [
    { value: 'casual', label: t('reservations.occasions.casual') },
    { value: 'birthday', label: t('reservations.occasions.birthday') },
    { value: 'business', label: t('reservations.occasions.business') },
    { value: 'date', label: t('reservations.occasions.date') },
    { value: 'other', label: t('reservations.occasions.other') },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  if (isSubmitted) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20 min-h-screen bg-cream dark:bg-brand-900"
      >
        <div className="container mx-auto px-4 lg:px-8 py-24">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-emerald-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-charcoal dark:text-cream font-cairo mb-4">
              {t('reservations.success')}
            </h2>
            <p className="text-brand-500 dark:text-brand-400 font-ibm mb-8">
              {isArabic
                ? `تم تأكيد حجزك في ${formData.date} الساعة ${formData.time}`
                : `Your reservation on ${formData.date} at ${formData.time} is confirmed`}
            </p>
            <Button variant="primary" onClick={() => setIsSubmitted(false)}>
              {isArabic ? 'حجز جديد' : 'New Reservation'}
            </Button>
          </motion.div>
        </div>
      </motion.main>
    );
  }

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
          <SectionHeading titleKey="reservations.title" subtitleKey="reservations.subtitle" />

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mt-12"
          >
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                    step >= s
                      ? 'bg-coffee text-white'
                      : 'bg-sand dark:bg-brand-800 text-brand-400'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-12 h-0.5 transition-colors ${
                      step > s ? 'bg-coffee' : 'bg-sand dark:bg-brand-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-8 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: Date & Time */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-charcoal dark:text-cream font-cairo flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-coffee" />
                    {isArabic ? 'اختر التاريخ والوقت' : 'Select Date & Time'}
                  </h3>

                  <Input
                    type="date"
                    label={t('reservations.date')}
                    value={formData.date}
                    onChange={(e) => updateFormData({ date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-brand-500 dark:text-brand-400 mb-3 font-ibm">
                      {t('reservations.time')}
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {timeSlots.map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateFormData({ time })}
                          className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                            formData.time === time
                              ? 'bg-coffee text-white'
                              : 'bg-sand/30 dark:bg-brand-800 text-brand-500 hover:bg-sand/50 dark:hover:bg-brand-700'
                          }`}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-500 dark:text-brand-400 mb-3 font-ibm">
                      {t('reservations.guests')}
                    </label>
                    <div className="flex items-center gap-4">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateFormData({ guests: Math.max(1, formData.guests - 1) })}
                        className="w-10 h-10 rounded-lg bg-sand/30 dark:bg-brand-800 text-brand-500 hover:bg-sand/50 dark:hover:bg-brand-700 transition-colors"
                      >
                        -
                      </motion.button>
                      <div className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-brand-800 rounded-lg">
                        <Users className="w-5 h-5 text-coffee" />
                        <span className="text-xl font-bold text-charcoal dark:text-cream">
                          {formData.guests}
                        </span>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => updateFormData({ guests: Math.min(20, formData.guests + 1) })}
                        className="w-10 h-10 rounded-lg bg-sand/30 dark:bg-brand-800 text-brand-500 hover:bg-sand/50 dark:hover:bg-brand-700 transition-colors"
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    disabled={!formData.date || !formData.time}
                    onClick={() => setStep(2)}
                  >
                    {t('common.next')}
                  </Button>
                </motion.div>
              )}

              {/* Step 2: Personal Info */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-charcoal dark:text-cream font-cairo flex items-center gap-2">
                    <User className="w-6 h-6 text-coffee" />
                    {isArabic ? 'معلوماتك الشخصية' : 'Your Information'}
                  </h3>

                  <Input
                    label={t('reservations.name')}
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    leftIcon={<User className="w-5 h-5" />}
                    required
                  />

                  <Input
                    type="tel"
                    label={t('reservations.phone')}
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    leftIcon={<Phone className="w-5 h-5" />}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-brand-500 dark:text-brand-400 mb-3 font-ibm">
                      {t('reservations.occasion')}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {occasions.map((occ) => (
                        <motion.button
                          key={occ.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => updateFormData({ occasion: occ.value })}
                          className={`py-3 px-4 rounded-xl text-sm font-medium font-cairo transition-colors ${
                            formData.occasion === occ.value
                              ? 'bg-coffee text-white'
                              : 'bg-sand/30 dark:bg-brand-800 text-brand-500 hover:bg-sand/50 dark:hover:bg-brand-700'
                          }`}
                        >
                          {occ.label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <Textarea
                    label={t('reservations.specialRequests')}
                    value={formData.specialRequests}
                    onChange={(e) => updateFormData({ specialRequests: e.target.value })}
                    placeholder={isArabic ? 'أي طلبات خاصة...' : 'Any special requests...'}
                    rows={3}
                  />

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      {t('common.previous')}
                    </Button>
                    <Button
                      variant="primary"
                      fullWidth
                      disabled={!formData.name || !formData.phone}
                      onClick={() => setStep(3)}
                    >
                      {t('common.next')}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-charcoal dark:text-cream font-cairo flex items-center gap-2">
                    <Coffee className="w-6 h-6 text-coffee" />
                    {isArabic ? 'تأكيد الحجز' : 'Confirm Reservation'}
                  </h3>

                  {/* Reservation Summary */}
                  <div className="bg-sand/30 dark:bg-brand-800 rounded-xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-coffee" />
                      <div>
                        <span className="text-sm text-brand-400 font-ibm">{t('reservations.date')}</span>
                        <p className="font-bold text-charcoal dark:text-cream font-cairo">{formData.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-coffee" />
                      <div>
                        <span className="text-sm text-brand-400 font-ibm">{t('reservations.time')}</span>
                        <p className="font-bold text-charcoal dark:text-cream font-cairo">{formData.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-coffee" />
                      <div>
                        <span className="text-sm text-brand-400 font-ibm">{t('reservations.guests')}</span>
                        <p className="font-bold text-charcoal dark:text-cream font-cairo">{formData.guests} {isArabic ? 'أشخاص' : 'guests'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-coffee" />
                      <div>
                        <span className="text-sm text-brand-400 font-ibm">{t('reservations.name')}</span>
                        <p className="font-bold text-charcoal dark:text-cream font-cairo">{formData.name}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      {t('common.previous')}
                    </Button>
                    <Button variant="coffee" fullWidth onClick={handleSubmit}>
                      {t('reservations.confirm')}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </section>
    </motion.main>
  );
}
