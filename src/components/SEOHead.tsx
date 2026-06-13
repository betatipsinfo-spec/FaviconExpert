import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export function SEOHead() {
  const { siteConfig } = useApp();
  const { seo } = siteConfig;

  useEffect(() => {
    // Update Title
    document.title = seo.title;

    // Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seo.description);

    // Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seo.keywords);

    // Open Graph Tags
    const updateOGTag = (property: string, content?: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOGTag('og:title', seo.title);
    updateOGTag('og:description', seo.description);
    updateOGTag('og:image', seo.ogImage);
    updateOGTag('og:type', seo.ogType);

    // Twitter Tags
    const updateTwitterTag = (name: string, content?: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateTwitterTag('twitter:card', seo.twitterCard);
    updateTwitterTag('twitter:site', seo.twitterSite);
    updateTwitterTag('twitter:title', seo.title);
    updateTwitterTag('twitter:description', seo.description);
    updateTwitterTag('twitter:image', seo.ogImage);

  }, [seo]);

  return null;
}
