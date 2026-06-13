/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Header, Footer } from './components/Layout';
import { SEOHead } from './components/SEOHead';
import { Home } from './pages/Home';
import { TextGeneratorPage, EmojiGeneratorPage } from './pages/StudioPages';
import { ImageConverterPage } from './pages/ImageConverter';
import { GuidesPage } from './pages/Guides';
import { AboutPage, ContactPage, PrivacyPolicyPage, TermsOfUsePage } from './pages/StaticPages';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AnimatePresence, motion } from 'motion/react';

function PageWrapper({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { siteConfig } = useApp();
  const isAdmin = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-brand-cyan', siteConfig.accentColor);
    root.style.setProperty('--font-sans', `"${siteConfig.fontFamily}", ui-sans-serif, system-ui, sans-serif`);
    root.style.setProperty('--font-display', `"${siteConfig.fontFamily}", sans-serif`);
    root.style.setProperty('--radius-xl', siteConfig.borderRadius);
  }, [siteConfig]);

  return (
    <div className="flex flex-col min-h-screen items-center bg-brand-dark">
      <SEOHead />
      <div className="w-full lg:w-[92%] xl:w-[85%] max-w-[1600px] flex flex-col min-h-screen">
        {!isAdmin && <Header />}
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
        {!isAdmin && <Footer />}
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useApp();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <PageWrapper>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-text" element={<TextGeneratorPage />} />
            <Route path="/explore-emojis" element={<EmojiGeneratorPage />} />
            <Route path="/image-converter" element={<ImageConverterPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </PageWrapper>
      </Router>
    </AppProvider>
  );
}

