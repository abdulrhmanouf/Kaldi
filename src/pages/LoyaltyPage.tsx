import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionHeading, Card, Button } from '../components/ui';
import {
  Gift,
  Star,
  TrendingUp,
  Calendar,
  Coffee,
  Users,
  Award,
  Crown,
  CreditCard,
} from 'lucide-react';

const levels = [
  { name: 'bronze', minPoints: 0, maxPoints: 200, icon: Award, color: 'text-orange-600' },
  { name: 'silver', minPoints: 200, maxPoints: 500, icon: Award, color: 'text-gray-400' },
  { name: 'gold', minPoints: 500, maxPoints: 1000, icon: Crown, color: 'text-yellow-500' },
  { name: 'platinum', minPoints: 1000, maxPoints: Infinity, icon: Crown, color: 'text-purple-500' },
];

const rewards = [
  { points: 50, name: 'مشروب مجاني', nameEn: 'Free Drink' },
  { points: 100, name: 'حلوى مجانية', nameEn: 'Free Dessert' },
  { points: 200, name: 'خصم 20%', nameEn: '20% Discount' },
  { points: 500, name: 'دعوة صديق', nameEn: 'Invite a Friend' },
];

export default function LoyaltyPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [memberData] = useState({
    name: 'أحمد محمد',
    points: 750,
    level: 'gold' as const,
    tier: 'Gold',
    pointsToNextLevel: 250,
    totalEarned: 1250,
    totalRedeemed: 500,
  });

  const [_setIsJoining] = useState(false);

  const currentLevel = levels.find((l) => l.name === memberData.level) || levels[0];
  const nextLevel = levels.find((l) => l.minPoints > memberData.points);

  const progress = ((memberData.points - currentLevel.minPoints) /
    ((nextLevel?.minPoints || memberData.points + 250) - currentLevel.minPoints)) * 100;

  const history = [
    { date: '2024-12-15', description: 'مشتريات', descriptionEn: 'Purchase', points: 50, type: 'earn' },
    { date: '2024-12-10', description: 'استبدال مشروب', descriptionEn: 'Redeemed drink', points: -50, type: 'redeem' },
    { date: '2024-12-05', description: 'مكافأة عيد ميلاد', descriptionEn: 'Birthday bonus', points: 100, type: 'bonus' },
    { date: '2024-12-01', description: 'مشتريات', descriptionEn: 'Purchase', points: 120, type: 'earn' },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-coffee to-coffee-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-20 -right-20 w-96 h-96"
          >
            <Star className="w-full h-full text-cream" />
          </motion.div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative">
          <SectionHeading titleKey="loyalty.title" subtitleKey="loyalty.subtitle" />

          {/* Member Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-lg mx-auto mt-8"
          >
            <Card className="bg-gradient-to-br from-charcoal to-coffee-dark text-cream overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-cream/60">{t('loyalty.level')}</p>
                    <h3 className="text-2xl font-bold font-cairo flex items-center gap-2">
                      <Crown className="w-6 h-6 text-yellow-400" />
                      {t(`loyalty.levels.${memberData.level}`)}
                    </h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-cream/60">{t('loyalty.points')}</p>
                    <p className="text-3xl font-bold font-cairo">{memberData.points}</p>
                  </div>
                </div>

                {/* Progress to next level */}
                {nextLevel && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-cream/60">
                        {isArabic ? `${nextLevel.maxPoints - memberData.points} نقطة للمستوى التالي` : `${nextLevel.minPoints - memberData.points} points to next level`}
                      </span>
                      <span className="font-medium">{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                  <div className="flex-1 text-center">
                    <p className="text-xs text-cream/60">{t('loyalty.earn')}</p>
                    <p className="font-bold">{memberData.totalEarned}</p>
                  </div>
                  <div className="flex-1 text-center border-x border-white/20">
                    <p className="text-xs text-cream/60">{t('loyalty.redeem')}</p>
                    <p className="font-bold">{memberData.totalRedeemed}</p>
                  </div>
                  <div className="flex-1 text-center">
                    <p className="text-xs text-cream/60">{isArabic ? 'الرصيد' : 'Balance'}</p>
                    <p className="font-bold">{memberData.points}</p>
                  </div>
                </div>
              </div>

              <div className="bg-cream text-charcoal text-sm p-3 text-center font-cairo">
                {isArabic ? 'كالدي للقهوة المميزة' : 'Kaldi Specialty Coffee'}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How to Earn */}
      <section className="py-16 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading titleKey="loyalty.earn" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Coffee, points: '1', label: t('loyalty.perOrder') },
              { icon: Users, points: '50', label: t('loyalty.perReferral') },
              { icon: Calendar, points: '100', label: t('loyalty.birthdayBonus') },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="w-16 h-16 rounded-full bg-coffee/10 dark:bg-coffee/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-coffee dark:text-cream" />
                  </div>
                  <div className="text-3xl font-bold text-coffee dark:text-cream font-cairo mb-2">
                    +{item.points}
                  </div>
                  <p className="text-brand-500 dark:text-brand-400 font-ibm">{item.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="py-16 bg-sand/30 dark:bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading titleKey="loyalty.rewards" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {rewards.map((reward, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="text-lg font-bold text-coffee dark:text-cream font-cairo mb-2">
                    {reward.points} {isArabic ? 'نقطة' : 'pts'}
                  </div>
                  <p className="text-brand-500 dark:text-brand-400 font-ibm">
                    {isArabic ? reward.name : reward.nameEn}
                  </p>
                  <Button
                    variant={memberData.points >= reward.points ? 'primary' : 'outline'}
                    size="sm"
                    fullWidth
                    className="mt-4"
                    disabled={memberData.points < reward.points}
                  >
                    {t('loyalty.redeem')}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Points History */}
      <section className="py-16 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading titleKey="loyalty.history" />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-12"
          >
            <Card>
              <div className="space-y-4">
                {history.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-sand/30 dark:bg-brand-800"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.type === 'earn'
                            ? 'bg-emerald-100 dark:bg-emerald-900/30'
                            : item.type === 'bonus'
                            ? 'bg-blue-100 dark:bg-blue-900/30'
                            : 'bg-red-100 dark:bg-red-900/30'
                        }`}
                      >
                        {item.type === 'earn' ? (
                          <TrendingUp className="w-5 h-5 text-emerald-600" />
                        ) : item.type === 'bonus' ? (
                          <Gift className="w-5 h-5 text-blue-600" />
                        ) : (
                          <CreditCard className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-charcoal dark:text-cream font-cairo">
                          {isArabic ? item.description : item.descriptionEn}
                        </p>
                        <p className="text-sm text-brand-400 font-ibm">{item.date}</p>
                      </div>
                    </div>
                    <div
                      className={`font-bold font-cairo ${
                        item.points > 0 ? 'text-emerald-600' : 'text-red-500'
                      }`}
                    >
                      {item.points > 0 ? '+' : ''}{item.points}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.main>
  );
}
