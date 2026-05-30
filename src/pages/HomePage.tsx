import { motion } from 'framer-motion';
import {
  Hero,
  FeaturedDrinks,
  WhyKaldi,
  ReviewsSection,
  GalleryPreview,
  BranchSection,
} from '../components/sections';

export default function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="overflow-hidden"
    >
      <Hero />
      <FeaturedDrinks />
      <WhyKaldi />
      <ReviewsSection />
      <GalleryPreview />
      <BranchSection />
    </motion.main>
  );
}
