import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { galleryImages } from '../data/mockData';
import { GalleryCategory } from '../types';
import { SectionHeading, Lightbox } from '../components/ui';
import { Camera, Image } from 'lucide-react';

const categoryLabels: Record<GalleryCategory | 'all', { ar: string; en: string }> = {
  all: { ar: 'الكل', en: 'All' },
  atmosphere: { ar: 'الأجواء', en: 'Atmosphere' },
  drinks: { ar: 'المشروبات', en: 'Drinks' },
  food: { ar: 'الطعام', en: 'Food' },
  events: { ar: 'الفعاليات', en: 'Events' },
  team: { ar: 'الفريق', en: 'Team' },
};

export default function GalleryPage() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [activeCategory, setActiveCategory] = useState<GalleryCategory | 'all'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = Object.keys(categoryLabels) as (GalleryCategory | 'all')[];

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

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
          <SectionHeading titleKey="gallery.title" subtitleKey="gallery.subtitle" />
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-8 bg-cream dark:bg-brand-900">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category)}
                className={`
                  flex items-center gap-2 px-5 py-3 rounded-full font-cairo font-medium transition-all
                  ${
                    activeCategory === category
                      ? 'bg-coffee text-white shadow-soft'
                      : 'bg-sand/30 dark:bg-brand-800 text-brand-500 dark:text-brand-400 hover:bg-sand/50 dark:hover:bg-brand-700'
                  }
                `}
              >
                {category === 'all' && <Image className="w-4 h-4" />}
                {category === 'atmosphere' && <Camera className="w-4 h-4" />}
                {isArabic ? categoryLabels[category].ar : categoryLabels[category].en}
              </motion.button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
            <AnimatePresence>
              {filteredImages.map((image, index) => {
                // Determine span based on index
                const shouldSpan = index % 5 === 0;
                return (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.03 }}
                    className={`
                      break-inside-avoid mb-4 group cursor-pointer rounded-2xl overflow-hidden relative
                      ${shouldSpan ? 'row-span-2' : ''}
                    `}
                    onClick={() => openLightbox(index)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="relative overflow-hidden rounded-2xl"
                    >
                      <img
                        src={image.src}
                        alt={isArabic ? image.alt.ar : image.alt.en}
                        className={`w-full object-cover transition-all duration-500 group-hover:scale-110 ${
                          shouldSpan ? 'h-80' : 'h-56'
                        }`}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                        <p className="text-cream font-cairo">
                          {isArabic ? image.alt.ar : image.alt.en}
                        </p>
                        <p className="text-sand/80 text-sm font-ibm">
                          {isArabic
                            ? categoryLabels[image.category].ar
                            : categoryLabels[image.category].en}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages.map((img) => ({
          id: img.id,
          src: img.src.replace('w=800', 'w=1200'),
          alt: img.alt,
        }))}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        language={isArabic ? 'ar' : 'en'}
      />
    </motion.main>
  );
}
