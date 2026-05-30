import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar, Footer } from './components/layout';
import {
  HomePage,
  AboutPage,
  MenuPage,
  GalleryPage,
  ContactPage,
  ReviewsPage,
  ReservationsPage,
  BlogPage,
  LoyaltyPage,
  QRMenuPage,
} from './pages';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Set document direction based on language
function LanguageDirection() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return null;
}

// Layout wrapper for pages that need Navbar and Footer
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isQRMenu = location.pathname === '/qr-menu';

  if (isQRMenu) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function AppRoutes() {
  const location = useLocation();

  const pages = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/menu', component: MenuPage },
    { path: '/gallery', component: GalleryPage },
    { path: '/contact', component: ContactPage },
    { path: '/reviews', component: ReviewsPage },
    { path: '/reservations', component: ReservationsPage },
    { path: '/blog', component: BlogPage },
    { path: '/loyalty', component: LoyaltyPage },
    { path: '/qr-menu', component: QRMenuPage },
  ];

  return (
    <>
      <ScrollToTop />
      <LanguageDirection />
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {pages.map(({ path, component: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
