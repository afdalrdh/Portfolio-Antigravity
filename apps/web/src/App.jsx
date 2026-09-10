import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ArticlesPage from './pages/ArticlesPage';
import ContactPage from './pages/ContactPage';
import NotFound from './pages/NotFound';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}>
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tentang-kami" element={<AboutPage />} />
              <Route path="/layanan" element={<ServicesPage />} />
              <Route path="/layanan/:serviceSlug" element={<ServicesPage />} />
              <Route path="/proyek" element={<ProjectsPage />} />
              <Route path="/proyek/:projectSlug" element={<ProjectsPage />} />
              <Route path="/testimoni" element={<TestimonialsPage />} />
              <Route path="/artikel" element={<ArticlesPage />} />
              <Route path="/artikel/:articleSlug" element={<ArticlesPage />} />
              <Route path="/kontak" element={<ContactPage />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </Router>
    </HelmetProvider>
  );
}
