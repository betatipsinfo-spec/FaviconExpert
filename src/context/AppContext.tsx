import React, { createContext, useContext, useState, useEffect } from 'react';
import { FaviconSettings, SiteConfig, AdminPost, MediaFile } from '../types';

interface AppContextType {
  settings: FaviconSettings;
  setSettings: React.Dispatch<React.SetStateAction<FaviconSettings>>;
  siteConfig: SiteConfig;
  setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  posts: AdminPost[];
  setPosts: React.Dispatch<React.SetStateAction<AdminPost[]>>;
  media: MediaFile[];
  setMedia: React.Dispatch<React.SetStateAction<MediaFile[]>>;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  logout: () => void;
}

const defaultSettings: FaviconSettings = {
  text: 'FE',
  emoji: '🔥',
  fontSize: 60,
  fontFamily: 'Inter',
  fontWeight: '600',
  backgroundColor: '#3b82f6',
  textColor: '#ffffff',
  borderRadius: 20,
  shape: 'rounded',
  gradientType: 'none',
  gradientColors: ['#a855f7', '#06b6d4'],
  gradientAngle: 135,
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 4,
  showShadow: false,
  backgroundShadowColor: 'rgba(0, 0, 0, 0.3)',
  backgroundShadowBlur: 10,
  showBackgroundShadow: false,
};

const defaultSiteConfig: SiteConfig = {
  siteName: 'faviconExpert',
  primaryColor: '#090d16',
  accentColor: '#8b5cf6',
  fontFamily: 'Space Grotesk',
  borderRadius: '0.75rem',
  layoutOrder: ['hero', 'generators', 'popularFonts', 'guides'],
  toggles: {
    hero: true,
    popularFonts: true,
    generators: true,
    guides: true,
    socialFooter: true,
  },
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    pinterest: 'https://pinterest.com',
    linkedin: 'https://linkedin.com',
    x: 'https://x.com',
  },
  seo: {
    title: 'faviconExpert | The Speed Tier for Icon Architecture',
    description: 'Instantly generate favicon packages from text, emojis, or images.',
    keywords: 'favicon generator, icon maker, web assets, png to ico',
    ogImage: 'https://faviconexpert.com/og-image.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: '@faviconExpert',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<FaviconSettings>(defaultSettings);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('iconforge_site_config');
    if (!saved) return defaultSiteConfig;
    
    try {
      const parsed = JSON.parse(saved);
      // Ensure nested objects exist to avoid crashes when adding new features
      return {
        ...defaultSiteConfig,
        ...parsed,
        toggles: { ...defaultSiteConfig.toggles, ...(parsed.toggles || {}) },
        social: { ...defaultSiteConfig.social, ...(parsed.social || {}) },
        seo: { ...defaultSiteConfig.seo, ...(parsed.seo || {}) },
      };
    } catch (e) {
      return defaultSiteConfig;
    }
  });
  const [posts, setPosts] = useState<AdminPost[]>([
     {
       id: '1',
       title: 'Favicon Implementation Guide',
       slug: 'implementation',
       content: 'Place the generated files in your project root and link them in your HTML header. Ensure file paths are relative to the root for maximum compatibility.',
       status: 'published',
       tags: ['Basics', 'Tutorial'],
       category: 'Installation',
       createdAt: new Date().toISOString(),
     },
     {
       id: '2',
       title: 'SEO & Performance Best Practices',
       slug: 'seo-performance',
       content: 'Optimize your icons for speed. Using correct sizes prevents browsers from having to resize images, saving CPU cycles and improving Largest Contentful Paint (LCP).',
       status: 'published',
       tags: ['SEO', 'Optimization'],
       category: 'Performance',
       createdAt: new Date().toISOString(),
     }
   ]);

  const [media, setMedia] = useState<MediaFile[]>(() => {
    const saved = localStorage.getItem('iconforge_media');
    return saved ? JSON.parse(saved) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('iconforge_auth') === 'true';
  });

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('iconforge_auth');
  };

  useEffect(() => {
    localStorage.setItem('iconforge_auth', isAuthenticated.toString());
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('iconforge_site_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('iconforge_media', JSON.stringify(media));
  }, [media]);

  return (
    <AppContext.Provider value={{ 
      settings, 
      setSettings, 
      siteConfig, 
      setSiteConfig, 
      posts, 
      setPosts,
      media,
      setMedia,
      isAuthenticated,
      setIsAuthenticated,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
