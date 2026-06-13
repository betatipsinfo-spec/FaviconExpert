export interface FaviconSettings {
  text: string;
  emoji: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: string;
  backgroundColor: string;
  textColor: string;
  borderRadius: number; // 0 to 100 (percentage)
  shape: 'square' | 'circle' | 'rounded';
  gradientType: 'none' | 'linear' | 'radial';
  gradientColors: string[];
  gradientAngle: number;
  shadowColor: string;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  showShadow: boolean;
  backgroundShadowColor: string;
  backgroundShadowBlur: number;
  showBackgroundShadow: boolean;
}

export interface MediaFile {
  id: string;
  name: string;
  url: string; // Base64 or local URL
  type: string;
  size: number;
  dimensions?: { width: number; height: number };
  createdAt: string;
}

export interface AdminPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  tags: string[];
  category: string;
  createdAt: string;
}

export interface SiteConfig {
  siteName: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  layoutOrder: string[];
  toggles: {
    hero: boolean;
    popularFonts: boolean;
    generators: boolean;
    guides: boolean;
    socialFooter: boolean;
  };
  social: {
    facebook: string;
    instagram: string;
    pinterest: string;
    linkedin: string;
    x: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
    twitterSite?: string;
  };
}
