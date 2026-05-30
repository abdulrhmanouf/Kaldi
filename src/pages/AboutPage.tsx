import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { teamMembers } from '../data/mockData';
import { SectionHeading, Card } from '../components/ui';
import { Coffee, Heart, Users, Leaf, Target, Eye } from 'lucide-react';

const values = [
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

const timeline = [
  { year: '2018', eventKey: 'about.timeline.2018' },
  { year: '2019', eventKey: 'about.timeline.2019' },
  { year: '2020', eventKey: 'about.timeline.2020' },
  { year: '2021', eventKey: 'about.timeline.2021' },
  { year: '2022', eventKey: 'about.timeline.2022' },
  { year: '2023', eventKey: 'about.timeline.2023' },
];

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-b from-sand/30 to-transparent dark:from-charcoal/30 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/183963/pexels-photo-183963.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-charcoal dark:text-cream font-cairo mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-brand-500 dark:text-brand-400 font-ibm">
              {t('about.hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-soft-xl">
                <img
                  src="https://images.pexels.com/photos/1493338/pexels-photo-1493338.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Kaldi Story"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/30 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6 bg-white dark:bg-brand-800 rounded-2xl p-6 shadow-soft-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-coffee/10 flex items-center justify-center">
                    <Coffee className="w-6 h-6 text-coffee dark:text-cream" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-coffee dark:text-cream font-cairo">2018</p>
                    <p className="text-sm text-brand-400 font-ibm">
                      {isArabic ? 'تأسس في' : 'Founded in'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-charcoal dark:text-cream font-cairo mb-8">
                {t('about.story.title')}
              </h2>
              <div className="space-y-6 text-brand-500 dark:text-brand-400 font-ibm leading-relaxed text-lg">
                <p>{t('about.story.para1')}</p>
                <p>{t('about.story.para2')}</p>
                <p>{t('about.story.para3')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-sand/30 dark:bg-charcoal">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            titleKey="about.values.title"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <div className={`w-20 h-20 rounded-2xl ${value.bgColor} flex items-center justify-center mx-auto mb-6`}>
                    <value.icon className={`w-10 h-10 ${value.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal dark:text-cream font-cairo mb-4">
                    {t(value.titleKey)}
                  </h3>
                  <p className="text-brand-500 dark:text-brand-400 font-ibm">
                    {t(value.descKey)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-coffee rounded-3xl p-8 md:p-12 text-cream relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-10 -right-10 opacity-10"
              >
                <Target className="w-40 h-40" />
              </motion.div>
              <div className="relative">
                <Target className="w-12 h-12 mb-6 text-sand" />
                <h3 className="text-3xl font-bold font-cairo mb-4">
                  {isArabic ? 'رسالتنا' : 'Our Mission'}
                </h3>
                <p className="text-cream/90 font-ibm leading-relaxed text-lg">
                  {isArabic
                    ? 'تقديم تجربة قهوة مميزة لا تُنسى من خلال اختيار أفضل أنواع البن وتحضيرها بإتقان واهتمام بكل التفاصيل'
                    : 'To deliver an unforgettable specialty coffee experience by selecting the finest beans and preparing them with mastery and attention to every detail'}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-charcoal rounded-3xl p-8 md:p-12 text-cream relative overflow-hidden"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                className="absolute -top-10 -right-10 opacity-10"
              >
                <Eye className="w-40 h-40" />
              </motion.div>
              <div className="relative">
                <Eye className="w-12 h-12 mb-6 text-sand" />
                <h3 className="text-3xl font-bold font-cairo mb-4">
                  {isArabic ? 'رؤيتنا' : 'Our Vision'}
                </h3>
                <p className="text-cream/90 font-ibm leading-relaxed text-lg">
                  {isArabic
                    ? 'أن نكون الوجهة الأولى لمحبي القهوة المميزة في دمياط والمحافظات المجاورة'
                    : 'To be the leading destination for specialty coffee lovers in Damietta and surrounding areas'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-sand/30 dark:bg-charcoal overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading titleKey="about.timeline.title" />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-sand dark:bg-brand-800 transform -translate-y-1/2 hidden lg:block" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Card hover className="text-center p-4">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-coffee text-cream flex items-center justify-center font-bold text-lg shadow-coffee -translate-y-1/2">
                      {item.year}
                    </div>
                    <div className="pt-8">
                      <p className="text-brand-500 dark:text-brand-400 font-ibm text-sm leading-relaxed">
                        {t(item.eventKey)}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            titleKey="about.team.title"
            subtitleKey="about.team.subtitle"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hover className="text-center overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-charcoal dark:text-cream font-cairo mb-1">
                      {member.name}
                    </h3>
                    <p className="text-coffee dark:text-sand font-ibm mb-3">
                      {isArabic ? member.role.ar : member.role.en}
                    </p>
                    <p className="text-brand-400 text-sm font-ibm line-clamp-2">
                      {isArabic ? member.bio.ar : member.bio.en}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.main>
  );
}
