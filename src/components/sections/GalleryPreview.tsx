import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { galleryImages } from '../../data/mockData';
import { SectionHeading, Lightbox, Button } from '../ui';
import { ArrowLeft } from 'lucide-react';

export default function GalleryPreview() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const previewImages = galleryImages.slice(0, 6);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-24 bg-sand/20 dark:bg-charcoal relative">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          titleKey="home.gallery"
          subtitleKey="gallery.subtitle"
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {previewImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => openLightbox(index)}
              className={`
                relative overflow-hidden rounded-2xl cursor-pointer group
                ${index === 0 ? 'col-span-2 row-span-2' : ''}
              `}
              style={index === 0 ? { paddingBottom: '100%' } : { paddingBottom: '60%' }}
            >
              <img
                src={image.src}
                alt={isArabic ? image.alt.ar : image.alt.en}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-cairo">{isArabic ? image.alt.ar : image.alt.en}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/gallery">
            <Button
              variant="secondary"
              rightIcon={<ArrowLeft className={`w-5 h-5 ${isArabic ? 'rotate-180' : ''}`} />}
            >
              {t('gallery.viewMore')}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <Lightbox
        images={previewImages.map(img => ({
          id: img.id,
          src: img.src.replace('w=800', 'w=1200'),
          alt: img.alt,
        }))}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        language={isArabic ? 'ar' : 'en'}
      />
    </section>
  );
}
